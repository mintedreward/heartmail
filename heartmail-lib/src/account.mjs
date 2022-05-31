/**
 * Account
 * =======
 */

import { PrivKey } from './priv-key.mjs'
import { KeyAlias } from './key-alias.mjs'
import { Struct } from './struct.mjs'

class Account extends Struct {
  constructor (id, privKey, createdAt, updatedAt, signedInAt, name, primaryHeartmailAddress, bio, contactFeeAmountUsd, affiliateId, accessGrantedAt, mbPaymentId, mbTxid, mbEmail, mbPaymail, mbIdentityKey) {
    super({ id, privKey, createdAt, updatedAt, signedInAt, name, primaryHeartmailAddress, bio, contactFeeAmountUsd, affiliateId, accessGrantedAt, mbPaymentId, mbTxid, mbEmail, mbPaymail, mbIdentityKey })
  }

  toJSON () {
    const json = {}
    json.id = this.id
    json.privKey = this.privKey ? this.privKey.toString() : ''
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    json.signedInAt = this.signedInAt.toJSON()
    json.name = this.name
    json.primaryHeartmailAddress = this.primaryHeartmailAddress
    json.bio = this.bio
    json.contactFeeAmountUsd = this.contactFeeAmountUsd
    json.affiliateId = this.affiliateId
    json.accessGrantedAt = this.accessGrantedAt.toJSON()
    json.mbPaymentId = this.mbPaymentId
    json.mbTxid = this.mbTxid
    json.mbEmail = this.mbEmail
    json.mbPaymail = this.mbPaymail
    json.mbIdentityKey = this.mbIdentityKey
    return json
  }

  fromJSON (json = {}) {
    this.id = json.id
    this.privKey = json.privKey ? PrivKey.fromString(json.privKey) : null
    this.createdAt = new Date(json.createdAt)
    this.updatedAt = new Date(json.updatedAt)
    this.signedInAt = new Date(json.signedInAt)
    this.name = json.name
    this.primaryHeartmailAddress = json.primaryHeartmailAddress
    this.bio = json.bio
    this.contactFeeAmountUsd = json.contactFeeAmountUsd
    this.affiliateId = json.affiliateId
    this.accessGrantedAt = new Date(json.accessGrantedAt)
    this.mbPaymentId = json.mbPaymentId
    this.mbTxid = json.mbTxid
    this.mbEmail = json.mbEmail
    this.mbPaymail = json.mbPaymail
    this.mbIdentityKey = json.mbIdentityKey
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
    this.primaryHeartmailAddress = null
    this.bio = 'I love HeartMail'
    this.contactFeeAmountUsd = 1.00
    this.affiliateId = null
    this.accessGrantedAt = new Date()
    this.mbPaymentId = null
    this.mbTxid = null
    this.mbEmail = null
    this.mbPaymail = null
    this.mbIdentityKey = null
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
    if (bio.length <= 3 || bio.length > 40) {
      return false
    }
    return true
  }

  static isContactFeeValid (contactFeeAmountUsd = 1.00) {
    if (contactFeeAmountUsd < 0) {
      return false
    }
    return true
  }

  isValid () {
    return this.constructor.isNameValid(this.name) && this.constructor.isBioValid(this.bio) && this.constructor.isContactFeeValid(this.contactFeeAmountUsd)
  }

  toPublic () {
    this.privKey = null
  }

  delayAccess (accessGrantedAt = new Date('2022-07-01T10:00:00.000Z')) {
    this.accessGrantedAt = accessGrantedAt
  }
}

export { Account }
