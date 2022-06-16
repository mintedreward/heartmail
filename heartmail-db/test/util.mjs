/* global describe,it */
import { util, DbMbAccount } from '../index.mjs'
import should from 'should'

const getAffiliate = util.getAffiliate

describe('utilities', () => {
  it('should exist', () => {
    should.exist(getAffiliate)
  })

  describe('createMbAccountWithPayment', () => {
    it('should create a new account and then an affiliate account', async () => {
      let affiliateId
      {
        const contactFeeUsd = 5.00
        const affiliate = null
        const payment = {
          id: '1',
          user: {
            email: 'name@example.com'
          },
          senderPaymail: 'name@example.com',
          txid: '00'.repeat(32),
          userId: '1'
        }
        const mbAccountId = await util.createMbAccountWithPayment(contactFeeUsd, affiliate, payment)
        mbAccountId.length.should.greaterThan(10)
        affiliateId = mbAccountId
      }

      {
        const affiliate = {
          id: affiliateId
        }
        const contactFeeUsd = 10.00
        const payment = {
          id: '2',
          user: {
            email: 'name2@example.com'
          },
          senderPaymail: 'name2@example.com',
          txid: '01'.repeat(32),
          userId: '2'
        }
        const mbAccountId = await util.createMbAccountWithPayment(contactFeeUsd, affiliate, payment)
        mbAccountId.length.should.greaterThan(10)
        mbAccountId.should.not.equal(affiliateId)
        const mbAccount = await util.getMbAccount(mbAccountId)
        mbAccount.id.should.equal(mbAccountId)
        mbAccount.mbEmail.should.equal('name2@example.com')
        mbAccount.mbPaymail.should.equal('name2@example.com')
        mbAccount.mbTxid.should.equal('01'.repeat(32))
        mbAccount.mbUserId.should.equal('2')
        mbAccount.mbPaymentId.should.equal('2')
        mbAccount.mbPayment.should.equal(JSON.stringify(payment))
      }
    })
  })

  describe('getAffiliate', () => {
    it('should get an affiliate that exists', async function () {
      const dbMbAccount = DbMbAccount.create()
      dbMbAccount.mbAccount.fromObject({
        mbPaymail: 'name@example.com'
      })
      await dbMbAccount.insert()
      const affiliateHeartmail = `${dbMbAccount.mbAccount.id}@heartmail.com`
      const affiliate = await util.getAffiliate(affiliateHeartmail)
      affiliate.hasAffiliate.should.equal(true)
      affiliate.id.should.equal(dbMbAccount.mbAccount.id)
      affiliate.mbPaymail.should.equal(dbMbAccount.mbAccount.mbPaymail)
    })
  })
})
