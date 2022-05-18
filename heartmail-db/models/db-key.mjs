// import connect from '../connect.mjs'
import { KeyAlias, KeyAddress, PubKey, PrivKey, Struct } from 'heartmail-lib'

// const connection = connect()

export default class DbKey extends Struct {
  constructor (keyAlias, keyAddress, pubKey, privKey, createdAt, updatedAt) {
    super({
      keyAlias,
      keyAddress,
      pubKey,
      privKey,
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
}
