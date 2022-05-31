/* global describe,it */
import { HmHeartmailAddress } from '../src/hm-heartmail-address.mjs'
import { KeyAlias } from '../src/key-alias.mjs'
import should from 'should'

describe('HmHeartmailAddress', function () {
  it('should exist', function () {
    should.exist(HmHeartmailAddress)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const heartmailAddress = new HmHeartmailAddress()
      heartmailAddress.heartmailAddress = 'name@heartmail.com'
      heartmailAddress.accountId = KeyAlias.fromRandom().toString()
      const json = heartmailAddress.toJSON()
      const heartmailAddress2 = HmHeartmailAddress.fromJSON(json)
      heartmailAddress.heartmailAddress.should.equal(heartmailAddress2.heartmailAddress)
      heartmailAddress.accountId.should.equal(heartmailAddress2.accountId)
      heartmailAddress.createdAt.toJSON().should.equal(heartmailAddress2.createdAt.toJSON())
      heartmailAddress.updatedAt.toJSON().should.equal(heartmailAddress2.updatedAt.toJSON())
    })
  })
})
