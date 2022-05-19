
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

  toBase36 () {
    return new Bn(this.buf.toString('hex'), 16).toString(36)
  }

  fromBase36 (str) {
    const bn = new Bn(str, 36)
    this.buf = bn.toBuffer({ size: LENGTH / 8 })
    return this
  }

  fromLeftRightBuf (leftBuf = Buffer.from('00'.repeat(8)), rightBuf = Buffer.from('00'.repeat(8))) {
    this.buf = Buffer.concat([leftBuf, rightBuf])
    return this
  }

  static fromLeftRightBuf (leftBuf, rightBuf) {
    return new this().fromLeftRightBuf(leftBuf, rightBuf)
  }

  fromLeftRightBn (leftBn = new Bn(0), rightBn = new Bn(0)) {
    const leftBuf = leftBn.toBuffer({ size: 8, endian: 'big' })
    const rightBuf = rightBn.toBuffer({ size: 8, endian: 'big' })
    return this.fromLeftRightBuf(leftBuf, rightBuf)
  }

  static fromLeftRightBn (leftBn, rightBn) {
    return new this().fromLeftRightBn(leftBn, rightBn)
  }

  getLeftBuf () {
    return this.buf.slice(0, 8)
  }

  getRightBuf () {
    return this.buf.slice(8, 16)
  }

  getLeftBn () {
    return new Bn(this.getLeftBuf().toString('hex'), 16)
  }

  getRightBn () {
    return new Bn(this.getRightBuf().toString('hex'), 16)
  }

  getLeftBase36 () {
    return this.getLeftBn().toString(36)
  }

  getRightBase36 () {
    return this.getRightBn().toString(36)
  }

  getLeftString () {
    return this.getLeftBase36()
  }

  getRightString () {
    return this.getRightBase36()
  }

  toShortId () {
    return this.getLeftBase36()
  }

  toLongId () {
    return this.toBase36()
  }

  fromShortId (shortId = '') {
    const leftBn = new Bn(shortId, 36)
    const rightBn = new Bn(0)
    this.fromLeftRightBn(leftBn, rightBn)
    return this
  }

  static fromShortId (shortId) {
    return new this().fromShortId(shortId)
  }

  fromLongId (longId = '') {
    return this.fromBase36(longId)
  }

  static fromLongId (longId) {
    return new this().fromLongId(longId)
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
