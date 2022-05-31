/* global describe,it */
import { Account } from '../../structs/account.mjs'
import { PrivKey, KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('Account', function () {
  it('should exist', function () {
    should.exist(Account)
  })

  describe('#fromRandom', () => {
    it('should be valid', () => {
      const account = Account.fromRandom()
      account.isValid().should.equal(true)
      ;(account.privKey instanceof PrivKey).should.equal(true)
      const keyAlias = KeyAlias.fromPrivKey(account.privKey)
      keyAlias.toString().should.equal(account.id)
    })
  })

  describe('#delayAccess', () => {
    it('should be valid', () => {
      const account = Account.fromRandom()
      account.delayAccess()
      account.accessGrantedAt.toJSON().should.equal('2022-07-01T10:00:00.000Z')
    })
  })

  describe('#toPublic', () => {
    it('should delete private key', () => {
      const account = Account.fromRandom()
      account.isValid().should.equal(true)
      ;(account.privKey instanceof PrivKey).should.equal(true)
      account.toPublic()
      ;(account.privKey === null).should.equal(true)
    })
  })

  describe('#toJSON', () => {
    it('should roundtrip with fromJSON', () => {
      const account = Account.fromRandom()
      const account2 = Account.fromJSON(account.toJSON())
      JSON.stringify(account.toJSON()).should.equal(JSON.stringify(account2.toJSON()))
    })
  })

  describe('#isValid', () => {
    it('should know these are valid or not', () => {
      const account = Account.fromRandom()
      account.isValid().should.equal(true)
      account.name = 'a'.repeat(41)
      account.isValid().should.equal(false)
      account.name = 'a'.repeat(40)
      account.isValid().should.equal(true)
      account.bio = 'a'.repeat(41)
      account.isValid().should.equal(false)
      account.bio = 'a'.repeat(40)
      account.isValid().should.equal(true)
      account.contactFeeAmountUsd = -1.00
      account.isValid().should.equal(false)
      account.contactFeeAmountUsd = 1.00
      account.isValid().should.equal(true)
    })
  })
})
