import { getClient } from '../../connect.mjs'
import { Struct } from 'openspv-lib'
import AccountHeartmail from '../structs/account-heartmail.mjs'
import cassandra from 'cassandra-driver'

const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
const client = getClient()

export default class DbAccountHeartmail extends Struct {
  constructor (accountHeartmail) {
    super({ accountHeartmail })
  }

  fromAccount (account) {
    this.accountHeartmail = AccountHeartmail.fromAccount(account)
    return this
  }

  static fromAccount (account) {
    return new this().fromAccount(account)
  }

  fromCassandraObject (obj) {
    this.accountHeartmail = AccountHeartmail.fromObject({
      heartmail: obj.heartmail,
      accountId: obj.account_id,

      createdAt: obj.created_at,
      updatedAt: obj.updated_at
    })
    return this
  }

  static fromCassandraObject (obj) {
    return new this().fromCassandraObject(obj)
  }

  toCassandraObject () {
    return {
      heartmail: this.accountHeartmail.heartmail,
      account_id: this.accountHeartmail.accountId,
      created_at: this.accountHeartmail.createdAt,
      updated_at: this.accountHeartmail.updatedAt
    }
  }

  static async findMany (accountId) {
    const query = `select * from ${keyspace}.account_heartmails where account_id = ?`
    const values = [accountId]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const dbAccounts = []

    for (const row of res) {
      const dbAccount = new this().fromCassandraObject(row)
      dbAccounts.push(dbAccount)
    }

    return dbAccounts
  }

  async findOne () {
    const query = `select * from ${keyspace}.account_heartmails where account_id = ? and heartmail = ?`
    const values = [this.accountHeartmail.accountId, this.accountHeartmail.heartmail]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const row = res.first()

    if (row) {
      this.fromCassandraObject(row)
    } else {
      this.accountHeartmail = null
    }

    return this
  }

  static async findOne (accountId, heartmail) {
    return new this(new AccountHeartmail(accountId, heartmail)).findOne()
  }

  async insert () {
    const obj = this.toCassandraObject()

    const query = `insert into ${keyspace}.account_heartmails (account_id, heartmail, created_at, updated_at) values (?, ?, ?, ?)`
    const values = [obj.account_id, obj.heartmail, obj.created_at, obj.updated_at]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }
}
