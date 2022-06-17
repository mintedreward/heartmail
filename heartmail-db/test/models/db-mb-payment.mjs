/* global describe,it */
import DbMbPayment from '../../models/db-mb-payment.mjs'
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
      dbMbPayment.mbPayment.fromObject({
        mbPaymentId: '12345',
        mbPaymentStr: '{}'
      })
      const obj = dbMbPayment.toCassandraObject()
      obj.created_at.toJSON().should.equal(dbMbPayment.mbPayment.createdAt.toJSON())
      obj.updated_at.toJSON().should.equal(dbMbPayment.mbPayment.updatedAt.toJSON())
      obj.mb_payment_id.should.equal('12345')
      obj.mb_payment_str.should.equal('{}')
    })
  })

  describe('@findOne', () => {
    it('should insert and find one back again', async () => {
      const dbMbPayment = DbMbPayment.fromRandom()
      dbMbPayment.mbPayment.fromObject({
        mbPaymentId: '12345',
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
