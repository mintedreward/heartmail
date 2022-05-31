/* global describe,it */
import { HmAccount } from '../../structs/hm-account.mjs'
import { HmMbPaymailAccount } from '../../structs/hm-mb-paymail-account.mjs'
import should from 'should'

describe('HmMbPaymailAccount', function () {
  it('should exist', function () {
    should.exist(HmMbPaymailAccount)
  })

  describe('@fromHmAccount', () => {
    it('should get from account', () => {
      const account = HmAccount.fromRandom()
      account.primaryHeartmail = '12345@heartmail.com'
      const hmMbPaymailAccount = HmMbPaymailAccount.fromHmAccount(account)
      hmMbPaymailAccount.accountId.should.equal(account.id)
      hmMbPaymailAccount.accountName.should.equal(account.name)
      hmMbPaymailAccount.accountPrimaryHeartmail.should.equal(account.primaryHeartmail)
      hmMbPaymailAccount.accountBio.should.equal(account.bio)
    })
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const account = HmAccount.fromRandom()
      account.primaryHeartmail = '12345@heartmail.com'
      account.mbPaymail = '12345@moneybutton.com'
      const hmMbPaymailAccount = HmMbPaymailAccount.fromHmAccount(account)
      const json = hmMbPaymailAccount.toJSON()
      const hmMbPaymailAccount2 = HmMbPaymailAccount.fromJSON(json)
      hmMbPaymailAccount.mbPaymail.should.equal(account.mbPaymail)
      hmMbPaymailAccount.createdAt.toJSON().should.equal(hmMbPaymailAccount2.createdAt.toJSON())
      hmMbPaymailAccount.updatedAt.toJSON().should.equal(hmMbPaymailAccount2.updatedAt.toJSON())
      hmMbPaymailAccount.signedInAt.toJSON().should.equal(hmMbPaymailAccount2.signedInAt.toJSON())
      hmMbPaymailAccount.accountId.should.equal(hmMbPaymailAccount2.accountId)
      hmMbPaymailAccount.accountName.should.equal(hmMbPaymailAccount2.accountName)
      hmMbPaymailAccount.accountBio.should.equal(hmMbPaymailAccount2.accountBio)
      hmMbPaymailAccount.accountPrimaryHeartmail.should.equal(hmMbPaymailAccount2.accountPrimaryHeartmail)
    })
  })
})
