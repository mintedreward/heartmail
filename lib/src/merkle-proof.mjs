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
  }

  fromJSON (json) {
    // reconstruct merkleNode from json
  }

  toJSON () {
    // format merkleNode into json
  }

  flagsHasTx () {
    return this.flagsNum & 0x01
  }

  flagsTargetType () {
    const val = this.flags & (0x04 | 0x02)
    if (val === 0) {
      return 'block hash'
    } else if (val === 2) {
      return 'block header'
    } else if (val === 4) {
      return 'merkle root'
    } else {
      throw new Error('invalid flags target type')
    }
  }

  fromBr (br) {
    this.flagsNum = br.readInt8()
    this.indexNum = br.readVarIntNum()
    this.txLengthNum = this.flagsHasTx() ? br.readVarIntNum() : null
    this.txOrIdBuf = this.txLengthNum ? br.read(this.txLengthNum) : br.read(32)
    this.targetBuf = this.flagsTargetType() === 'block header' ? br.read(80) : br.read(32)
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

  verifyProof (blockHeader, tx = this.tx) {
    // verify merkleProof tree against blockheader, tx
    if (!tx) {
      throw new Error('no tx provided')
    }
  }
}

export { MerkleProof }
