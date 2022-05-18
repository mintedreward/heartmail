/**
 * Block
 * =====
 *
 * A block, of course, is a collection of transactions. This class is somewhat
 * incompconste at the moment. In the future, it should support the ability to
 * check to see if a transaction is in a block (thanks to the magic of merkle
 * trees). You will probably never use Yours Bitcoin to create a block, since almost
 * everyone will use bitcoind for that. As such, the primary way to use this is
 * new Block().fromBuffer(buf), which will parse the block and prepare its insides
 * for you to inspect.
 */

import { Br } from './br.mjs'
import { Bw } from './bw.mjs'
import { BlockHeader } from './block-header.mjs'
import { Hash } from './hash.mjs'
import { Merkle } from './merkle.mjs'
import { Struct } from './struct.mjs'
import { Tx } from './tx.mjs'
import { VarInt } from './var-int.mjs'

class Block extends Struct {
  constructor (blockHeader, txsVi, txs) {
    super({ blockHeader, txsVi, txs })
  }

  fromJSON (json) {
    const txs = []
    json.txs.forEach(function (tx) {
      txs.push(new Tx().fromJSON(tx))
    })
    this.fromObject({
      blockHeader: new BlockHeader().fromJSON(json.blockHeader),
      txsVi: new VarInt().fromJSON(json.txsVi),
      txs: txs
    })
    return this
  }

  toJSON () {
    const txs = []
    this.txs.forEach(function (tx) {
      txs.push(tx.toJSON())
    })
    return {
      blockHeader: this.blockHeader.toJSON(),
      txsVi: this.txsVi.toJSON(),
      txs: txs
    }
  }

  fromBr (br) {
    this.blockHeader = new BlockHeader().fromBr(br)
    this.txsVi = new VarInt(br.readVarIntBuf())
    const txsNum = this.txsVi.toNumber()
    this.txs = []
    for (let i = 0; i < txsNum; i++) {
      this.txs.push(new Tx().fromBr(br))
    }
    return this
  }

  toBw (bw) {
    if (!bw) {
      bw = new Bw()
    }
    bw.write(this.blockHeader.toBuffer())
    bw.write(this.txsVi.buf)
    const txsNum = this.txsVi.toNumber()
    for (let i = 0; i < txsNum; i++) {
      this.txs[i].toBw(bw)
    }
    return bw
  }

  hash () {
    return Hash.sha256Sha256(this.blockHeader.toBuffer())
  }

  id () {
    return new Br(this.hash()).readReverse().toString('hex')
  }

  verifyMerkleRoot () {
    const txsbufs = this.txs.map(tx => tx.toBuffer())
    const merkleRootBuf = Merkle.fromBuffers(txsbufs).hash()
    return Buffer.compare(merkleRootBuf, this.blockHeader.merkleRootBuf)
  }

  /**
   * Sometimes we don't want to parse an entire block into memory. Instead, we
   * simply want to iterate through all transactions in the block. That is what
   * this method is for. This method returns an efficient iterator which can be
   * used in a `for (tx of txs)` construct that returns each tx one at a time
   * without first parsing all of them into memory.
   *
   * @param {Buffer} blockBuf A buffer of a block.
   */
  static iterateTxs (blockBuf) {
    const br = new Br(blockBuf)
    const blockHeader = new BlockHeader().fromBr(br)
    const txsVi = new VarInt(br.readVarIntBuf())
    const txsNum = txsVi.toNumber()
    return {
      blockHeader,
      txsVi,
      txsNum,
      * [Symbol.iterator] () {
        for (let i = 0; i < txsNum; i++) {
          yield new Tx().fromBr(br)
        }
      }
    }
  }
}

Block.MAX_BLOCK_SIZE = 1000000

export { Block }
