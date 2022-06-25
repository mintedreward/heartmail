/* global describe,it */
import HeartmailAccount from '../../structs/heartmail-account.mjs'
import { KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('HeartmailAccount', function () {
  it('should exist', function () {
    should.exist(HeartmailAccount)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const heartmail = new HeartmailAccount()
      heartmail.heartmail = 'name@heartmail.com'
      heartmail.accountId = KeyAlias.fromRandom().toString()
      const json = heartmail.toJSON()
      const heartmail2 = HeartmailAccount.fromJSON(json)
      heartmail.heartmail.should.equal(heartmail2.heartmail)
      heartmail.accountId.should.equal(heartmail2.accountId)
      heartmail.createdAt.toJSON().should.equal(heartmail2.createdAt.toJSON())
      heartmail.updatedAt.toJSON().should.equal(heartmail2.updatedAt.toJSON())
    })
  })
})
