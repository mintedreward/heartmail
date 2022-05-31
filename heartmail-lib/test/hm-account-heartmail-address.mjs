/* global describe,it */
import { HmAccountHeartmailAddress } from '../src/hm-account-heartmail-address.mjs'
import { KeyAlias } from '../src/key-alias.mjs'
import should from 'should'

describe('HmAccountHeartmailAddress', function () {
  it('should exist', function () {
    should.exist(HmAccountHeartmailAddress)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const hmAccountHeartmailAddress = new HmAccountHeartmailAddress()
      hmAccountHeartmailAddress.heartmailAddress = 'name@heartmail.com'
      hmAccountHeartmailAddress.accountId = KeyAlias.fromRandom().toString()
      const json = hmAccountHeartmailAddress.toJSON()
      const hmAccountHeartmailAddress2 = HmAccountHeartmailAddress.fromJSON(json)
      hmAccountHeartmailAddress.heartmailAddress.should.equal(hmAccountHeartmailAddress2.heartmailAddress)
      hmAccountHeartmailAddress.accountId.should.equal(hmAccountHeartmailAddress2.accountId)
      hmAccountHeartmailAddress.createdAt.toJSON().should.equal(hmAccountHeartmailAddress2.createdAt.toJSON())
      hmAccountHeartmailAddress.updatedAt.toJSON().should.equal(hmAccountHeartmailAddress2.updatedAt.toJSON())
    })
  })
})
