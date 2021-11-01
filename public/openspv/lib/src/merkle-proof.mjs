/**
 * MerkleProof
 * ===========
 *
 * A proof that a transaction was included in a block.
 *
 * Based on the Merkle Proof Standardized Format:
 *
 * https://tsc.bitcoinassociation.net/standards/merkle-proof-standardised-format/
 */
'use strict'

// import { BlockHeader } from './block-header.mjs'
// import { MerkleNode } from './merkle-node.mjs'
// import { Tx } from './tx.mjs'
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
    this.targetBuf = this.setFlagsTargetType() === 'header' ? br.read(80) : br.read(32)
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
      const typeNum = node.type
      const nodeBuf = node.nodeBuf
      bw.writeInt8(typeNum)
      bw.write(nodeBuf)
    }
    return bw
  }

  fromJSON (json) {
    this.flags = 0
    this.indexNum = json.index
    this.txOrIdBuf = Buffer.from(json.txOrId, 'hex')
    if (this.txOrIdBuf.length === 32) {
      this.setFlagsHasTx(false)
    } else {
      this.setFlagsHasTx(true)
    }
    this.targetBuf = Buffer.from(json.target, 'hex')
    this.nodeCount = json.nodes.length
    this.nodes = []
    for (let i = 0; i < this.nodeCount; i++) {
      const nodeBuf = Buffer.from(json.nodes[i], 'hex')
      const len = nodeBuf.length
      let typeNum = 0
      if (len === 32) {
        typeNum = 0
      } else if (len === 0) {
        typeNum = 1
      } else {
        typeNum = 2
      }
      this.nodes.push({ typeNum, nodeBuf })
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
    json.txOrId = this.txOrIdBuf.toString('hex')
    json.target = this.targetBuf.toString('hex')
    json.nodes = []
    for (let i = 0; i < this.nodeCount; i++) {
      json.nodes.push(this.nodes[i].nodeBuf.toString('hex'))
    }
    json.targetType = this.getFlagsTargetType()
    json.proofType = this.getFlagsProofType()
    json.composite = this.getFlagsComposite()
    return json
  }

  isTxInBlock (blockHeader, tx) {
    // verify merkleProof tree against blockheader, tx
  }
}

export { MerkleProof }
