/**
 * AddressAccount
 * ==============
 *
 * Address can be an email, paymail, or heartmail. (Whereby "heartmail" we mean
 * email+paymail and can be hosted by a third party service.) It is always of
 * the form [name]@[domain]. We always use the lowercase normalized form.
 */
import { Struct } from 'heartmail-lib'

class AddressAccount extends Struct {
  constructor (address, createdAt = new Date(), updatedAt = new Date(), signedInAt = new Date(), accountId, accountName, accountHeartmail, accountBio) {
    super({ address, createdAt, updatedAt, signedInAt, accountId, accountName, accountHeartmail, accountBio })
  }

  toJSON () {
    const json = {}
    json.address = this.address
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
    this.address = json.address
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
    this.address = `${mbAccount.mbUserId}@moneybutton.com`
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

export { AddressAccount }
