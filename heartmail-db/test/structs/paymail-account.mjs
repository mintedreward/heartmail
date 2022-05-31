/* global describe,it */
import { Account } from '../../structs/account.mjs'
import { PaymailAccount } from '../../structs/paymail-account.mjs'
import should from 'should'

describe('PaymailAccount', function () {
  it('should exist', function () {
    should.exist(PaymailAccount)
  })

  describe('@fromAccount', () => {
    it('should get from account', () => {
      const account = Account.fromRandom()
      account.primaryHeartmail = '12345@heartmail.com'
      const paymailAccount = PaymailAccount.fromAccount(account)
      paymailAccount.accountId.should.equal(account.id)
      paymailAccount.accountName.should.equal(account.name)
      paymailAccount.accountPrimaryHeartmail.should.equal(account.primaryHeartmail)
      paymailAccount.accountBio.should.equal(account.bio)
    })
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const account = Account.fromRandom()
      account.primaryHeartmail = '12345@heartmail.com'
      account.mbPaymail = '12345@moneybutton.com'
      const paymailAccount = PaymailAccount.fromAccount(account)
      const json = paymailAccount.toJSON()
      const paymailAccount2 = PaymailAccount.fromJSON(json)
      paymailAccount.mbPaymail.should.equal(account.mbPaymail)
      paymailAccount.createdAt.toJSON().should.equal(paymailAccount2.createdAt.toJSON())
      paymailAccount.updatedAt.toJSON().should.equal(paymailAccount2.updatedAt.toJSON())
      paymailAccount.signedInAt.toJSON().should.equal(paymailAccount2.signedInAt.toJSON())
      paymailAccount.accountId.should.equal(paymailAccount2.accountId)
      paymailAccount.accountName.should.equal(paymailAccount2.accountName)
      paymailAccount.accountBio.should.equal(paymailAccount2.accountBio)
      paymailAccount.accountPrimaryHeartmail.should.equal(paymailAccount2.accountPrimaryHeartmail)
    })
  })
})
