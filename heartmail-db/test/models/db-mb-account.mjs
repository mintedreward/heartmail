/* global describe,it */
import DbMbAccount from '../../lib/models/db-mb-account.mjs'
import { KeyAlias } from 'heartmail-lib'
// import cassandra from 'cassandra-driver'
import should from 'should'

// const Long = cassandra.types.Long

describe('DbMbAccount', () => {
  it('should exist', () => {
    should.exist(DbMbAccount)
  })

  describe('@fromRandom', () => {
    it('should make a new DbMbAccount', () => {
      const dbMbAccount = DbMbAccount.fromRandom()
      should.exist(dbMbAccount.mbAccount.id)
      should.exist(dbMbAccount.mbAccount.privKey)
    })
  })

  describe('#toCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const dbMbAccount = DbMbAccount.fromRandom()
      dbMbAccount.mbAccount.fromObject({
        accessGrantedAt: new Date(),
        affiliateId: KeyAlias.fromRandom().toString(),
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
      const obj = dbMbAccount.toCassandraObject()
      obj.access_granted_at.toJSON().should.equal(dbMbAccount.mbAccount.accessGrantedAt.toJSON())
      obj.affiliate_id.should.equal(dbMbAccount.mbAccount.affiliateId)
      obj.contact_fee_usd.should.equal(1.00)
      obj.mb_email.should.equal('name@example.com')
      obj.mb_paymail.should.equal('name@example.com')
      obj.mb_payment_id.should.equal('1')
      obj.mb_identity_key.should.equal('key')
      obj.mb_user_id.should.equal('6')
      obj.mb_name.should.equal('name')
      obj.mb_avatar_url.should.equal('https://www.ryanxcharles.com/me.jpg')
    })

    it('should convert to a cassandra object with some null values', () => {
      const dbMbAccount = DbMbAccount.fromRandom()
      dbMbAccount.mbAccount.fromObject({
        accessGrantedAt: new Date(),
        affiliateId: KeyAlias.fromRandom().toString(),
        contactFeeUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com',
        mbPaymentId: '1',
        mbTxid: '00'.repeat(32)
        // mbPayment: '{}',
        // mbIdentityKey: 'key',
        // mbUserId: '6',
        // mbName: 'name',
        // mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
      })
      const obj = dbMbAccount.toCassandraObject()
      obj.access_granted_at.toJSON().should.equal(dbMbAccount.mbAccount.accessGrantedAt.toJSON())
      obj.affiliate_id.should.equal(dbMbAccount.mbAccount.affiliateId)
      obj.contact_fee_usd.should.equal(1.00)
      obj.mb_email.should.equal('name@example.com')
      obj.mb_paymail.should.equal('name@example.com')
      obj.mb_payment_id.should.equal('1')

      ;(obj.mb_payment === null).should.equal(true)
      ;(obj.mb_identity_key === null).should.equal(true)
      ;(obj.mb_user_id === null).should.equal(true)
      ;(obj.mb_name === null).should.equal(true)
      ;(obj.mb_avatar_url === null).should.equal(true)
    })
  })

  describe('@findOne', () => {
    it('should insert and find one back again', async () => {
      const dbMbAccount = DbMbAccount.fromRandom()
      dbMbAccount.mbAccount.fromObject({
        accessGrantedAt: new Date(),
        affiliateId: KeyAlias.fromRandom().toString(),
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
      await dbMbAccount.insert()
      const dbMbAccount2 = await DbMbAccount.findOne(dbMbAccount.mbAccount.id)
      const mbAccount2 = dbMbAccount2.mbAccount
      const mbAccount = dbMbAccount.mbAccount
      mbAccount2.id.should.equal(mbAccount.id)
      mbAccount2.privKey.toString().should.equal(mbAccount.privKey.toString())
      mbAccount2.accessGrantedAt.toJSON().should.equal(mbAccount.accessGrantedAt.toJSON())
      mbAccount2.affiliateId.should.equal(mbAccount.affiliateId)
      mbAccount2.contactFeeUsd.should.equal(mbAccount.contactFeeUsd)
      mbAccount2.mbEmail.should.equal(mbAccount.mbEmail)
      mbAccount2.mbPaymail.should.equal(mbAccount.mbPaymail)
      mbAccount2.mbTxid.should.equal(mbAccount.mbTxid)
      mbAccount2.mbIdentityKey.should.equal(mbAccount.mbIdentityKey)
      mbAccount2.mbUserId.should.equal(mbAccount.mbUserId)
      mbAccount2.mbName.should.equal(mbAccount.mbName)
      mbAccount2.mbAvatarUrl.should.equal(mbAccount.mbAvatarUrl)
    })
  })
})
