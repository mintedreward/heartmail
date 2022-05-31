/* global describe,it */
import { HeartmailAddress } from '../src/heartmail-address.mjs'
// import { PrivKey } from '../src/priv-key.mjs'
import { KeyAlias } from '../src/key-alias.mjs'
import should from 'should'

describe('HeartmailAddress', function () {
  it('should exist', function () {
    should.exist(HeartmailAddress)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const heartmailAddress = new HeartmailAddress()
      heartmailAddress.heartmailAddress = 'name@heartmail.com'
      heartmailAddress.accountId = KeyAlias.fromRandom().toString()
      const json = heartmailAddress.toJSON()
      const heartmailAddress2 = HeartmailAddress.fromJSON(json)
      heartmailAddress.heartmailAddress.should.equal(heartmailAddress2.heartmailAddress)
      heartmailAddress.accountId.should.equal(heartmailAddress2.accountId)
      heartmailAddress.createdAt.toJSON().should.equal(heartmailAddress2.createdAt.toJSON())
      heartmailAddress.updatedAt.toJSON().should.equal(heartmailAddress2.updatedAt.toJSON())
    })
  })
})
