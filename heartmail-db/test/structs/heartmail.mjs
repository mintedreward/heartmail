/* global describe,it */
import { Heartmail } from '../../structs/heartmail.mjs'
import { KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('Heartmail', function () {
  it('should exist', function () {
    should.exist(Heartmail)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const heartmail = new Heartmail()
      heartmail.heartmail = 'name@heartmail.com'
      heartmail.accountId = KeyAlias.fromRandom().toString()
      const json = heartmail.toJSON()
      const heartmail2 = Heartmail.fromJSON(json)
      heartmail.heartmail.should.equal(heartmail2.heartmail)
      heartmail.accountId.should.equal(heartmail2.accountId)
      heartmail.createdAt.toJSON().should.equal(heartmail2.createdAt.toJSON())
      heartmail.updatedAt.toJSON().should.equal(heartmail2.updatedAt.toJSON())
    })
  })
})
