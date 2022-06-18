/* global describe,it */
import { MbAccount } from '../../structs/mb-account.mjs'
import { AddressAccount } from '../../structs/address-account.mjs'
import should from 'should'

describe('AddressAccount', function () {
  it('should exist', function () {
    should.exist(AddressAccount)
  })

  describe('@fromMbAccount', () => {
    it('should get from mbAccount', () => {
      const mbAccount = MbAccount.fromRandom()
      mbAccount.mbUserId = '12345'
      mbAccount.mbName = 'Name'
      const addressAccount = AddressAccount.fromMbAccount(mbAccount)
      addressAccount.accountId.should.equal(mbAccount.id)
      addressAccount.accountName.should.equal(mbAccount.mbName)
      addressAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
      addressAccount.accountBio.should.equal('')
    })
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const mbAccount = MbAccount.fromRandom()
      mbAccount.mbUserId = '12345'
      mbAccount.mbName = 'Name'
      const addressAccount = AddressAccount.fromMbAccount(mbAccount)
      const json = addressAccount.toJSON()
      const addressAccount2 = AddressAccount.fromJSON(json)
      addressAccount.address.should.equal(`${mbAccount.mbUserId}@moneybutton.com`)
      addressAccount.createdAt.toJSON().should.equal(addressAccount2.createdAt.toJSON())
      addressAccount.updatedAt.toJSON().should.equal(addressAccount2.updatedAt.toJSON())
      addressAccount.signedInAt.toJSON().should.equal(addressAccount2.signedInAt.toJSON())
      addressAccount.accountId.should.equal(addressAccount2.accountId)
      addressAccount.accountName.should.equal(addressAccount2.accountName)
      addressAccount.accountBio.should.equal('')
      addressAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
    })
  })
})
