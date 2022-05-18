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
      ownerEmailAddress: this.ownerEmailAddress,
      paymentEmailAddress: this.paymentEmailAddress,
      affiliateKeyAlias: this.affiliateKeyAlias,
      contactFeeAmountUsd: this.contactFeeAmountUsd
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
      accessGrantedAt: new Date(dataJSON.accessGrantedAt),
      ownerEmailAddress: dataJSON.ownerEmailAddress,
      paymentEmailAddress: dataJSON.paymentEmailAddress,
      affiliateKeyAlias: KeyAlias.fromJSON(dataJSON.affiliateKeyAlias),
      contactFeeAmountUsd: dataJSON.contactFeeAmountUsd
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

  getValidationError () {
    const validationError = super.getValidationError()
    if (validationError) {
      return validationError
    }
    if (!(this.accessGrantedAt instanceof Date)) {
      return 'accessGrantedAt must be a Date'
    }
    if (!emailValidator.validate(this.ownerEmailAddress)) {
      return 'ownerEmailAddress must be an email address'
    }
    if (!emailValidator.validate(this.paymentEmailAddress)) {
      return 'paymentEmailAddress must be an email address'
    }
    if (this.affiliateKeyAlias) {
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
