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
      const modelKey = DbKey.fromRandom()
      should.exist(modelKey.keyAlias)
      should.exist(modelKey.privKey)
      const pubKey = PubKey.fromPrivKey(modelKey.privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      keyAlias.toString().should.equal(modelKey.keyAlias.toString())
      should.exist(modelKey.createdAt)
      should.exist(modelKey.updatedAt)
    })
  })
})
