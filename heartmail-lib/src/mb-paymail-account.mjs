/**
 * MbPaymailAccount
 * ================
 */
import { Struct } from './struct.mjs'

class MbPaymailAccount extends Struct {
  constructor (mbPaymail, createdAt = new Date(), updatedAt = new Date(), signedInAt = new Date(), accountId, accountName, accountPrimaryHeartmailAddress, accountBio) {
    super({ mbPaymail, createdAt, updatedAt, signedInAt, accountId, accountName, accountPrimaryHeartmailAddress, accountBio })
  }

  toJSON () {
    const json = {}
    json.mbPaymail = this.mbPaymail
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    json.signedInAt = this.signedInAt.toJSON()
    json.accountId = this.accountId
    json.accountName = this.accountName
    json.accountPrimaryHeartmailAddress = this.accountPrimaryHeartmailAddress
    json.accountBio = this.accountBio
    return json
  }

  fromJSON (json = {}) {
    this.mbPaymail = json.mbPaymail
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    this.signedInAt = json.signedInAt ? new Date(json.signedInAt) : null
    this.accountId = json.accountId
    this.accountName = json.accountName
    this.accountPrimaryHeartmailAddress = json.accountPrimaryHeartmailAddress
    this.accountBio = json.accountBio
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }

  fromAccount (account) {
    this.mbPaymail = account.mbPaymail
    this.createdAt = account.createdAt
    this.updatedAt = account.updatedAt
    this.signedInAt = account.signedInAt
    this.accountId = account.id
    this.accountName = account.name
    this.accountPrimaryHeartmailAddress = account.primaryHeartmailAddress
    this.accountBio = account.bio
    return this
  }

  static fromAccount (account) {
    return new this().fromAccount(account)
  }
}

export { MbPaymailAccount }
