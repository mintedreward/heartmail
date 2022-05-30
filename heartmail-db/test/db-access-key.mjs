/* global describe,it */
import DbAccessKey from '../models/db-access-key.mjs'
import { KeyAddress, PubKey, PrivKey, KeyAlias, Bn } from 'heartmail-lib'
import should from 'should'

describe('DbAccessKey', () => {
  it('should exist', () => {
    should.exist(DbAccessKey)
  })

  describe('@fromRandom', () => {
    it('should make a new DbAccessKey', () => {
      const dbAccessKey = DbAccessKey.fromRandom()
      should.exist(dbAccessKey.keyAlias)
      should.exist(dbAccessKey.privKey)
      const pubKey = PubKey.fromPrivKey(dbAccessKey.privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      keyAlias.toString().should.equal(dbAccessKey.keyAlias.toString())
      should.exist(dbAccessKey.createdAt)
      should.exist(dbAccessKey.updatedAt)
      dbAccessKey.typeStr.should.equal('account')
      should.not.exist(dbAccessKey.dataBuf)
    })
  })

  describe('#toJSON', () => {
    it('should convert this valid account to json', () => {
      const date = new Date()
      const dbAccessKey = DbAccessKey.fromRandom()
      dbAccessKey.fromObject({
        accessGrantedAt: date,
        affiliateKeyAlias: KeyAlias.fromRandom(),
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      const json = dbAccessKey.toJSON()
      json.accessGrantedAt.should.equal(date.toJSON())
      json.mbEmail.should.equal('name@example.com')
      json.mbPaymail.should.equal('name@example.com')
      json.affiliateKeyAlias.should.equal(dbAccessKey.affiliateKeyAlias.toJSON())
      json.contactFeeAmountUsd.should.equal(1.00)
    })
  })

  describe('#createDataBuf', () => {
    it('should make a dataBuf from these properties', () => {
      const dbAccessKey = DbAccessKey.fromRandom()
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      dbAccessKey.fromObject({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.createDataBuf()
      should.exist(dbAccessKey.dataBuf)
      dbAccessKey.dataBuf.toString().should.equal('{"accessGrantedAt":"2022-05-18T15:40:34.015Z","affiliateKeyAlias":"47x4dm45stw4w6vl4difdhztr","contactFeeAmountUsd":1,"mbEmail":"name@example.com","mbPaymail":"name@example.com"}')
    })

    it('should make a dataBuf with empty affiliate', () => {
      const dbAccessKey = DbAccessKey.fromRandom()
      dbAccessKey.fromObject({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: undefined,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.createDataBuf()
      should.exist(dbAccessKey.dataBuf)
      dbAccessKey.dataBuf.toString().should.equal('{"accessGrantedAt":"2022-05-18T15:40:34.015Z","affiliateKeyAlias":null,"contactFeeAmountUsd":1,"mbEmail":"name@example.com","mbPaymail":"name@example.com"}')
    })
  })

  describe('#parseDataBuf', () => {
    it('should make these properties from this databuf', () => {
      const dbAccessKey = DbAccessKey.fromRandom()
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      dbAccessKey.fromObject({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.createDataBuf()
      should.exist(dbAccessKey.dataBuf)
      // dbAccessKey.dataBuf.toString('hex').should.equal('7b226163636573734772616e7465644174223a22323032322d30352d31385431353a34303a33342e3031355a222c226f776e6572456d61696c41646472657373223a226e616d65406578616d706c652e636f6d222c227061796d656e74456d61696c41646472657373223a226e616d65406578616d706c652e636f6d222c22616666696c696174654b6579416c696173223a225c2234377834646d3435737477347736766c3464696664687a74725c22222c22636f6e74616374466565416d6f756e74557364223a317d')

      const dbAccessKey2 = DbAccessKey.fromRandom()
      dbAccessKey2.fromObject({ dataBuf: dbAccessKey.dataBuf })
      dbAccessKey2.parseDataBuf()
      dbAccessKey2.privKey.toString().should.not.equal(dbAccessKey.dataBuf.toString())
      dbAccessKey2.dataBuf.toString('hex').should.equal(dbAccessKey.dataBuf.toString('hex'))
      dbAccessKey2.accessGrantedAt.toJSON().should.equal(dbAccessKey.accessGrantedAt.toJSON())
      dbAccessKey2.mbEmail.should.equal(dbAccessKey.mbEmail)
      dbAccessKey2.mbPaymail.should.equal(dbAccessKey.mbPaymail)
      dbAccessKey2.affiliateKeyAlias.toJSON().should.equal(dbAccessKey.affiliateKeyAlias.toJSON())
      dbAccessKey2.contactFeeAmountUsd.should.equal(dbAccessKey.contactFeeAmountUsd)
    })
  })

  describe('@create', () => {
    it('should create and know this is a valid DbAccessKey', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      const dbAccessKey = DbAccessKey.create({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.isValid().should.equal(true)
    })
  })

  describe('#isValid', () => {
    it('should know this is a valid DbAccessKey', () => {
      const dbAccessKey = DbAccessKey.fromRandom()
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      dbAccessKey.fromObject({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.createDataBuf()
      dbAccessKey.isValid().should.equal(true)
    })

    it('should know this is not a valid DbAccessKey', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      const dbAccessKey = DbAccessKey.create({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.accessGrantedAt = 5
      dbAccessKey.isValid().should.equal(false)
      dbAccessKey.getValidationError().should.equal('accessGrantedAt must be a Date')
    })

    it('should know this is not a valid DbAccessKey', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      const dbAccessKey = DbAccessKey.create({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.mbEmail = 5
      dbAccessKey.isValid().should.equal(false)
      dbAccessKey.getValidationError().should.equal('mbEmail must be an email address or undefined')
    })

    it('should know this is not a valid DbAccessKey', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      const dbAccessKey = DbAccessKey.create({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.mbPaymail = 5
      dbAccessKey.isValid().should.equal(false)
      dbAccessKey.getValidationError().should.equal('mbPaymail must be an email address or undefined')
    })

    it('should know this is not a valid DbAccessKey', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      const dbAccessKey = DbAccessKey.create({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.affiliateKeyAlias = 5
      dbAccessKey.isValid().should.equal(false)
      dbAccessKey.getValidationError().should.equal('affiliateKeyAlias must be a KeyAlias or undefined')
    })

    it('should know this is not a valid DbAccessKey', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      const dbAccessKey = DbAccessKey.create({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.contactFeeAmountUsd = '1.00'
      dbAccessKey.isValid().should.equal(false)
      dbAccessKey.getValidationError().should.equal('contactFeeAmountUsd must be a number')
    })

    it('should know this is not a valid DbAccessKey', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const keyAddress = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(keyAddress)
      const dbAccessKey = DbAccessKey.create({
        accessGrantedAt: new Date('2022-05-18T15:40:34.015Z'),
        affiliateKeyAlias: keyAlias,
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      dbAccessKey.contactFeeAmountUsd = -1.00
      dbAccessKey.isValid().should.equal(false)
      dbAccessKey.getValidationError().should.equal('contactFeeAmountUsd must be positive')
    })
  })

  describe('#delayAccess', () => {
    it('should delay access until July 1', () => {
      const dbAccessKey = DbAccessKey.create()
      const date = new Date(dbAccessKey.accessGrantedAt.toJSON())
      dbAccessKey.delayAccess()
      dbAccessKey.accessGrantedAt.toJSON().should.not.equal(date.toJSON())
      const accessDate = new Date('2022-07-01T10:00:00.000Z')
      dbAccessKey.accessGrantedAt.toJSON().should.equal(accessDate.toJSON())
    })
  })

  describe('@findOne', () => {
    it('should find this one and parse data buf', async function () {
      this.timeout(5000)
      const dbAccessKey = DbAccessKey.create({
        accessGrantedAt: new Date(),
        affiliateKeyAlias: KeyAlias.fromRandom(),
        contactFeeAmountUsd: 1.00,
        mbEmail: 'name@example.com',
        mbPaymail: 'name@example.com'
      })
      await dbAccessKey.insert()
      const dbAccessKey2 = await DbAccessKey.findOne(dbAccessKey.keyAlias.toLongId())
      dbAccessKey2.accessGrantedAt.toJSON().should.equal(dbAccessKey.accessGrantedAt.toJSON())
      dbAccessKey2.mbEmail.should.equal(dbAccessKey.mbEmail)
      dbAccessKey2.mbPaymail.should.equal(dbAccessKey.mbPaymail)
      dbAccessKey2.affiliateKeyAlias.toString().should.equal(dbAccessKey.affiliateKeyAlias.toString())
      dbAccessKey2.contactFeeAmountUsd.should.equal(dbAccessKey.contactFeeAmountUsd)
    })
  })
})
