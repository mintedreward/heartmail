/* global describe,it */
import { util, DbAccessKey } from '../index.mjs'
import should from 'should'

const getAffiliate = util.getAffiliate

describe('utilities', () => {
  it('should exist', () => {
    should.exist(getAffiliate)
  })

  describe('getAffiliate', () => {
    it('should get an affiliate that exists', async function () {
      const dbAccessKey = DbAccessKey.create().fromObject({
        mbPaymail: 'name@example.com'
      })
      await dbAccessKey.insert()
      const affiliateEmail = `${dbAccessKey.keyAlias.toShortId()}@heartmail.com`
      const affiliate = await util.getAffiliate(affiliateEmail)
      affiliate.hasAffiliate.should.equal(true)
      affiliate.longId.should.equal(dbAccessKey.keyAlias.toLongId())
      affiliate.mbPaymail.should.equal(dbAccessKey.mbPaymail)
    })
  })
})
