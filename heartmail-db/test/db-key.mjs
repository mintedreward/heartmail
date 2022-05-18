/* global describe,it */
import DbKey from '../models/db-key.mjs'
import { KeyAddress, PubKey, KeyAlias, PrivKey } from 'heartmail-lib'
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

  describe('#toJSON', () => {
    it('should convert to json', () => {
      const dbKey = DbKey.fromRandom()
      const json = dbKey.toJSON()
      should.exist(json.keyAlias)
      should.exist(json.keyAddress)
      should.exist(json.pubKey)
      should.exist(json.privKey)
      should.not.exist(json.typeStr)
      should.not.exist(json.dataBuf)
      should.exist(json.createdAt)
      should.exist(json.updatedAt)
      ;(typeof json.keyAlias).should.equal('string')
      ;(typeof json.keyAddress).should.equal('object')
      ;(typeof json.pubKey).should.equal('string')
      ;(typeof json.privKey).should.equal('string')
      ;(typeof json.createdAt).should.equal('string')
      ;(typeof json.updatedAt).should.equal('string')
    })
  })

  describe('@fromJSON', () => {
    it('should convert to/from json', () => {
      const dbKey = DbKey.fromRandom()
      const json = dbKey.toJSON()
      const dbKey2 = DbKey.fromJSON(json)
      ;(dbKey2.keyAlias instanceof KeyAlias).should.equal(true)
      ;(dbKey2.keyAddress instanceof KeyAddress).should.equal(true)
      ;(dbKey2.pubKey instanceof PubKey).should.equal(true)
      ;(dbKey2.privKey instanceof PrivKey).should.equal(true)
      ;(dbKey2.createdAt instanceof Date).should.equal(true)
      ;(dbKey2.updatedAt instanceof Date).should.equal(true)
    })
  })
})
