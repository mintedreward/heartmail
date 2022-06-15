/* global describe,it */
import { MbAccount } from '../../structs/mb-account.mjs'
import { PrivKey, KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('MbAccount', function () {
  it('should exist', function () {
    should.exist(MbAccount)
  })

  describe('#fromRandom', () => {
    it('should be valid', () => {
      const account = MbAccount.fromRandom()
      account.isValid().should.equal(true)
      ;(account.privKey instanceof PrivKey).should.equal(true)
      const keyAlias = KeyAlias.fromPrivKey(account.privKey)
      keyAlias.toString().should.equal(account.id)
    })
  })

  describe('#delayAccess', () => {
    it('should be valid', () => {
      const account = MbAccount.fromRandom()
      account.delayAccess()
      const date = new Date(account.createdAt.toJSON())
      date.setDate(date.getDate() + 30)
      account.accessGrantedAt.toJSON().should.equal(date.toJSON())
    })
  })

  describe('#toPublic', () => {
    it('should delete private key', () => {
      const account = MbAccount.fromRandom()
      account.isValid().should.equal(true)
      ;(account.privKey instanceof PrivKey).should.equal(true)
      account.toPublic()
      ;(account.privKey === null).should.equal(true)
    })
  })

  describe('#toJSON', () => {
    it('should roundtrip with fromJSON', () => {
      const account = MbAccount.fromRandom()
      const account2 = MbAccount.fromJSON(account.toJSON())
      JSON.stringify(account.toJSON()).should.equal(JSON.stringify(account2.toJSON()))
    })
  })
})
