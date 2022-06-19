/* global describe,it */
import MbPayment from '../../structs/mb-payment.mjs'
import should from 'should'

describe('MbPayment', function () {
  it('should exist', function () {
    should.exist(MbPayment)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const mbPayment = new MbPayment()
      mbPayment.mbPaymentId = '12345'
      mbPayment.mbPaymentStr = '{id:"12345"}'
      const json = mbPayment.toJSON()
      const mbPayment2 = MbPayment.fromJSON(json)
      mbPayment.mbPaymentStr.should.equal(mbPayment2.mbPaymentStr)
      mbPayment.mbPaymentId.should.equal(mbPayment2.mbPaymentId)
      mbPayment.createdAt.toJSON().should.equal(mbPayment2.createdAt.toJSON())
      mbPayment.updatedAt.toJSON().should.equal(mbPayment2.updatedAt.toJSON())
    })
  })
})
