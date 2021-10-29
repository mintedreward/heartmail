/**
 * Block Header
 * ============
 *
 * Every block contains a block header. SPV nodes track the block headers and
 * confirm if a transaction is in a block by checking the Merkle proof.
 */
'use strict'

import { Bw } from './bw.mjs'
import { Struct } from './struct.mjs'

class BlockHeader extends Struct {
  constructor (
    versionBytesNum,
    prevBlockHashBuf,
    merkleRootBuf,
    time,
    bits,
    nonce
  ) {
    super({
      versionBytesNum,
      prevBlockHashBuf,
      merkleRootBuf,
      time,
      bits,
      nonce
    })
  }

  fromJSON (json) {
    this.fromObject({
      versionBytesNum: json.versionBytesNum,
      prevBlockHashBuf: Buffer.from(json.prevBlockHashBuf, 'hex'),
      merkleRootBuf: Buffer.from(json.merkleRootBuf, 'hex'),
      time: json.time,
      bits: json.bits,
      nonce: json.nonce
    })
    return this
  }

  toJSON () {
    return {
      versionBytesNum: this.versionBytesNum,
      prevBlockHashBuf: this.prevBlockHashBuf.toString('hex'),
      merkleRootBuf: this.merkleRootBuf.toString('hex'),
      time: this.time,
      bits: this.bits,
      nonce: this.nonce
    }
  }

  fromBr (br) {
    this.versionBytesNum = br.readUInt32LE()
    this.prevBlockHashBuf = br.read(32)
    this.merkleRootBuf = br.read(32)
    this.time = br.readUInt32LE()
    this.bits = br.readUInt32LE()
    this.nonce = br.readUInt32LE()
    return this
  }

  toBw (bw) {
    if (!bw) {
      bw = new Bw()
    }
    bw.writeUInt32LE(this.versionBytesNum)
    bw.write(this.prevBlockHashBuf)
    bw.write(this.merkleRootBuf)
    bw.writeUInt32LE(this.time)
    bw.writeUInt32LE(this.bits)
    bw.writeUInt32LE(this.nonce)
    return bw
  }
}

export { BlockHeader }
