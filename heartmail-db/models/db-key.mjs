// import connect from '../connect.mjs'
import { KeyAlias, KeyAddress, PubKey, PrivKey, Struct } from 'heartmail-lib'

// const connection = connect()

export default class DbKey extends Struct {
  constructor (keyAlias, keyAddress, pubKey, privKey, typeStr, dataBuf, createdAt, updatedAt) {
    super({
      keyAlias,
      keyAddress,
      pubKey,
      privKey,
      typeStr,
      dataBuf,
      createdAt,
      updatedAt
    })
  }

  fromRandom () {
    const privKey = PrivKey.fromRandom()
    const pubKey = PubKey.fromPrivKey(privKey)
    const keyAddress = KeyAddress.fromPubKey(pubKey)
    const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
    const createdAt = new Date()
    const updatedAt = new Date()
    this.fromObject({
      keyAlias,
      keyAddress,
      pubKey,
      privKey,
      createdAt,
      updatedAt
    })
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  fromJSON (json) {
    this.fromObject({
      keyAlias: KeyAlias.fromJSON(json.keyAlias),
      keyAddress: KeyAddress.fromJSON(json.keyAddress),
      pubKey: json.pubKey ? PubKey.fromJSON(json.pubKey) : undefined,
      privKey: json.privKey ? PrivKey.fromJSON(json.privKey) : undefined,
      typeStr: json.typeStr,
      dataBuf: json.dataBuf ? Buffer.fromString(json.dataBuf, 'hex') : undefined,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt)
    })
    return this
  }

  isValid () {
    return !this.getValidationError()
  }

  getValidationError () {
    if (!this.keyAlias) {
      return 'missing keyAlias'
    }
    if (this.keyAddress !== undefined) {
      const keyAlias = KeyAlias.fromKeyAddress(this.keyAddress)
      if (keyAlias.toString() !== this.keyAlias.toString()) {
        return 'keyAlias does not match keyAddress'
      }
    }
    if (this.pubKey !== undefined) {
      const keyAddress = KeyAddress.fromPubKey(this.pubKey)
      if (keyAddress.toString() !== this.keyAddress.toString()) {
        return 'keyAddress does not match pubKey'
      }
    }
    if (this.privKey !== undefined) {
      const pubKey = PubKey.fromPrivKey(this.privKey)
      if (pubKey.toString() !== this.pubKey.toString()) {
        return 'pubKey does not match privKey'
      }
    }
    if (this.typeStr !== undefined) {
      if (typeof this.typeStr !== 'string') {
        return 'typeStr must be a string'
      }
    }
    if (this.dataBuf !== undefined) {
      if (!Buffer.isBuffer(this.dataBuf)) {
        return 'dataBuf must be a Buffer'
      }
    }
    return ''
  }
}
