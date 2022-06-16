
import { Struct } from './struct.mjs'
import { Bn } from './bn.mjs'
import { KeyAddress } from './key-address.mjs'

const LENGTH = 128 // bits

class KeyAlias extends Struct {
  constructor (buf) {
    super({ buf })
  }

  fromBuffer (buf) {
    this.buf = buf
    return this
  }

  fromKeyAddress (address) {
    const buf = address.hashBuf.slice(0, LENGTH / 8)
    this.buf = buf
    return this
  }

  static fromKeyAddress (address) {
    return new this().fromKeyAddress(address, LENGTH)
  }

  fromPrivKey (privKey) {
    return this.fromKeyAddress(KeyAddress.fromPrivKey(privKey))
  }

  static fromPrivKey (privKey) {
    return new this().fromPrivKey(privKey)
  }

  toBase36 () {
    return new Bn(this.buf.toString('hex'), 16).toString(36)
  }

  fromBase36 (str) {
    const bn = new Bn(str, 36)
    this.buf = bn.toBuffer({ size: LENGTH / 8 })
    return this
  }

  toString () {
    return this.toBase36(LENGTH)
  }

  fromString (str) {
    return this.fromBase36(str, LENGTH)
  }

  toJSON () {
    return JSON.stringify(this.toString())
  }

  fromJSON (json) {
    return this.fromString(JSON.parse(json))
  }

  fromRandom () {
    return this.fromKeyAddress(KeyAddress.fromRandom())
  }

  static fromRandom () {
    return new this().fromRandom()
  }
}

export { KeyAlias }
