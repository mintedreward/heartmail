/**
 * AccountHeartmail
 * ================
 */

import { Struct } from 'heartmail-lib'

export default class AccountHeartmail extends Struct {
  constructor (accountId, heartmail, createdAt = new Date(), updatedAt = new Date()) {
    super({ accountId, heartmail, createdAt, updatedAt })
  }

  toJSON () {
    const json = {}
    json.accountId = this.accountId
    json.heartmail = this.heartmail
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    return json
  }

  fromJSON (json = {}) {
    this.accountId = json.accountId
    this.heartmail = json.heartmail
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }

  fromAccount (account) {
    this.accountId = account.id
    this.heartmail = account.heartmail
    this.createdAt = account.createdAt
    this.updatedAt = account.updatedAt
    return this
  }

  static fromAccount (account) {
    return new this().fromAccount(account)
  }
}
