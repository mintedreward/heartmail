/**
 * MbPayment
 * =========
 */

import { Struct } from 'heartmail-lib'

export default class MbPayment extends Struct {
  constructor (mbPaymentId, mbPaymentStr, createdAt = new Date(), updatedAt = new Date()) {
    super({ mbPaymentId, mbPaymentStr, createdAt, updatedAt })
  }

  toJSON () {
    const json = {}
    json.mbPaymentId = this.mbPaymentId || null
    json.mbPaymentStr = this.mbPaymentStr || null
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    return json
  }

  fromJSON (json = {}) {
    this.mbPaymentId = json.mbPaymentId || null
    this.mbPaymentStr = json.mbPaymentStr || null
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }

  fromRandom () {
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }
}
