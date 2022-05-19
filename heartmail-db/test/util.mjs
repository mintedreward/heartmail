/* global describe,it */
import { util, DbAccount } from '../index.mjs'
import should from 'should'

const getAffiliate = util.getAffiliate

describe('utilities', () => {
  it('should exist', () => {
    should.exist(getAffiliate)
  })

  describe('getAffiliate', () => {
    it('should get an affiliate that exists', async function () {
      const dbAccount = DbAccount.create().fromObject({
        externalPaymail: 'name@example.com'
      })
      await dbAccount.insert()
      const affiliateEmail = `${dbAccount.keyAlias.toShortId()}@heartmail.com`
      const affiliate = await util.getAffiliate(affiliateEmail)
      affiliate.hasAffiliate.should.equal(true)
      affiliate.affiliateLongId.should.equal(dbAccount.keyAlias.toLongId())
      affiliate.affiliatePaymail.should.equal(dbAccount.externalPaymail)
    })
  })
})
