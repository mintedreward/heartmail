import { KeyAlias } from 'heartmail-lib'
import emailValidator from 'email-validator'
import DbKey from './db-key.mjs'

export default class DbAccount extends DbKey {
  constructor (...args) {
    super(...args)
    this.typeStr = 'account'
  }

  createDataBuf () {
    const dataObj = {
      accessGrantedAt: this.accessGrantedAt,
      externalEmail: this.externalEmail,
      externalPaymail: this.externalPaymail,
      affiliateKeyAlias: this.affiliateKeyAlias,
      contactFeeAmountUsd: this.contactFeeAmountUsd,
      mbPaymentId: this.mbPaymentId,
      mbTxId: this.mbTxId
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
      externalEmail: dataJSON.externalEmail,
      externalPaymail: dataJSON.externalPaymail,
      affiliateKeyAlias: dataJSON.affiliateKeyAlias ? KeyAlias.fromJSON(dataJSON.affiliateKeyAlias) : undefined,
      contactFeeAmountUsd: dataJSON.contactFeeAmountUsd,
      mbPaymentId: dataJSON.mbPaymentId,
      mbTxId: dataJSON.mbTxId
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

  delayAccess (days = 30) {
    this.accessGrantedAt.setDate(this.accessGrantedAt.getDate() + days)
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
    if (this.externalEmail !== undefined) {
      if (!emailValidator.validate(this.externalEmail)) {
        return 'externalEmail must be an email address or undefined'
      }
    }
    if (this.externalPaymail !== undefined) {
      if (!emailValidator.validate(this.externalPaymail)) {
        return 'externalPaymail must be an email address or undefined'
      }
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
    return ''
  }
}
