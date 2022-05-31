/* global describe,it */
import { AccountHeartmailAddress } from '../src/account-heartmail-address.mjs'
// import { PrivKey } from '../src/priv-key.mjs'
import { KeyAlias } from '../src/key-alias.mjs'
import should from 'should'

describe('AccountHeartmailAddress', function () {
  it('should exist', function () {
    should.exist(AccountHeartmailAddress)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const heartmailAddress = new AccountHeartmailAddress()
      heartmailAddress.heartmailAddress = 'name@heartmail.com'
      heartmailAddress.accountId = KeyAlias.fromRandom().toString()
      const json = heartmailAddress.toJSON()
      const heartmailAddress2 = AccountHeartmailAddress.fromJSON(json)
      heartmailAddress.heartmailAddress.should.equal(heartmailAddress2.heartmailAddress)
      heartmailAddress.accountId.should.equal(heartmailAddress2.accountId)
      heartmailAddress.createdAt.toJSON().should.equal(heartmailAddress2.createdAt.toJSON())
      heartmailAddress.updatedAt.toJSON().should.equal(heartmailAddress2.updatedAt.toJSON())
    })
  })
})
