/**
 * AccountHeartmailAddress
 * =======================
 */

import { Struct } from './struct.mjs'

class AccountHeartmailAddress extends Struct {
  constructor (accountId, heartmailAddress, createdAt = new Date(), updatedAt = new Date()) {
    super({ accountId, heartmailAddress, createdAt, updatedAt })
  }

  toJSON () {
    const json = {}
    json.accountId = this.accountId
    json.heartmailAddress = this.heartmailAddress
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    return json
  }

  fromJSON (json = {}) {
    this.accountId = json.accountId
    this.heartmailAddress = json.heartmailAddress
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }
}

export { AccountHeartmailAddress }
