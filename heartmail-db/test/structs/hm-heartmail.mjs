/* global describe,it */
import { HmHeartmail } from '../../structs/hm-heartmail.mjs'
import { KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('HmHeartmail', function () {
  it('should exist', function () {
    should.exist(HmHeartmail)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const heartmail = new HmHeartmail()
      heartmail.heartmail = 'name@heartmail.com'
      heartmail.accountId = KeyAlias.fromRandom().toString()
      const json = heartmail.toJSON()
      const heartmail2 = HmHeartmail.fromJSON(json)
      heartmail.heartmail.should.equal(heartmail2.heartmail)
      heartmail.accountId.should.equal(heartmail2.accountId)
      heartmail.createdAt.toJSON().should.equal(heartmail2.createdAt.toJSON())
      heartmail.updatedAt.toJSON().should.equal(heartmail2.updatedAt.toJSON())
    })
  })
})
