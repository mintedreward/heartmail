/* global describe,it */
import { HmAccountAvatar } from '../src/hm-account-avatar.mjs'
import should from 'should'

describe('HmAccountAvatar', function () {
  it('should exist', function () {
    should.exist(HmAccountAvatar)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const hmAccountAvatar = new HmAccountAvatar()
      hmAccountAvatar.accountId = '12345'
      hmAccountAvatar.avatarBuf = Buffer.from('00', 'hex')
      hmAccountAvatar.size = 96
      const json = hmAccountAvatar.toJSON()
      const hmAccountAvatar2 = HmAccountAvatar.fromJSON(json)
      hmAccountAvatar2.accountId.should.equal(hmAccountAvatar.accountId)
      hmAccountAvatar2.size.should.equal(hmAccountAvatar.size)
      hmAccountAvatar2.avatarBuf.toString('hex').should.equal(hmAccountAvatar.avatarBuf.toString('hex'))
      hmAccountAvatar2.createdAt.toJSON().should.equal(hmAccountAvatar.createdAt.toJSON())
      hmAccountAvatar2.updatedAt.toJSON().should.equal(hmAccountAvatar.updatedAt.toJSON())
    })
  })
})
