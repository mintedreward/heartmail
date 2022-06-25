/* global describe,it */
import DbAccountHeartmail from '../../models/db-account-heartmail.mjs'
import AccountHeartmail from '../../structs/account-heartmail.mjs'
import Account from '../../structs/account.mjs'
import should from 'should'

describe('DbAccountHeartmail', () => {
  it('should exist', () => {
    should.exist(DbAccountHeartmail)
  })

  describe('@fromAccount', () => {
    it('should make a DbAccountHeartmail from an Account', () => {
      const account = Account.fromRandom()
      account.heartmail = `${account.id}@${process.env.NEXT_PUBLIC_DOMAIN}`
      const dbAccountHeartmail = DbAccountHeartmail.fromAccount(account)

      const accountHeartmail = dbAccountHeartmail.accountHeartmail
      accountHeartmail.createdAt.toJSON().should.equal(account.createdAt.toJSON())
      accountHeartmail.updatedAt.toJSON().should.equal(account.updatedAt.toJSON())
      accountHeartmail.heartmail.should.equal(`${account.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
      accountHeartmail.accountId.should.equal(account.id)
    })
  })

  describe('#toCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const accountHeartmail = new AccountHeartmail()
      accountHeartmail.fromObject({
        heartmail: '12345@heartmail.com',
        accountId: '12345'
      })
      const dbAccountHeartmail = new DbAccountHeartmail(accountHeartmail)

      const obj = dbAccountHeartmail.toCassandraObject()
      obj.created_at.toJSON().should.equal(accountHeartmail.createdAt.toJSON())
      obj.updated_at.toJSON().should.equal(accountHeartmail.updatedAt.toJSON())
      obj.heartmail.should.equal(accountHeartmail.heartmail)
      obj.account_id.should.equal(accountHeartmail.accountId)
    })
  })

  describe('@fromCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const accountHeartmail = new AccountHeartmail()
      accountHeartmail.fromObject({
        heartmail: '12345@heartmail.com',
        accountId: '12345'
      })
      const dbAccountHeartmail = new DbAccountHeartmail(accountHeartmail)

      const obj = dbAccountHeartmail.toCassandraObject()
      const dbAccountHeartmail2 = DbAccountHeartmail.fromCassandraObject(obj)
      const accountHeartmail2 = dbAccountHeartmail2.accountHeartmail
      accountHeartmail2.createdAt.toJSON().should.equal(accountHeartmail.createdAt.toJSON())
      accountHeartmail2.updatedAt.toJSON().should.equal(accountHeartmail.updatedAt.toJSON())
      accountHeartmail2.heartmail.should.equal(accountHeartmail.heartmail)
      accountHeartmail2.accountId.should.equal(accountHeartmail.accountId)
    })
  })

  describe('@findOne', () => {
    it('should insert and find one back again', async () => {
      const account = Account.fromRandom()
      account.heartmail = `${account.id}@${process.env.NEXT_PUBLIC_DOMAIN}`
      const dbAccountHeartmail = DbAccountHeartmail.fromAccount(account)

      await dbAccountHeartmail.insert()

      const dbAccountHeartmail2 = await DbAccountHeartmail.findOne(dbAccountHeartmail.accountHeartmail.accountId, account.heartmail)
      const accountHeartmail2 = dbAccountHeartmail2.accountHeartmail
      const accountHeartmail = dbAccountHeartmail.accountHeartmail
      accountHeartmail2.heartmail.should.equal(accountHeartmail.heartmail)
      accountHeartmail2.createdAt.toJSON().should.equal(accountHeartmail.createdAt.toJSON())
      accountHeartmail2.updatedAt.toJSON().should.equal(accountHeartmail.updatedAt.toJSON())
      accountHeartmail2.accountId.should.equal(accountHeartmail.accountId)
    })
  })
})
