/**
 * Account
 * =======
 */

import { PrivKey, KeyAlias, Struct } from 'openspv-lib'

export default class Account extends Struct {
  constructor (id, privKey, createdAt = new Date(), updatedAt = new Date(), signedInAt = new Date(), name = 'Anonymous', heartmail, bio = '', contactFeeUsd, affiliateId, email, paymail, accessGrantedAt = new Date(), mbPaymentId, mbTxid, mbEmail, mbPaymail, mbIdentityKey) {
    super({ id, privKey, createdAt, updatedAt, signedInAt, name, heartmail, bio, contactFeeUsd, affiliateId, email, paymail, accessGrantedAt, mbPaymentId, mbTxid, mbEmail, mbPaymail, mbIdentityKey })
  }

  fromMbAccount (mbAccount) {
    this.fromObject({
      id: mbAccount.id,
      privKey: mbAccount.privKey,

      createdAt: mbAccount.createdAt,
      updatedAt: mbAccount.updatedAt,
      signedInAt: mbAccount.createdAt,

      name: mbAccount.mbName,
      heartmail: `${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`,
      bio: '',
      contactFeeUsd: mbAccount.contactFeeUsd,
      affiliateId: mbAccount.affiliateId,

      // sometimes the MB email is absent. in this case we can substitute their
      // MB paymail instead. Of course, this does not really work, because the
      // user cannot receive emails here. However, it will enable us to replace
      // this in the database when that user is found out.
      email: mbAccount.mbEmail || `${mbAccount.mbUserId}@moneybutton.com`,
      paymail: mbAccount.mbPaymail,

      accessGrantedAt: mbAccount.accessGrantedAt
    })
    return this
  }

  static fromMbAccount (mbAccount) {
    return new this().fromMbAccount(mbAccount)
  }

  toJSON () {
    const json = {}
    json.id = this.id
    json.privKey = this.privKey ? this.privKey.toString() : ''
    json.createdAt = this.createdAt?.toJSON()
    json.updatedAt = this.updatedAt?.toJSON()
    json.signedInAt = this.signedInAt?.toJSON()
    json.name = this.name
    json.heartmail = this.heartmail
    json.bio = this.bio
    json.contactFeeUsd = this.contactFeeUsd
    json.affiliateId = this.affiliateId
    json.email = this.email
    json.paymail = this.paymail
    json.accessGrantedAt = this.accessGrantedAt?.toJSON()
    return json
  }

  fromJSON (json = {}) {
    this.id = json.id
    this.privKey = json.privKey ? PrivKey.fromString(json.privKey) : null
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    this.signedInAt = json.signedInAt ? new Date(json.signedInAt) : null
    this.name = json.name
    this.heartmail = json.heartmail
    this.bio = json.bio
    this.contactFeeUsd = json.contactFeeUsd
    this.affiliateId = json.affiliateId
    this.email = json.email
    this.paymail = json.paymail
    this.accessGrantedAt = json.accessGrantedAt ? new Date(json.accessGrantedAt) : null
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }

  fromRandom () {
    this.privKey = PrivKey.fromRandom()
    this.id = KeyAlias.fromPrivKey(this.privKey).toString()
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.signedInAt = new Date()
    this.name = 'Anonymous'
    this.heartmail = null
    this.bio = ''
    this.contactFeeUsd = 1.00
    this.affiliateId = null
    this.email = null
    this.paymail = null
    this.accessGrantedAt = new Date()
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  static isNameValid (name = '') {
    if (name.length <= 3 || name.length > 40) {
      return false
    }
    return true
  }

  static isBioValid (bio = '') {
    if (bio.length < 0 || bio.length > 40) {
      return false
    }
    return true
  }

  static isContactFeeValid (contactFeeUsd = 1.00) {
    if (contactFeeUsd < 0) {
      return false
    }
    return true
  }

  isValid () {
    return (
      this.constructor.isNameValid(this.name) &&
      this.constructor.isBioValid(this.bio) &&
      this.constructor.isContactFeeValid(this.contactFeeUsd)
    )
  }

  isValidUpdate () {
    return (
      (this.name != null ? this.constructor.isNameValid(this.name) : true) &&
      (this.bio != null ? this.constructor.isBioValid(this.bio) : true) &&
      (this.contactFeeUsd != null ? this.constructor.isContactFeeValid(this.contactFeeUsd) : true)
    )
  }

  toPublic () {
    const mbAccount = this.clone()
    mbAccount.privKey = null
    return mbAccount
  }
}
