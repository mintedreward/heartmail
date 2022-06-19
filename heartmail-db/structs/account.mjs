/**
 * Account
 * =======
 */

import { PrivKey, KeyAlias, Struct } from 'heartmail-lib'

class Account extends Struct {
  constructor (id, privKey, createdAt = new Date(), updatedAt = new Date(), signedInAt = new Date(), authAddress, name = 'Anonymous', heartmail, bio = '', contactFeeUsd, affiliateId, email, paymail, accessGrantedAt = new Date(), mbPaymentId, mbTxid, mbEmail, mbPaymail, mbIdentityKey) {
    super({ id, privKey, createdAt, updatedAt, signedInAt, authAddress, name, heartmail, bio, contactFeeUsd, affiliateId, email, paymail, accessGrantedAt, mbPaymentId, mbTxid, mbEmail, mbPaymail, mbIdentityKey })
  }

  toJSON () {
    const json = {}
    json.id = this.id
    json.privKey = this.privKey ? this.privKey.toString() : ''
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    json.signedInAt = this.signedInAt.toJSON()
    json.authAddress = this.authAddress
    json.name = this.name
    json.heartmail = this.heartmail
    json.bio = this.bio
    json.contactFeeUsd = this.contactFeeUsd
    json.affiliateId = this.affiliateId
    json.email = this.email
    json.paymail = this.paymail
    json.accessGrantedAt = this.accessGrantedAt.toJSON()
    return json
  }

  fromJSON (json = {}) {
    this.id = json.id
    this.privKey = json.privKey ? PrivKey.fromString(json.privKey) : null
    this.createdAt = new Date(json.createdAt)
    this.updatedAt = new Date(json.updatedAt)
    this.signedInAt = new Date(json.signedInAt)
    this.authAddress = json.authAddress
    this.name = json.name
    this.heartmail = json.heartmail
    this.bio = json.bio
    this.contactFeeUsd = json.contactFeeUsd
    this.affiliateId = json.affiliateId
    this.email = json.email
    this.paymail = json.paymail
    this.accessGrantedAt = new Date(json.accessGrantedAt)
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
    this.authAddress = null
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

  toPublic () {
    this.privKey = null
  }
}

export { Account }
