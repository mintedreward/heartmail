/* global describe,it */
import { HmAccountHeartmail } from '../src/hm-account-heartmail.mjs'
import { KeyAlias } from '../src/key-alias.mjs'
import should from 'should'

describe('HmAccountHeartmail', function () {
  it('should exist', function () {
    should.exist(HmAccountHeartmail)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const hmAccountHeartmail = new HmAccountHeartmail()
      hmAccountHeartmail.heartmail = 'name@heartmail.com'
      hmAccountHeartmail.accountId = KeyAlias.fromRandom().toString()
      const json = hmAccountHeartmail.toJSON()
      const hmAccountHeartmail2 = HmAccountHeartmail.fromJSON(json)
      hmAccountHeartmail.heartmail.should.equal(hmAccountHeartmail2.heartmail)
      hmAccountHeartmail.accountId.should.equal(hmAccountHeartmail2.accountId)
      hmAccountHeartmail.createdAt.toJSON().should.equal(hmAccountHeartmail2.createdAt.toJSON())
      hmAccountHeartmail.updatedAt.toJSON().should.equal(hmAccountHeartmail2.updatedAt.toJSON())
    })
  })
})
