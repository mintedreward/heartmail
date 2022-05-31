/* global describe,it */
import { Account } from '../src/account.mjs'
import { MbPaymailAccount } from '../src/mb-paymail-account.mjs'
// import { PrivKey } from '../src/priv-key.mjs'
// import { KeyAlias } from '../src/key-alias.mjs'
import should from 'should'

describe('MbPaymailAccount', function () {
  it('should exist', function () {
    should.exist(MbPaymailAccount)
  })

  describe('@fromAccount', () => {
    it('should get from account', () => {
      const account = Account.fromRandom()
      account.primaryHeartmailAddress = '12345@heartmail.com'
      const mbPaymailAccount = MbPaymailAccount.fromAccount(account)
      mbPaymailAccount.accountId.should.equal(account.id)
      mbPaymailAccount.accountName.should.equal(account.name)
      mbPaymailAccount.accountPrimaryHeartmailAddress.should.equal(account.primaryHeartmailAddress)
      mbPaymailAccount.accountBio.should.equal(account.bio)
    })
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const account = Account.fromRandom()
      account.primaryHeartmailAddress = '12345@heartmail.com'
      account.mbPaymail = '12345@moneybutton.com'
      const mbPaymailAccount = MbPaymailAccount.fromAccount(account)
      const json = mbPaymailAccount.toJSON()
      const mbPaymailAccount2 = MbPaymailAccount.fromJSON(json)
      mbPaymailAccount.mbPaymail.should.equal(account.mbPaymail)
      mbPaymailAccount.createdAt.toJSON().should.equal(mbPaymailAccount2.createdAt.toJSON())
      mbPaymailAccount.updatedAt.toJSON().should.equal(mbPaymailAccount2.updatedAt.toJSON())
      mbPaymailAccount.signedInAt.toJSON().should.equal(mbPaymailAccount2.signedInAt.toJSON())
      mbPaymailAccount.accountId.should.equal(mbPaymailAccount2.accountId)
      mbPaymailAccount.accountName.should.equal(mbPaymailAccount2.accountName)
      mbPaymailAccount.accountBio.should.equal(mbPaymailAccount2.accountBio)
      mbPaymailAccount.accountPrimaryHeartmailAddress.should.equal(mbPaymailAccount2.accountPrimaryHeartmailAddress)
    })
  })
})
