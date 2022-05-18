import DbKey from './db-key.mjs'
import { Hash, PrivKey, Bn } from 'heartmail-lib'

export default class DbHash extends DbKey {
  constructor (data) {
    super({ data })
  }

  fromData (data) {
    if (!Buffer.isBuffer(data)) {
      throw new Error('data must be a Buffer')
    }
    const type = 'hash256'
    const hashBuf = Hash.sha256Sha256(data)
    const bn = new Bn().fromBuffer(hashBuf)
    const privKey = PrivKey.fromBn(bn)
    this.fromObject({
      type,
      data
    })
    return this.fromPrivKey(privKey)
  }
}
