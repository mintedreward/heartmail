/**
 * MerkleProof
 * ===========
 *
 * A proof that a transaction was included in a block.
 *
 * Based on the Merkle Proof Standardized Format:
 *
 * https://tsc.bitcoinassociation.net/standards/merkle-proof-standardised-format/
 *
 * Reference implementation:
 *
 * https://github.com/bitcoin-sv-specs/merkle-proof-standard-example/
 */

// import { BlockHeader } from './block-header.mjs'
import { Tx } from './tx.mjs'
import { Br } from './br.mjs'
import { MerkleNode } from './merkle-node.mjs'
import { Struct } from './struct.mjs'
import { Bw } from './bw.mjs'

class MerkleProof extends Struct {
  constructor (flagsNum, indexNum, txLengthNum, txOrIdBuf, targetBuf, nodeCount, nodes) {
    super({ flagsNum, indexNum, txLengthNum, txOrIdBuf, targetBuf, nodeCount, nodes })
    if (flagsNum === undefined) {
      this.setDefaultFlags()
    }
  }

  setDefaultFlags () {
    this.flagsNum = 0
    this.setFlagsHasTx(false)
    this.setFlagsProofType('branch')
    this.setFlagsComposite(false)
    this.setFlagsTargetType('hash')
  }

  getFlagsHasTx () {
    return !!(this.flagsNum & 0x01)
  }

  setFlagsHasTx (hasTx = true) {
    if (hasTx) {
      this.flagsNum = this.flagsNum | 0x01
    } else {
      this.flagsNum = this.flagsNum & 0xfffffffe
    }
  }

  getFlagsTargetType () {
    const val = this.flagsNum & (0x04 | 0x02)
    if (val === 0) {
      return 'hash'
    } else if (val === 2) {
      return 'header'
    } else if (val === 4) {
      return 'merkleRoot'
    } else {
      throw new Error('invalid flags target type')
    }
  }

  setFlagsTargetType (targetType = 'hash') {
    let val = 0
    if (targetType === 'hash') {
      val = 0
    } else if (targetType === 'header') {
      val = 2
    } else if (targetType === 'merkleRoot') {
      val = 4
    } else {
      throw new Error('invalid target type')
    }
    this.flagsNum = this.flagsNum & ~(0x04 | 0x02) | val
    return this
  }

  getFlagsProofType () {
    return this.flagsNum & 0x08 ? 'tree' : 'branch'
  }

  setFlagsProofType (proofType = 'branch') {
    if (proofType === 'branch') {
      this.flagsNum = this.flagsNum & ~0x08
    } else if (proofType === 'tree') {
      this.flagsNum = this.flagsNum | 0x08
    } else {
      throw new Error('invalid proof type')
    }
    return this
  }

  getFlagsComposite () {
    return !!(this.flagsNum & 0x10)
  }

  setFlagsComposite (composite = false) {
    if (composite) {
      this.flagsNum = this.flagsNum | 0x10
    } else {
      this.flagsNum = this.flagsNum & ~0x10
    }
    return this
  }

  fromBr (br) {
    this.flagsNum = br.readInt8()
    this.indexNum = br.readVarIntNum()
    this.txLengthNum = this.getFlagsHasTx() ? br.readVarIntNum() : null
    this.txOrIdBuf = this.txLengthNum ? br.read(this.txLengthNum) : br.read(32)
    this.targetBuf = this.getFlagsTargetType() === 'header' ? br.read(80) : br.read(32)
    this.nodeCount = br.readVarIntNum()
    this.nodes = []
    for (let i = 0; i < this.nodeCount; i++) {
      const typeNum = br.readInt8()
      let nodeBuf
      if (typeNum === 0) {
        nodeBuf = br.read(32)
      } else if (typeNum === 1) {
        nodeBuf = br.read(0)
      } else if (typeNum === 2) {
        nodeBuf = br.readVarIntBuf()
      } else {
        throw new Error('invalid node type')
      }
      this.nodes.push({ typeNum, nodeBuf })
    }
    return this
  }

  toBw (bw) {
    if (!bw) {
      bw = new Bw()
    }
    bw.writeInt8(this.flagsNum)
    bw.writeVarIntNum(this.indexNum)
    if (this.txLengthNum) {
      bw.writeVarIntNum(this.txLengthNum)
    }
    bw.write(this.txOrIdBuf)
    bw.write(this.targetBuf)
    bw.writeVarIntNum(this.nodeCount)
    for (let i = 0; i < this.nodeCount; i++) {
      const node = this.nodes[i]
      const typeNum = node.typeNum
      const nodeBuf = node.nodeBuf
      bw.writeInt8(typeNum)
      if (node.nodeBuf) {
        bw.write(nodeBuf)
      } else {
        if (typeNum !== 1) {
          throw new Error('if nodeBuf is not present then typeNum should be 1')
        }
      }
    }
    return bw
  }

  fromJSON (json) {
    this.flags = 0
    this.indexNum = json.index
    const txOrIdBuf = Buffer.from(json.txOrId, 'hex')
    this.txOrIdBuf = json.txOrId.length === 64 ? new Br(txOrIdBuf).readReverse() : txOrIdBuf
    if (this.txOrIdBuf.length === 32) {
      this.setFlagsHasTx(false)
    } else {
      this.txLengthNum = this.txOrIdBuf.length
      this.setFlagsHasTx(true)
    }
    this.targetBuf = new Br(Buffer.from(json.target, 'hex')).readReverse()
    this.nodeCount = json.nodes.length
    this.nodes = []
    for (let i = 0; i < this.nodeCount; i++) {
      if (json.nodes[i] === '*') {
        this.nodes.push({ typeNum: 1, nodeBuf: null })
      } else {
        const nodeBuf = new Br(Buffer.from(json.nodes[i], 'hex')).readReverse()
        this.nodes.push({ typeNum: 0, nodeBuf })
      }
    }
    this.setFlagsTargetType(json.targetType)
    this.setFlagsProofType(json.proofType)
    this.setFlagsComposite(json.composite)
    return this
  }

  toJSON () {
    const json = {}
    json.flags = this.flagsNum
    json.index = this.indexNum
    json.txOrId = this.txOrIdBuf.length === 32 ? new Br(this.txOrIdBuf).readReverse().toString('hex') : this.txOrIdBuf.toString('hex')
    json.target = new Br(this.targetBuf).readReverse().toString('hex')
    json.nodes = []
    for (let i = 0; i < this.nodeCount; i++) {
      if (this.nodes[i].typeNum === 1) {
        json.nodes.push('*')
      } else {
        json.nodes.push(new Br(this.nodes[i].nodeBuf).readReverse().toString('hex'))
      }
    }
    json.targetType = this.getFlagsTargetType()
    json.proofType = this.getFlagsProofType()
    json.composite = this.getFlagsComposite()
    return json
  }

  verificationError (blockHeader, tx) {
    if (this.getFlagsComposite()) {
      // composite proof type not supported
      return 'only single proof supported in this version'
    }

    if (this.getFlagsProofType() !== 'branch') {
      // merkle tree proof type not supported
      return 'only merkle branch supported in this version'
    }

    try {
      // there is no reason to use this method, so we disable it. always deliver
      // the merkle root.
      if (this.getFlagsTargetType() === 'hash') {
        return 'target type hash not supported in this version'
      }
    } catch (err) {
      return 'invalid target type : ' + err
    }

    const merkleRootBuf = blockHeader.merkleRootBuf
    let index = this.indexNum

    let c = tx.hash()
    if (this.getFlagsHasTx()) {
      const tx2 = Tx.fromBuffer(this.txOrIdBuf)
      const txCorrect = !Buffer.compare(tx2.hash(), c)
      if (!txCorrect) {
        // the tx in the merkle proof does not match
        return false
      }
    } else {
      const txCorrect = !Buffer.compare(this.txOrIdBuf, c)
      if (!txCorrect) {
        // the tx hash in the merkle proof does not match
        return false
      }
    }
    // let isLastInTree = true

    for (let i = 0; i < this.nodes.length; i++) {
      const typeNum = this.nodes[i].typeNum
      let p = this.nodes[i].nodeBuf

      // Check if the node is the left or the right child
      const cIsLeft = index % 2 === 0

      // Check for duplicate hash - this happens if the node (p) is
      // the last element of an uneven merkle tree layer
      if (typeNum === 1) {
        // If no pair is provided, we assume that c[0] is the Merkle root and compare it to the root provided in the block header.
        if (!cIsLeft) { // this shouldn't happen...
          throw new Error('invalid duplicate on left hand side according to index value')
        }
        p = c
      }

      // This check fails at least once if it's not the last element
      // if (cIsLeft && c !== p) {
      //   isLastInTree = false
      // }

      const merklec = new MerkleNode(c)
      const merklep = new MerkleNode(p)

      // Calculate the parent node
      if (cIsLeft) {
        // Concatenate left leaf (c) with right leaf (p)
        c = MerkleNode.fromObject({ merkle1: merklec, merkle2: merklep }).hash()
      } else {
        // Concatenate left leaf (p) with right leaf (c)
        c = MerkleNode.fromObject({ merkle1: merklep, merkle2: merklec }).hash()
      }

      // We need integer division here with remainder dropped.
      // Javascript does floating point math by default so we
      // need to use Math.floor to drop the fraction.
      index = Math.floor(index / 2)
    }

    // c is now the calculated merkle root
    return Buffer.compare(c, merkleRootBuf)
  }

  verify (blockHeader, tx) {
    return !this.verificationError(blockHeader, tx)
  }
}

export { MerkleProof }
