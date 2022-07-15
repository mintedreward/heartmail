/**
 * AccountAvatar
 * ===============
 */

import { Struct } from 'openspv-lib'

export default class AccountAvatar extends Struct {
  constructor (accountId, size, avatarBuf, createdAt = new Date(), updatedAt = new Date()) {
    super({ accountId, size, avatarBuf, createdAt, updatedAt })
  }

  toJSON () {
    const json = {}
    json.accountId = this.accountId
    json.size = this.size
    json.avatarBuf = this.avatarBuf ? this.avatarBuf.toString('hex') : null
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    return json
  }

  fromJSON (json = {}) {
    this.accountId = json.accountId
    this.size = json.size
    this.avatarBuf = json.avatarBuf ? Buffer.from(json.avatarBuf, 'hex') : null
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }
}
