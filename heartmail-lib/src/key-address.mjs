/**
 * Bitcoin KeyAddress
 * ===============
 *
 * A bitcoin address.
 *
 * Note that an KeyAddress and an Addr are two completely different things. An
 * KeyAddress is what you send bitcoin to. An Addr is an ip address and port that
 * you connect to over the internet.
 */

import { Base58Check } from './base-58-check.mjs'
import { Constants } from './constants.mjs'
import { Hash } from './hash.mjs'
import { OpCode } from './op-code.mjs'
import { PubKey } from './pub-key.mjs'
import { PrivKey } from './priv-key.mjs'
import { Script } from './script.mjs'
import { Struct } from './struct.mjs'

class KeyAddress extends Struct {
  constructor (versionByteNum, hashBuf, constants = null) {
    super({ versionByteNum, hashBuf })
    constants = constants || Constants.Default.KeyAddress
    this.Constants = constants
  }

  fromBuffer (buf) {
    if (buf.length !== 1 + 20) {
      throw new Error('address buffers must be exactly 21 bytes')
    }
    if (
      buf[0] !== this.Constants.pubKeyHash
    ) {
      throw new Error('address: invalid versionByteNum byte')
    }
    this.versionByteNum = buf[0]
    this.hashBuf = buf.slice(1)
    return this
  }

  fromPubKeyHashBuf (hashBuf) {
    this.hashBuf = hashBuf
    this.versionByteNum = this.Constants.pubKeyHash
    return this
  }

  static fromPubKeyHashBuf (hashBuf) {
    return new this().fromPubKeyHashBuf(hashBuf)
  }

  fromPubKey (pubKey) {
    const hashBuf = Hash.sha256Ripemd160(pubKey.toBuffer())
    return this.fromPubKeyHashBuf(hashBuf)
  }

  static fromPubKey (pubKey) {
    return new this().fromPubKey(pubKey)
  }

  fromPrivKey (privKey) {
    const pubKey = new PubKey().fromPrivKey(privKey)
    const hashBuf = Hash.sha256Ripemd160(pubKey.toBuffer())
    return this.fromPubKeyHashBuf(hashBuf)
  }

  static fromPrivKey (privKey) {
    return new this().fromPrivKey(privKey)
  }

  fromRandom () {
    const randomPrivKey = new PrivKey().fromRandom()
    return this.fromPrivKey(randomPrivKey)
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  fromString (str) {
    const buf = Base58Check.decode(str)
    return this.fromBuffer(buf)
  }

  static isValid (addrstr) {
    let address
    try {
      address = new KeyAddress().fromString(addrstr)
    } catch (e) {
      return false
    }
    return address.isValid()
  }

  isValid () {
    try {
      this.validate()
      return true
    } catch (e) {
      return false
    }
  }

  toTxOutScript () {
    const script = new Script()
    script.writeOpCode(OpCode.OP_DUP)
    script.writeOpCode(OpCode.OP_HASH160)
    script.writeBuffer(this.hashBuf)
    script.writeOpCode(OpCode.OP_EQUALVERIFY)
    script.writeOpCode(OpCode.OP_CHECKSIG)

    return script
  }

  fromTxInScript (script) {
    const pubKeyHashBuf = Hash.sha256Ripemd160(script.chunks[1].buf || Buffer.from('00'.repeat(32), 'hex'))
    return this.fromPubKeyHashBuf(pubKeyHashBuf)
  }

  static fromTxInScript (script) {
    return new this().fromTxInScript(script)
  }

  fromTxOutScript (script) {
    return this.fromPubKeyHashBuf(script.chunks[2].buf)
  }

  static fromTxOutScript (script) {
    return new this().fromTxOutScript(script)
  }

  toBuffer () {
    const versionByteBuf = Buffer.from([this.versionByteNum])
    const buf = Buffer.concat([versionByteBuf, this.hashBuf])
    return buf
  }

  toJSON () {
    return JSON.stringify(this.toString())
  }

  fromJSON (json) {
    const str = JSON.parse(json)
    return this.fromString(str)
  }

  toString () {
    return Base58Check.encode(this.toBuffer())
  }

  validate () {
    if (!Buffer.isBuffer(this.hashBuf) || this.hashBuf.length !== 20) {
      throw new Error('hashBuf must be a buffer of 20 bytes')
    }
    if (
      this.versionByteNum !== this.Constants.pubKeyHash
    ) {
      throw new Error('invalid versionByteNum')
    }
    return this
  }
}

export { KeyAddress }
