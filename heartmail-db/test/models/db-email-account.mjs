/* global describe,it */
import DbEmailAccount from '../../models/db-email-account.mjs'
import MbAccount from '../../structs/mb-account.mjs'
import should from 'should'

describe('DbEmailAccount', () => {
  it('should exist', () => {
    should.exist(DbEmailAccount)
  })

  describe('@fromRandom', () => {
    it('should make a new DbEmailAccount', () => {
      const dbEmailAccount = DbEmailAccount.fromRandom()
      should.exist(dbEmailAccount.emailAccount.createdAt)
      should.exist(dbEmailAccount.emailAccount.updatedAt)
      should.exist(dbEmailAccount.emailAccount.signedInAt)
    })
  })

  describe('@fromMbAccount', () => {
    it('should make a DbEmailAccount from an MbAccount', () => {
      const mbAccount = MbAccount.fromRandom().fromObject({
        accessGrantedAt: new Date(),
        affiliateId: '12345',
        contactFeeUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com',
        mbPaymentId: '1',
        mbTxid: '00'.repeat(32),
        mbIdentityKey: 'key',
        mbUserId: '6',
        mbName: 'name',
        mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
      })

      const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
      const emailAccount = dbEmailAccount.emailAccount
      emailAccount.createdAt.toJSON().should.equal(mbAccount.createdAt.toJSON())
      emailAccount.updatedAt.toJSON().should.equal(mbAccount.updatedAt.toJSON())
      emailAccount.email.should.equal(`${mbAccount.mbUserId}@moneybutton.com`)
      emailAccount.accountId.should.equal(mbAccount.id)
      emailAccount.accountName.should.equal(mbAccount.mbName)
      emailAccount.accountBio.should.equal('')
      emailAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
    })
  })

  describe('#toCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const dbEmailAccount = DbEmailAccount.fromRandom()
      dbEmailAccount.emailAccount.fromObject({
        email: '12345@moneybutton.com',
        accountId: '12345',
        accountName: 'Name',
        accountHeartmail: '12345@heartmail.com',
        accountBio: ''
      })
      const obj = dbEmailAccount.toCassandraObject()
      obj.created_at.toJSON().should.equal(dbEmailAccount.emailAccount.createdAt.toJSON())
      obj.updated_at.toJSON().should.equal(dbEmailAccount.emailAccount.updatedAt.toJSON())
      obj.signed_in_at.toJSON().should.equal(dbEmailAccount.emailAccount.signedInAt.toJSON())
      obj.email.should.equal(dbEmailAccount.emailAccount.email)
      obj.account_id.should.equal(dbEmailAccount.emailAccount.accountId)
      obj.account_name.should.equal(dbEmailAccount.emailAccount.accountName)
      obj.account_heartmail.should.equal(dbEmailAccount.emailAccount.accountHeartmail)
      obj.account_bio.should.equal(dbEmailAccount.emailAccount.accountBio)
    })
  })

  describe('#findEmailAccounts', () => {
    it('should get and sort email accounts', async () => {
      const email = 'abcdefg1234567@moneybutton.com'
      {
        const dbEmailAccount = DbEmailAccount.fromRandom()
        dbEmailAccount.emailAccount.fromObject({
          email,
          accountId: '123456',
          accountName: 'Name',
          accountHeartmail: '123456@heartmail.com',
          accountBio: '',
          signedInAt: new Date()
        })
        await dbEmailAccount.insert()
      }
      {
        const dbEmailAccount = DbEmailAccount.fromRandom()
        dbEmailAccount.emailAccount.fromObject({
          email,
          accountId: '123450',
          accountName: 'Name',
          accountHeartmail: '123450@heartmail.com',
          accountBio: '',
          signedInAt: new Date().setDate(new Date().getDate() + 1)
        })
        await dbEmailAccount.insert()
      }
      const dbEmailAccounts = await DbEmailAccount.findEmailAccounts(email)
      dbEmailAccounts.length.should.equal(2)
      dbEmailAccounts[0].emailAccount.signedInAt.getTime().should.be.greaterThan(dbEmailAccounts[1].emailAccount.signedInAt.getTime())
    })
  })

  describe('@findOne', () => {
    it('should insert and find one back again', async () => {
      const dbEmailAccount = DbEmailAccount.fromRandom()
      dbEmailAccount.emailAccount.fromObject({
        email: '12345@moneybutton.com',
        accountId: '12345',
        accountName: 'Name',
        accountHeartmail: '12345@heartmail.com',
        accountBio: ''
      })
      await dbEmailAccount.insert()
      const dbEmailAccount2 = await DbEmailAccount.findOne(dbEmailAccount.emailAccount.email)
      const emailAccount2 = dbEmailAccount2.emailAccount
      const emailAccount = dbEmailAccount.emailAccount
      emailAccount2.email.should.equal(emailAccount.email)
      emailAccount2.createdAt.toJSON().should.equal(emailAccount.createdAt.toJSON())
      emailAccount2.updatedAt.toJSON().should.equal(emailAccount.updatedAt.toJSON())
      emailAccount2.signedInAt.toJSON().should.equal(emailAccount.signedInAt.toJSON())
      emailAccount2.accountId.should.equal(emailAccount.accountId)
      emailAccount2.accountName.should.equal(emailAccount.accountName)
      emailAccount2.accountHeartmail.should.equal(emailAccount.accountHeartmail)
      emailAccount2.accountBio.should.equal(emailAccount.accountBio)
    })
  })
})
