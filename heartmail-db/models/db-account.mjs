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
      mbEmail: this.mbEmail,
      mbPaymail: this.mbPaymail,
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
      mbEmail: dataJSON.mbEmail,
      mbPaymail: dataJSON.mbPaymail,
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
