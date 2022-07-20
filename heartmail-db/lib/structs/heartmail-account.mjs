/**
 * HeartmailAccount
 * ================
 */

import { Struct } from 'heartmail-lib'

export default class HeartmailAccount extends Struct {
  constructor (heartmail, accountId, createdAt = new Date(), updatedAt = new Date()) {
    super({ heartmail, accountId, createdAt, updatedAt })
  }

  toJSON () {
    const json = {}
    json.heartmail = this.heartmail
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    json.accountId = this.accountId
    return json
  }

  fromJSON (json = {}) {
    this.heartmail = json.heartmail
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    this.accountId = json.accountId
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }

  fromAccount (account) {
    this.heartmail = account.heartmail
    this.accountId = account.id
    this.createdAt = account.createdAt
    this.updatedAt = account.updatedAt
    return this
  }

  static fromAccount (account) {
    return new this().fromAccount(account)
  }
}
