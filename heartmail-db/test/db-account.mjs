/* global describe,it */
import DbAccount from '../models/db-account.mjs'
import { KeyAddress, PubKey, KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('DbAccount', () => {
  it('should exist', () => {
    should.exist(DbAccount)
  })

  describe('@fromRandom', () => {
    it('should make a new DbAccount', () => {
      const dbAccount = DbAccount.fromRandom()
      should.exist(dbAccount.keyAlias)
      should.exist(dbAccount.privKey)
      const pubKey = PubKey.fromPrivKey(dbAccount.privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      keyAlias.toString().should.equal(dbAccount.keyAlias.toString())
      should.exist(dbAccount.createdAt)
      should.exist(dbAccount.updatedAt)
      dbAccount.typeStr.should.equal('account')
      should.not.exist(dbAccount.dataBuf)
    })
  })

  describe('#toJSON', () => {
    it('should convert this valid account to json', () => {
      const date = new Date()
      const dbAccount = DbAccount.fromRandom()
      dbAccount.fromObject({
        accessGrantedAt: date,
        ownerEmailAddress: 'name@example.com',
        paymentEmailAddress: 'name@example.com',
        affiliateKeyAlias: KeyAlias.fromRandom(),
        contactFeeAmountUsd: 1.00
      })
      const json = dbAccount.toJSON()
      json.accessGrantedAt.should.equal(date.toJSON())
      json.ownerEmailAddress.should.equal('name@example.com')
      json.paymentEmailAddress.should.equal('name@example.com')
      json.affiliateKeyAlias.should.equal(dbAccount.affiliateKeyAlias.toJSON())
      json.contactFeeAmountUsd.should.equal(1.00)
    })
  })
})
