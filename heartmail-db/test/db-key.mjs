/* global describe,it */
import DbKey from '../models/db-key.mjs'
import { KeyAddress, PubKey, KeyAlias } from 'heartmail-lib'
import should from 'should'

describe('DbKey', () => {
  it('should exist', () => {
    should.exist(DbKey)
  })

  describe('@fromRandom', () => {
    it('should make a new DbKey', () => {
      const dbKey = DbKey.fromRandom()
      should.exist(dbKey.keyAlias)
      should.exist(dbKey.privKey)
      const pubKey = PubKey.fromPrivKey(dbKey.privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      keyAlias.toString().should.equal(dbKey.keyAlias.toString())
      should.exist(dbKey.createdAt)
      should.exist(dbKey.updatedAt)
      should.not.exist(dbKey.typeStr)
      should.not.exist(dbKey.dataBuf)
    })
  })
})
