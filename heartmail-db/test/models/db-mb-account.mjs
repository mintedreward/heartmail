/* global describe,it */
import DbMbAccount from '../../models/db-mb-account.mjs'
// import { KeyAddress, PubKey, KeyAlias, PrivKey } from 'heartmail-lib'
// import cassandra from 'cassandra-driver'
import should from 'should'

// const Long = cassandra.types.Long

describe('DbMbAccount', () => {
  it('should exist', () => {
    should.exist(DbMbAccount)
  })

  describe('@fromRandom', () => {
    it('should make a new DbMbAccount', () => {
      const dbMbAccount = DbMbAccount.fromRandom()
      should.exist(dbMbAccount.mbAccount.id)
      should.exist(dbMbAccount.mbAccount.privKey)
    })
  })
})
