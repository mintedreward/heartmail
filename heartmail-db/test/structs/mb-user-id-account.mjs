/* global describe,it */
import { MbAccount } from '../../structs/mb-account.mjs'
import { MbUserIdAccount } from '../../structs/mb-user-id-account.mjs'
import should from 'should'

describe('MbUserIdAccount', function () {
  it('should exist', function () {
    should.exist(MbUserIdAccount)
  })

  describe('@fromMbAccount', () => {
    it('should get from mbAccount', () => {
      const mbAccount = MbAccount.fromRandom()
      mbAccount.mbUserId = '12345'
      mbAccount.mbName = 'Name'
      const mbUserIdAccount = MbUserIdAccount.fromMbAccount(mbAccount)
      mbUserIdAccount.accountId.should.equal(mbAccount.id)
      mbUserIdAccount.accountName.should.equal(mbAccount.mbName)
      mbUserIdAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
      mbUserIdAccount.accountBio.should.equal('')
    })
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const mbAccount = MbAccount.fromRandom()
      mbAccount.mbUserId = '12345'
      mbAccount.mbName = 'Name'
      const mbUserIdAccount = MbUserIdAccount.fromMbAccount(mbAccount)
      const json = mbUserIdAccount.toJSON()
      const mbUserIdAccount2 = MbUserIdAccount.fromJSON(json)
      mbUserIdAccount.mbUserId.should.equal(mbAccount.mbUserId)
      mbUserIdAccount.createdAt.toJSON().should.equal(mbUserIdAccount2.createdAt.toJSON())
      mbUserIdAccount.updatedAt.toJSON().should.equal(mbUserIdAccount2.updatedAt.toJSON())
      mbUserIdAccount.signedInAt.toJSON().should.equal(mbUserIdAccount2.signedInAt.toJSON())
      mbUserIdAccount.accountId.should.equal(mbUserIdAccount2.accountId)
      mbUserIdAccount.accountName.should.equal(mbUserIdAccount2.accountName)
      mbUserIdAccount.accountBio.should.equal('')
      mbUserIdAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
    })
  })
})
