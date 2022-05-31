/**
 * HeartmailAddress
 * ================
 */

import { Struct } from './struct.mjs'

class HeartmailAddress extends Struct {
  constructor (heartmailAddress, createdAt = new Date(), updatedAt = new Date(), accountId) {
    super({ heartmailAddress, createdAt, updatedAt, accountId })
  }

  toJSON () {
    const json = {}
    json.heartmailAddress = this.heartmailAddress
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    json.accountId = this.accountId
    return json
  }

  fromJSON (json = {}) {
    this.heartmailAddress = json.heartmailAddress
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    this.accountId = json.accountId
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }
}

export { HeartmailAddress }
