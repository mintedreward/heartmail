/* global describe,it */
import MbAccount from '../../structs/mb-account.mjs'
import EmailAccount from '../../structs/auth-address-account.mjs'
import should from 'should'

describe('EmailAccount', function () {
  it('should exist', function () {
    should.exist(EmailAccount)
  })

  describe('@fromMbAccount', () => {
    it('should get from mbAccount', () => {
      const mbAccount = MbAccount.fromRandom()
      mbAccount.mbUserId = '12345'
      mbAccount.mbName = 'Name'
      const emailAccount = EmailAccount.fromMbAccount(mbAccount)
      emailAccount.accountId.should.equal(mbAccount.id)
      emailAccount.accountName.should.equal(mbAccount.mbName)
      emailAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
      emailAccount.accountBio.should.equal('')
    })
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const mbAccount = MbAccount.fromRandom()
      mbAccount.mbUserId = '12345'
      mbAccount.mbName = 'Name'
      const emailAccount = EmailAccount.fromMbAccount(mbAccount)
      const json = emailAccount.toJSON()
      const emailAccount2 = EmailAccount.fromJSON(json)
      emailAccount.email.should.equal(`${mbAccount.mbUserId}@moneybutton.com`)
      emailAccount.createdAt.toJSON().should.equal(emailAccount2.createdAt.toJSON())
      emailAccount.updatedAt.toJSON().should.equal(emailAccount2.updatedAt.toJSON())
      emailAccount.signedInAt.toJSON().should.equal(emailAccount2.signedInAt.toJSON())
      emailAccount.accountId.should.equal(emailAccount2.accountId)
      emailAccount.accountName.should.equal(emailAccount2.accountName)
      emailAccount.accountBio.should.equal('')
      emailAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
    })
  })
})
