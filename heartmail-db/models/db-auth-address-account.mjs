import { getClient } from '../connect.mjs'
import { Struct } from 'heartmail-lib'
import { AuthAddressAccount } from '../structs/auth-address-account.mjs'
import cassandra from 'cassandra-driver'

const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
const client = getClient()

export default class DbAuthAddressAccount extends Struct {
  constructor (authAddressAccount) {
    super({ authAddressAccount })
  }

  fromRandom () {
    this.authAddressAccount = AuthAddressAccount.fromRandom()
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  fromMbAccount (mbAccount) {
    this.authAddressAccount = AuthAddressAccount.fromMbAccount(mbAccount)
    return this
  }

  static fromMbAccount (mbAccount) {
    return new this().fromMbAccount(mbAccount)
  }

  fromCassandraObject (obj) {
    this.authAddressAccount = AuthAddressAccount.fromObject({
      authAddress: obj.auth_address,

      createdAt: obj.created_at,
      updatedAt: obj.updated_at,
      signedInAt: obj.signed_in_at,

      accountId: obj.account_id,
      accountName: obj.account_name,
      accountHeartmail: obj.account_heartmail,
      accountBio: obj.account_bio
    })
    return this
  }

  toCassandraObject () {
    return {
      auth_address: this.authAddressAccount.authAddress,

      created_at: this.authAddressAccount.createdAt,
      updated_at: this.authAddressAccount.updatedAt,
      signed_in_at: this.authAddressAccount.signedInAt,

      account_id: this.authAddressAccount.accountId,
      account_name: this.authAddressAccount.accountName,
      account_heartmail: this.authAddressAccount.accountHeartmail,
      account_bio: this.authAddressAccount.accountBio
    }
  }

  static async findAll () {
    const query = `select * from ${keyspace}.auth_address_accounts`
    const values = []

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const dbAuthAddressAccounts = []

    for (const row of res) {
      const dbAuthAddressAccount = new this().fromCassandraObject(row)
      dbAuthAddressAccounts.push(dbAuthAddressAccount)
    }

    return dbAuthAddressAccounts
  }

  async findOne () {
    const query = `select * from ${keyspace}.auth_address_accounts where auth_address = ?`
    const values = [this.authAddressAccount.authAddress]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const row = res.first()

    if (row) {
      this.fromCassandraObject(row)
    } else {
      this.account = null
    }

    return this
  }

  static async findOne (authAddress) {
    return new this(new AuthAddressAccount(authAddress)).findOne()
  }

  async insert () {
    const obj = this.toCassandraObject()

    const query = `insert into ${keyspace}.auth_address_accounts (auth_address, created_at, updated_at, signed_in_at, account_id, account_name, account_heartmail, account_bio) values (?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [obj.auth_address, obj.created_at, obj.updated_at, obj.signed_in_at, obj.account_id, obj.account_name, obj.account_heartmail, obj.account_bio]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }
}
