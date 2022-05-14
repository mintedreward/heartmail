'use strict'

import { Struct } from './struct.mjs'
import { Bn } from './bn.mjs'

const DEFAULT_LENGTH = 128 // bits

class KeyId extends Struct {
  constructor (buf) {
    super({ buf })
  }

  fromAddress (address, length = DEFAULT_LENGTH) {
    const buf = address.hashBuf.slice(0, length / 8)
    this.buf = buf
    this.length = length
    return this
  }

  static fromAddress (address, length = DEFAULT_LENGTH) {
    return new this().fromAddress(address, length)
  }

  toBase36 () {
    return new Bn(this.buf.toString('hex'), 16).toString(36)
  }

  fromBase36 (str, length = DEFAULT_LENGTH) {
    const bn = new Bn(str, 36)
    this.buf = bn.toBuffer({ size: length / 8 })
    return this
  }

  toString (length = DEFAULT_LENGTH) {
    return this.toBase36(length)
  }

  fromString (str, length = DEFAULT_LENGTH) {
    return this.fromBase36(str, length)
  }
}

export { KeyId }
