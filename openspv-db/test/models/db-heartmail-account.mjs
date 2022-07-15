/* global describe,it */
import DbHeartmailAccount from '../../lib/models/db-heartmail-account.mjs'
import HeartmailAccount from '../../lib/structs/heartmail-account.mjs'
import Account from '../../lib/structs/account.mjs'
import should from 'should'

describe('DbHeartmailAccount', () => {
  it('should exist', () => {
    should.exist(DbHeartmailAccount)
  })

  describe('@fromAccount', () => {
    it('should make a DbHeartmailAccount from an Account', () => {
      const account = Account.fromRandom()
      account.heartmail = `${account.id}@${process.env.NEXT_PUBLIC_DOMAIN}`
      const dbHeartmailAccount = DbHeartmailAccount.fromAccount(account)

      const heartmailAccount = dbHeartmailAccount.heartmailAccount
      heartmailAccount.createdAt.toJSON().should.equal(account.createdAt.toJSON())
      heartmailAccount.updatedAt.toJSON().should.equal(account.updatedAt.toJSON())
      heartmailAccount.heartmail.should.equal(`${account.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
      heartmailAccount.accountId.should.equal(account.id)
    })
  })

  describe('#toCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const heartmailAccount = new HeartmailAccount()
      heartmailAccount.fromObject({
        heartmail: '12345@heartmail.com',
        accountId: '12345'
      })
      const dbHeartmailAccount = new DbHeartmailAccount(heartmailAccount)

      const obj = dbHeartmailAccount.toCassandraObject()
      obj.created_at.toJSON().should.equal(heartmailAccount.createdAt.toJSON())
      obj.updated_at.toJSON().should.equal(heartmailAccount.updatedAt.toJSON())
      obj.heartmail.should.equal(heartmailAccount.heartmail)
      obj.account_id.should.equal(heartmailAccount.accountId)
    })
  })

  describe('@fromCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const heartmailAccount = new HeartmailAccount()
      heartmailAccount.fromObject({
        heartmail: '12345@heartmail.com',
        accountId: '12345'
      })
      const dbHeartmailAccount = new DbHeartmailAccount(heartmailAccount)

      const obj = dbHeartmailAccount.toCassandraObject()
      const dbHeartmailAccount2 = DbHeartmailAccount.fromCassandraObject(obj)
      const heartmailAccount2 = dbHeartmailAccount2.heartmailAccount
      heartmailAccount2.createdAt.toJSON().should.equal(heartmailAccount.createdAt.toJSON())
      heartmailAccount2.updatedAt.toJSON().should.equal(heartmailAccount.updatedAt.toJSON())
      heartmailAccount2.heartmail.should.equal(heartmailAccount.heartmail)
      heartmailAccount2.accountId.should.equal(heartmailAccount.accountId)
    })
  })

  describe('@findOne', () => {
    it('should insert and find one back again', async () => {
      const account = Account.fromRandom()
      account.heartmail = `${account.id}@${process.env.NEXT_PUBLIC_DOMAIN}`
      const dbHeartmailAccount = DbHeartmailAccount.fromAccount(account)

      await dbHeartmailAccount.insert()

      const dbHeartmailAccount2 = await DbHeartmailAccount.findOne(dbHeartmailAccount.heartmailAccount.heartmail)
      const heartmailAccount2 = dbHeartmailAccount2.heartmailAccount
      const heartmailAccount = dbHeartmailAccount.heartmailAccount
      heartmailAccount2.heartmail.should.equal(heartmailAccount.heartmail)
      heartmailAccount2.createdAt.toJSON().should.equal(heartmailAccount.createdAt.toJSON())
      heartmailAccount2.updatedAt.toJSON().should.equal(heartmailAccount.updatedAt.toJSON())
      heartmailAccount2.accountId.should.equal(heartmailAccount.accountId)
    })
  })
})
