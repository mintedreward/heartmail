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
})
