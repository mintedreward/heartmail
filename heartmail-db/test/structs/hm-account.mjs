/* global describe,it */
import { HmAccount } from '../../structs/hm-account.mjs'
import { PrivKey, KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('HmAccount', function () {
  it('should exist', function () {
    should.exist(HmAccount)
  })

  describe('#fromRandom', () => {
    it('should be valid', () => {
      const hmAccount = HmAccount.fromRandom()
      hmAccount.isValid().should.equal(true)
      ;(hmAccount.privKey instanceof PrivKey).should.equal(true)
      const keyAlias = KeyAlias.fromPrivKey(hmAccount.privKey)
      keyAlias.toString().should.equal(hmAccount.id)
    })
  })

  describe('#delayAccess', () => {
    it('should be valid', () => {
      const hmAccount = HmAccount.fromRandom()
      hmAccount.delayAccess()
      hmAccount.accessGrantedAt.toJSON().should.equal('2022-07-01T10:00:00.000Z')
    })
  })

  describe('#toPublic', () => {
    it('should delete private key', () => {
      const hmAccount = HmAccount.fromRandom()
      hmAccount.isValid().should.equal(true)
      ;(hmAccount.privKey instanceof PrivKey).should.equal(true)
      hmAccount.toPublic()
      ;(hmAccount.privKey === null).should.equal(true)
    })
  })

  describe('#toJSON', () => {
    it('should roundtrip with fromJSON', () => {
      const hmAccount = HmAccount.fromRandom()
      const hmAccount2 = HmAccount.fromJSON(hmAccount.toJSON())
      JSON.stringify(hmAccount.toJSON()).should.equal(JSON.stringify(hmAccount2.toJSON()))
    })
  })

  describe('#isValid', () => {
    it('should know these are valid or not', () => {
      const hmAccount = HmAccount.fromRandom()
      hmAccount.isValid().should.equal(true)
      hmAccount.name = 'a'.repeat(41)
      hmAccount.isValid().should.equal(false)
      hmAccount.name = 'a'.repeat(40)
      hmAccount.isValid().should.equal(true)
      hmAccount.bio = 'a'.repeat(41)
      hmAccount.isValid().should.equal(false)
      hmAccount.bio = 'a'.repeat(40)
      hmAccount.isValid().should.equal(true)
      hmAccount.contactFeeAmountUsd = -1.00
      hmAccount.isValid().should.equal(false)
      hmAccount.contactFeeAmountUsd = 1.00
      hmAccount.isValid().should.equal(true)
    })
  })
})
