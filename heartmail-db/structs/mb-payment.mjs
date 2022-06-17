/**
 * MbPayment
 * =========
 */

import { Struct } from 'heartmail-lib'

class MbPayment extends Struct {
  constructor (mbPaymentId, mbPayment, createdAt = new Date(), updatedAt = new Date()) {
    super({ mbPaymentId, mbPayment, createdAt, updatedAt })
  }

  toJSON () {
    const json = {}
    json.mbPaymentId = this.mbPaymentId
    json.mbPayment = this.mbPayment
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    return json
  }

  fromJSON (json = {}) {
    this.mbPaymentId = json.mbPaymentId
    this.mbPayment = json.mbPayment
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }
}

export { MbPayment }
