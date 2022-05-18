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
}
