/* global describe,it */
import DbAccount from '../../models/db-account.mjs'
import should from 'should'

describe('DbAccount', () => {
  it('should exist', () => {
    should.exist(DbAccount)
  })

  describe('@fromRandom', () => {
    it('should make a new DbAccount', () => {
      const dbMbAccount = DbAccount.fromRandom()
      should.exist(dbMbAccount.account.id)
      should.exist(dbMbAccount.account.privKey)
    })
  })

  describe('#toCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const date = new Date()
      const dbAccount = DbAccount.fromRandom()
      dbAccount.account.fromObject({
        name: 'Name',
        heartmail: '12345@heartmail.com',
        bio: 'I love HeartMail',
        contactFeeUsd: 1.00,
        affiliateId: '1234',
        email: 'name@example.com',
        paymail: 'name@example.com',
        accessGrantedAt: date
      })
      const obj = dbAccount.toCassandraObject()
      obj.name.should.equal('Name')
      obj.heartmail.should.equal('12345@heartmail.com')
      obj.bio.should.equal('I love HeartMail')
      obj.affiliate_id.should.equal(dbAccount.account.affiliateId)
      obj.contact_fee_usd.should.equal(1.00)
      obj.email.should.equal('name@example.com')
      obj.paymail.should.equal('name@example.com')
      obj.access_granted_at.toJSON().should.equal(date.toJSON())
    })

    it('should convert to a cassandra object with some null values', () => {
      const dbAccount = DbAccount.fromRandom()
      const obj = dbAccount.toCassandraObject()
      ;(obj.name === 'Anonymous').should.equal(true)
      ;(obj.heartmail === null).should.equal(true)
      ;(obj.bio === 'I love HeartMail').should.equal(true)
      ;(obj.contact_fee_usd === 1.00).should.equal(true)
      ;(obj.affiliate_id === null).should.equal(true)
      ;(obj.email === null).should.equal(true)
      ;(obj.paymail === null).should.equal(true)
      ;(obj.access_granted_at.toJSON() === obj.created_at.toJSON()).should.equal(true)
    })
  })

  describe('@findOne', () => {
    it('should insert and find one back again', async () => {
      const date = new Date()
      const dbAccount = DbAccount.fromRandom()
      dbAccount.account.fromObject({
        name: 'Name',
        heartmail: '12345@heartmail.com',
        bio: 'I love HeartMail',
        contactFeeUsd: 1.00,
        affiliateId: '1234',
        email: 'name@example.com',
        paymail: 'name@example.com',
        accessGrantedAt: date
      })
      await dbAccount.insert()
      const dbAccount2 = await DbAccount.findOne(dbAccount.account.id)
      const account2 = dbAccount2.account
      const account = dbAccount.account
      account2.id.should.equal(account.id)
      account2.privKey.toString().should.equal(account.privKey.toString())
      account2.name.should.equal(account.name)
      account2.bio.should.equal(account.bio)
      account2.contactFeeUsd.should.equal(account.contactFeeUsd)
      account2.affiliateId.should.equal(account.affiliateId)
      account2.email.should.equal(account.email)
      account2.paymail.should.equal(account.paymail)
      account2.accessGrantedAt.toJSON().should.equal(account.accessGrantedAt.toJSON())
    })
  })
})
