/* global describe,it */
import { MbAccount } from '../../structs/mb-account.mjs'
import { AuthAddressAccount } from '../../structs/auth-address-account.mjs'
import should from 'should'

describe('AuthAddressAccount', function () {
  it('should exist', function () {
    should.exist(AuthAddressAccount)
  })

  describe('@fromMbAccount', () => {
    it('should get from mbAccount', () => {
      const mbAccount = MbAccount.fromRandom()
      mbAccount.mbUserId = '12345'
      mbAccount.mbName = 'Name'
      const authAddressAccount = AuthAddressAccount.fromMbAccount(mbAccount)
      authAddressAccount.accountId.should.equal(mbAccount.id)
      authAddressAccount.accountName.should.equal(mbAccount.mbName)
      authAddressAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
      authAddressAccount.accountBio.should.equal('')
    })
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const mbAccount = MbAccount.fromRandom()
      mbAccount.mbUserId = '12345'
      mbAccount.mbName = 'Name'
      const authAddressAccount = AuthAddressAccount.fromMbAccount(mbAccount)
      const json = authAddressAccount.toJSON()
      const authAddressAccount2 = AuthAddressAccount.fromJSON(json)
      authAddressAccount.authAddress.should.equal(`${mbAccount.mbUserId}@moneybutton.com`)
      authAddressAccount.createdAt.toJSON().should.equal(authAddressAccount2.createdAt.toJSON())
      authAddressAccount.updatedAt.toJSON().should.equal(authAddressAccount2.updatedAt.toJSON())
      authAddressAccount.signedInAt.toJSON().should.equal(authAddressAccount2.signedInAt.toJSON())
      authAddressAccount.accountId.should.equal(authAddressAccount2.accountId)
      authAddressAccount.accountName.should.equal(authAddressAccount2.accountName)
      authAddressAccount.accountBio.should.equal('')
      authAddressAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
    })
  })
})
