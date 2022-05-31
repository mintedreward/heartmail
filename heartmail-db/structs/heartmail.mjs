/**
 * Heartmail
 * ==================
 */

import { Struct } from 'heartmail-lib'

class Heartmail extends Struct {
  constructor (heartmail, createdAt = new Date(), updatedAt = new Date(), accountId) {
    super({ heartmail, createdAt, updatedAt, accountId })
  }

  toJSON () {
    const json = {}
    json.heartmail = this.heartmail
    json.createdAt = this.createdAt.toJSON()
    json.updatedAt = this.updatedAt.toJSON()
    json.accountId = this.accountId
    return json
  }

  fromJSON (json = {}) {
    this.heartmail = json.heartmail
    this.createdAt = json.createdAt ? new Date(json.createdAt) : null
    this.updatedAt = json.updatedAt ? new Date(json.updatedAt) : null
    this.accountId = json.accountId
    return this
  }

  static fromJSON (json = {}) {
    return new this().fromJSON(json)
  }
}

export { Heartmail }
