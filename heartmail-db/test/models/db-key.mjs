/* global describe,it */
import DbKey from '../../models/db-key.mjs'
import { KeyAddress, PubKey, KeyAlias, PrivKey } from 'heartmail-lib'
import cassandra from 'cassandra-driver'
import should from 'should'

const Long = cassandra.types.Long

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
      ;(typeof json.keyAddress).should.equal('string')
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

  describe('#toCassandraObject', () => {
    it('should get back the same object', () => {
      const leftBuf = Long.toBuffer(Long.fromString('-5066076753700986410'))
      leftBuf.toString('hex').should.equal('b9b1ae08a2c9e1d6')
      const rightBuf = Buffer.from('00'.repeat(8), 'hex')
      const dbKey = DbKey.fromObject({
        keyAlias: KeyAlias.fromLeftRightBuf(leftBuf, rightBuf),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      const cassandraObject = dbKey.toCassandraObject()
      const dbKey2 = new DbKey().fromCassandraObject(cassandraObject)
      dbKey2.keyAlias.toString().should.equal(dbKey.keyAlias.toString())
    })
  })

  describe('#isValid', () => {
    it('should know this is a valid DbKey', () => {
      const dbKey = DbKey.fromRandom()
      dbKey.isValid().should.equal(true)
    })

    it('should know this is not a valid DbKey', () => {
      const dbKey = DbKey.fromRandom()
      dbKey.keyAddress = KeyAddress.fromRandom()
      dbKey.isValid().should.equal(false)
      dbKey.getValidationError().should.equal('keyAlias does not match keyAddress')
    })

    it('should know this is not a valid DbKey', () => {
      const dbKey = DbKey.fromRandom()
      dbKey.pubKey = PubKey.fromPrivKey(PrivKey.fromRandom())
      dbKey.isValid().should.equal(false)
      dbKey.getValidationError().should.equal('keyAddress does not match pubKey')
    })

    it('should know this is not a valid DbKey', () => {
      const dbKey = DbKey.fromRandom()
      dbKey.privKey = PrivKey.fromRandom()
      dbKey.isValid().should.equal(false)
      dbKey.getValidationError().should.equal('pubKey does not match privKey')
    })

    it('should know this is not a valid DbKey', () => {
      const dbKey = DbKey.fromRandom()
      dbKey.typeStr = 5
      dbKey.isValid().should.equal(false)
      dbKey.getValidationError().should.equal('typeStr must be a string or undefined')
    })

    it('should know this is not a valid DbKey', () => {
      const dbKey = DbKey.fromRandom()
      dbKey.dataBuf = 5
      dbKey.isValid().should.equal(false)
      dbKey.getValidationError().should.equal('dataBuf must be a Buffer or undefined')
    })

    it('should know this is not a valid DbKey', () => {
      const dbKey = DbKey.fromRandom()
      dbKey.dataBuf = Buffer.from('00'.repeat(1e6 + 1), 'hex')
      dbKey.isValid().should.equal(false)
      dbKey.getValidationError().should.equal('dataBuf must not be greater than 1 million bytes')
    })
  })

  describe('#insert', () => {
    it('should insert one and find one', async () => {
      const dbKey = DbKey.fromRandom()
      await dbKey.insert()
      const dbKey2 = await DbKey.findOne(dbKey.keyAlias.toLongId())
      dbKey2.privKey.toString().should.equal(dbKey.privKey.toString())
    })
  })

  describe('@findOne', () => {
    it('should insert one and find one', async () => {
      const dbKey = DbKey.fromRandom()
      await dbKey.insert()
      const dbKey2 = await DbKey.findOne(dbKey.keyAlias.toLongId())
      dbKey2.privKey.toString().should.equal(dbKey.privKey.toString())
    })
  })

  describe('@findOneByShortId', () => {
    it('should insert one and find one', async () => {
      const dbKey = DbKey.fromRandom()
      await dbKey.insert()
      const dbKey2 = await DbKey.findOneByShortId(dbKey.keyAlias.toShortId())
      dbKey2.privKey.toString().should.equal(dbKey.privKey.toString())
    })
  })

  describe('#updateOne', () => {
    it('should insert one, find one, update one', async () => {
      const dbKey = DbKey.fromRandom()
      await dbKey.insert()
      const dbKey2 = await DbKey.findOne(dbKey.keyAlias.toLongId())
      dbKey2.privKey.toString().should.equal(dbKey.privKey.toString())
      dbKey2.dataBuf = Buffer.from('01', 'hex')
      await dbKey2.updateOne()
      const dbKey3 = await DbKey.findOne(dbKey2.keyAlias.toLongId())
      dbKey3.dataBuf.toString('hex').should.equal(dbKey2.dataBuf.toString('hex'))
    })
  })
})
