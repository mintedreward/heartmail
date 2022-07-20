/**
 * EmailAccount
 * ============
 */
import { Struct } from 'heartmail-lib'

export default class EmailAccount extends Struct {
  constructor (email, createdAt = new Date(), updatedAt = new Date(), signedInAt = new Date(), accountId, accountName, accountHeartmail, accountBio) {
    super({ email, createdAt, updatedAt, signedInAt, accountId, accountName, accountHeartmail, accountBio })
  }

  fromRandom () {
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  toJSON () {
    const json = {}
    json.email = this.email
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    json.signedInAt = this.signedInAt.toJSON()
    json.accountId = this.accountId
    json.accountName = this.accountName
    json.accountHeartmail = this.accountHeartmail
    json.accountBio = this.accountBio
    return json
  }

  fromJSON (json = {}) {
    this.email = json.email
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    this.signedInAt = json.signedInAt ? new Date(json.signedInAt) : null
    this.accountId = json.accountId
    this.accountName = json.accountName
    this.accountHeartmail = json.accountHeartmail
    this.accountBio = json.accountBio
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }

  fromMbAccount (mbAccount) {
    this.email = `${mbAccount.mbUserId}@moneybutton.com`
    this.createdAt = mbAccount.createdAt
    this.updatedAt = mbAccount.updatedAt
    this.signedInAt = mbAccount.createdAt
    this.accountId = mbAccount.id
    this.accountName = mbAccount.mbName
    this.accountHeartmail = `${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`
    this.accountBio = ''
    return this
  }

  static fromMbAccount (mbAccount) {
    return new this().fromMbAccount(mbAccount)
  }
}
