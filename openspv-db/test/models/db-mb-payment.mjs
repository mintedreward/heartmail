/* global describe,it */
import DbMbPayment from '../../lib/models/db-mb-payment.mjs'
import { Random, Bn } from 'openspv-lib'
import should from 'should'

describe('DbMbPayment', () => {
  it('should exist', () => {
    should.exist(DbMbPayment)
  })

  describe('@fromRandom', () => {
    it('should make a new DbMbPayment', () => {
      const dbMbPayment = DbMbPayment.fromRandom()
      should.exist(dbMbPayment.mbPayment.createdAt)
      should.exist(dbMbPayment.mbPayment.updatedAt)
    })
  })

  describe('#toCassandraObject', () => {
    it('should convert to a cassandra object', () => {
      const dbMbPayment = DbMbPayment.fromRandom()
      const mbPaymentId = Bn.fromBuffer(Random.getRandomBuffer(6)).toString()
      dbMbPayment.mbPayment.fromObject({
        mbPaymentId,
        mbPaymentStr: '{}'
      })
      const obj = dbMbPayment.toCassandraObject()
      obj.created_at.toJSON().should.equal(dbMbPayment.mbPayment.createdAt.toJSON())
      obj.updated_at.toJSON().should.equal(dbMbPayment.mbPayment.updatedAt.toJSON())
      obj.mb_payment_id.should.equal(mbPaymentId)
      obj.mb_payment_str.should.equal('{}')
    })
  })

  describe('@findOne', () => {
    it('should insert and find one back again', async () => {
      const dbMbPayment = DbMbPayment.fromRandom()
      const mbPaymentId = Bn.fromBuffer(Random.getRandomBuffer(6)).toString()
      dbMbPayment.mbPayment.fromObject({
        mbPaymentId,
        mbPaymentStr: '{}'
      })
      await dbMbPayment.insert()
      const dbMbPayment2 = await DbMbPayment.findOne(dbMbPayment.mbPayment.mbPaymentId)
      const mbPayment2 = dbMbPayment2.mbPayment
      const mbPayment = dbMbPayment.mbPayment
      mbPayment2.mbPaymentId.should.equal(mbPayment.mbPaymentId)
      mbPayment2.mbPaymentStr.should.equal(mbPayment.mbPaymentStr)
      mbPayment2.createdAt.toJSON().should.equal(mbPayment.createdAt.toJSON())
      mbPayment2.updatedAt.toJSON().should.equal(mbPayment.updatedAt.toJSON())
    })
  })
})
