/*
* TODO: This file should be deleted after we migrate to use the mb_accounts
* table.
*/
import { KeyAlias } from 'heartmail-lib'
import emailValidator from 'email-validator'
import DbKey from './db-key.mjs'
import { MbAccount } from '../structs/mb-account.mjs'

export default class DbAccessKey extends DbKey {
  constructor (...args) {
    super(...args)
    this.typeStr = 'account'
  }

  toMbAccount () {
    return new MbAccount().fromObject({
      id: this.keyAlias.toString(),
      privKey: this.privKey,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      contactFeeUsd: this.contactFeeAmountUsd,
      affiliateId: this.affiliateKeyAlias?.toString() || null,
      accessGrantedAt: this.accessGrantedAt,
      mbPayment: null,
      mbPaymentId: this.mbPaymentId,
      mbTxid: this.mbTxid,
      mbEmail: this.mbEmail,
      mbPaymail: this.mbPaymail,
      mbIdentityKey: null,
      mbUserId: null,
      mbName: null,
      mbAvatarUrl: null
    })
  }

  toJSON () {
    const json = super.toJSON()
    json.accessGrantedAt = this.accessGrantedAt.toJSON()
    json.affiliateKeyAlias = this.affiliateKeyAlias.toJSON()
    json.contactFeeAmountUsd = this.contactFeeAmountUsd
    json.mbEmail = this.mbEmail
    json.mbPaymail = this.mbPaymail
    json.mbPaymentId = this.mbPaymentId
    json.mbTxid = this.mbTxid
    return json
  }

  createDataBuf () {
    const dataObj = {
      accessGrantedAt: this.accessGrantedAt,
      affiliateKeyAlias: this.affiliateKeyAlias ? this.affiliateKeyAlias.toLongId() : null,
      contactFeeAmountUsd: this.contactFeeAmountUsd,
      mbEmail: this.mbEmail,
      mbPaymail: this.mbPaymail,
      mbPaymentId: this.mbPaymentId,
      mbTxid: this.mbTxid
    }
    const dataStr = JSON.stringify(dataObj)
    const dataBuf = Buffer.from(dataStr)
    this.dataBuf = dataBuf
    return this
  }

  parseDataBuf () {
    const dataStr = this.dataBuf.toString()
    const dataJSON = JSON.parse(dataStr)
    const dataObj = {
      accessGrantedAt: dataJSON.accessGrantedAt ? new Date(dataJSON.accessGrantedAt) : undefined,
      affiliateKeyAlias: dataJSON.affiliateKeyAlias ? KeyAlias.fromLongId(dataJSON.affiliateKeyAlias) : null,
      contactFeeAmountUsd: dataJSON.contactFeeAmountUsd,
      mbEmail: dataJSON.mbEmail,
      mbPaymail: dataJSON.mbPaymail,
      mbPaymentId: dataJSON.mbPaymentId,
      mbTxid: dataJSON.mbTxid
    }
    this.fromObject(dataObj)
    return this
  }

  create (obj) {
    this.fromRandom()
    this.fromObject(obj)
    this.accessGrantedAt = this.accessGrantedAt ? this.accessGrantedAt : new Date()
    this.contactFeeAmountUsd = this.contactFeeAmountUsd === undefined ? 1.00 : this.contactFeeAmountUsd
    this.createDataBuf()
    return this
  }

  static create (obj) {
    return new this().create(obj)
  }

  delayAccess () {
    this.accessGrantedAt.setDate(this.accessGrantedAt.getDate() + 30)
    return this
  }

  getValidationError () {
    const validationError = super.getValidationError()
    if (validationError) {
      return validationError
    }
    if (!(this.accessGrantedAt instanceof Date)) {
      return 'accessGrantedAt must be a Date'
    }
    if (this.affiliateKeyAlias !== undefined) {
      if (!(this.affiliateKeyAlias instanceof KeyAlias)) {
        return 'affiliateKeyAlias must be a KeyAlias or undefined'
      }
    }
    if (typeof this.contactFeeAmountUsd !== 'number') {
      return 'contactFeeAmountUsd must be a number'
    }
    if (this.contactFeeAmountUsd < 0) {
      return 'contactFeeAmountUsd must be positive'
    }
    if (this.mbEmail !== undefined) {
      if (!emailValidator.validate(this.mbEmail)) {
        return 'mbEmail must be an email address or undefined'
      }
    }
    if (this.mbPaymail !== undefined) {
      if (!emailValidator.validate(this.mbPaymail)) {
        return 'mbPaymail must be an email address or undefined'
      }
    }
    return ''
  }
}
