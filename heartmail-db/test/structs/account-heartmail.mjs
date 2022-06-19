/* global describe,it */
import AccountHeartMail from '../../structs/account-heartmail.mjs'
import { KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('AccountHeartMail', function () {
  it('should exist', function () {
    should.exist(AccountHeartMail)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const accountHeartMail = new AccountHeartMail()
      accountHeartMail.heartmail = 'name@heartmail.com'
      accountHeartMail.accountId = KeyAlias.fromRandom().toString()
      const json = accountHeartMail.toJSON()
      const accountHeartMail2 = AccountHeartMail.fromJSON(json)
      accountHeartMail.heartmail.should.equal(accountHeartMail2.heartmail)
      accountHeartMail.accountId.should.equal(accountHeartMail2.accountId)
      accountHeartMail.createdAt.toJSON().should.equal(accountHeartMail2.createdAt.toJSON())
      accountHeartMail.updatedAt.toJSON().should.equal(accountHeartMail2.updatedAt.toJSON())
    })
  })
})
