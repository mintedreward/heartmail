/* global describe,it */
import { AccountAvatar } from '../src/account-avatar.mjs'
// import { PrivKey } from '../src/priv-key.mjs'
// import { KeyAlias } from '../src/key-alias.mjs'
import should from 'should'

describe('AccountAvatar', function () {
  it('should exist', function () {
    should.exist(AccountAvatar)
  })

  describe('#toJSON', () => {
    it('should round trip to/from JSON', () => {
      const accountAvatar = new AccountAvatar()
      accountAvatar.accountId = '12345'
      accountAvatar.avatarBuf = Buffer.from('00', 'hex')
      accountAvatar.size = 96
      const json = accountAvatar.toJSON()
      const accountAvatar2 = AccountAvatar.fromJSON(json)
      accountAvatar2.accountId.should.equal(accountAvatar.accountId)
      accountAvatar2.size.should.equal(accountAvatar.size)
      accountAvatar2.avatarBuf.toString('hex').should.equal(accountAvatar.avatarBuf.toString('hex'))
      accountAvatar2.createdAt.toJSON().should.equal(accountAvatar.createdAt.toJSON())
      accountAvatar2.updatedAt.toJSON().should.equal(accountAvatar.updatedAt.toJSON())
    })
  })
})
