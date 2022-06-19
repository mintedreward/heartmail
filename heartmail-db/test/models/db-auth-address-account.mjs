/* global describe,it */
import DbAuthAddressAccount from '../../models/db-auth-address-account.mjs'
import { MbAccount } from '../../structs/mb-account.mjs'
import should from 'should'

describe('DbAuthAddressAccount', () => {
  it('should exist', () => {
    should.exist(DbAuthAddressAccount)
  })

  describe('@fromRandom', () => {
    it('should make a new DbAuthAddressAccount', () => {
      const dbAuthAddressAccount = DbAuthAddressAccount.fromRandom()
      should.exist(dbAuthAddressAccount.authAddressAccount.createdAt)
      should.exist(dbAuthAddressAccount.authAddressAccount.updatedAt)
      should.exist(dbAuthAddressAccount.authAddressAccount.signedInAt)
    })
  })

  describe('@fromMbAccount', () => {
    it('should make a DbAuthAddressAccount from an MbAccount', () => {
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

      const dbAuthAddressAccount = DbAuthAddressAccount.fromMbAccount(mbAccount)
      const authAddressAccount = dbAuthAddressAccount.authAddressAccount
      authAddressAccount.createdAt.toJSON().should.equal(mbAccount.createdAt.toJSON())
      authAddressAccount.updatedAt.toJSON().should.equal(mbAccount.updatedAt.toJSON())
      authAddressAccount.authAddress.should.equal(`${mbAccount.mbUserId}@moneybutton.com`)
      authAddressAccount.accountId.should.equal(mbAccount.id)
      authAddressAccount.accountName.should.equal(mbAccount.mbName)
      authAddressAccount.accountBio.should.equal('')
      authAddressAccount.accountHeartmail.should.equal(`${mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`)
    })
  })

  describe('#toCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const dbAuthAddressAccount = DbAuthAddressAccount.fromRandom()
      dbAuthAddressAccount.authAddressAccount.fromObject({
        authAddress: '12345@moneybutton.com',
        accountId: '12345',
        accountName: 'Name',
        accountHeartmail: '12345@heartmail.com',
        accountBio: ''
      })
      const obj = dbAuthAddressAccount.toCassandraObject()
      obj.created_at.toJSON().should.equal(dbAuthAddressAccount.authAddressAccount.createdAt.toJSON())
      obj.updated_at.toJSON().should.equal(dbAuthAddressAccount.authAddressAccount.updatedAt.toJSON())
      obj.signed_in_at.toJSON().should.equal(dbAuthAddressAccount.authAddressAccount.signedInAt.toJSON())
      obj.auth_address.should.equal(dbAuthAddressAccount.authAddressAccount.authAddress)
      obj.account_id.should.equal(dbAuthAddressAccount.authAddressAccount.accountId)
      obj.account_name.should.equal(dbAuthAddressAccount.authAddressAccount.accountName)
      obj.account_heartmail.should.equal(dbAuthAddressAccount.authAddressAccount.accountHeartmail)
      obj.account_bio.should.equal(dbAuthAddressAccount.authAddressAccount.accountBio)
    })
  })

  describe('@findOne', () => {
    it('should insert and find one back again', async () => {
      const dbAuthAddressAccount = DbAuthAddressAccount.fromRandom()
      dbAuthAddressAccount.authAddressAccount.fromObject({
        authAddress: '12345@moneybutton.com',
        accountId: '12345',
        accountName: 'Name',
        accountHeartmail: '12345@heartmail.com',
        accountBio: ''
      })
      await dbAuthAddressAccount.insert()
      const dbAuthAddressAccount2 = await DbAuthAddressAccount.findOne(dbAuthAddressAccount.authAddressAccount.authAddress)
      const authAddressAccount2 = dbAuthAddressAccount2.authAddressAccount
      const authAddressAccount = dbAuthAddressAccount.authAddressAccount
      authAddressAccount2.authAddress.should.equal(authAddressAccount.authAddress)
      authAddressAccount2.createdAt.toJSON().should.equal(authAddressAccount.createdAt.toJSON())
      authAddressAccount2.updatedAt.toJSON().should.equal(authAddressAccount.updatedAt.toJSON())
      authAddressAccount2.signedInAt.toJSON().should.equal(authAddressAccount.signedInAt.toJSON())
      authAddressAccount2.accountId.should.equal(authAddressAccount.accountId)
      authAddressAccount2.accountName.should.equal(authAddressAccount.accountName)
      authAddressAccount2.accountHeartmail.should.equal(authAddressAccount.accountHeartmail)
      authAddressAccount2.accountBio.should.equal(authAddressAccount.accountBio)
    })
  })
})
