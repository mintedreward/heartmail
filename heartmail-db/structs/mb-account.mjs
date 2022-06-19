/**
 * MbAccount
 * =========
 */

import { PrivKey, KeyAlias, Struct } from 'heartmail-lib'

export default class MbAccount extends Struct {
  constructor (id, privKey, createdAt = new Date(), updatedAt = new Date(), contactFeeUsd, affiliateId, accessGrantedAt = new Date(), mbPayment = null, mbPaymentId, mbTxid, mbEmail, mbPaymail, mbIdentityKey, mbUserId, mbName, mbAvatarUrl) {
    super({ id, privKey, createdAt, updatedAt, contactFeeUsd, affiliateId, accessGrantedAt, mbPayment, mbPaymentId, mbTxid, mbEmail, mbPaymail, mbIdentityKey, mbUserId, mbName, mbAvatarUrl })
  }

  toJSON () {
    const json = {}
    json.id = this.id
    json.privKey = this.privKey ? this.privKey.toString() : ''
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    json.contactFeeUsd = this.contactFeeUsd
    json.affiliateId = this.affiliateId
    json.accessGrantedAt = this.accessGrantedAt.toJSON()
    json.mbPayment = null
    json.mbPaymentId = this.mbPaymentId
    json.mbTxid = this.mbTxid
    json.mbEmail = this.mbEmail
    json.mbPaymail = this.mbPaymail
    json.mbIdentityKey = this.mbIdentityKey
    json.mbUserId = this.mbUserId
    json.mbName = this.mbName
    json.mbAvatarUrl = this.mbAvatarUrl
    return json
  }

  fromJSON (json = {}) {
    this.id = json.id
    this.privKey = json.privKey ? PrivKey.fromString(json.privKey) : null
    this.createdAt = new Date(json.createdAt)
    this.updatedAt = new Date(json.updatedAt)
    this.contactFeeUsd = json.contactFeeUsd
    this.affiliateId = json.affiliateId
    this.accessGrantedAt = new Date(json.accessGrantedAt)
    this.mbPayment = null
    this.mbPaymentId = json.mbPaymentId
    this.mbTxid = json.mbTxid
    this.mbEmail = json.mbEmail
    this.mbPaymail = json.mbPaymail
    this.mbIdentityKey = json.mbIdentityKey
    this.mbUserId = json.mbUserId
    this.mbName = json.mbName
    this.mbAvatarUrl = json.mbAvatarUrl
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
    this.contactFeeUsd = null
    this.affiliateId = null
    this.accessGrantedAt = new Date()
    this.mbPayment = null
    this.mbPaymentId = null
    this.mbTxid = null
    this.mbEmail = null
    this.mbPaymail = null
    this.mbIdentityKey = null
    this.mbUserId = null
    this.mbName = null
    this.mbAvatarUrl = null
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  isValid () {
    return true
  }

  toPublic () {
    this.privKey = null
    return this
  }

  delayAccess () {
    this.accessGrantedAt.setDate(this.accessGrantedAt.getDate() + 30)
    return this
  }
}
