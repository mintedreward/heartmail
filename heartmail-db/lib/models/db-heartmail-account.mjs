import { getClient } from '../../connect.mjs'
import { Struct } from 'heartmail-lib'
import HeartmailAccount from '../structs/heartmail-account.mjs'
import cassandra from 'cassandra-driver'

const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
const client = getClient()

export default class DbHeartmailAccount extends Struct {
  constructor (heartmailAccount) {
    super({ heartmailAccount })
  }

  fromAccount (account) {
    this.heartmailAccount = HeartmailAccount.fromAccount(account)
    return this
  }

  static fromAccount (account) {
    return new this().fromAccount(account)
  }

  fromCassandraObject (obj) {
    this.heartmailAccount = HeartmailAccount.fromObject({
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
      heartmail: this.heartmailAccount.heartmail,
      account_id: this.heartmailAccount.accountId,
      created_at: this.heartmailAccount.createdAt,
      updated_at: this.heartmailAccount.updatedAt
    }
  }

  async findOne () {
    const query = `select * from ${keyspace}.heartmail_accounts where heartmail = ?`
    const values = [this.heartmailAccount.heartmail]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const row = res.first()

    if (row) {
      this.fromCassandraObject(row)
    } else {
      this.heartmailAccount = null
    }

    return this
  }

  static async findOne (heartmail) {
    return new this(new HeartmailAccount(heartmail)).findOne()
  }

  async insert () {
    const obj = this.toCassandraObject()

    const query = `insert into ${keyspace}.heartmail_accounts (heartmail, account_id, created_at, updated_at) values (?, ?, ?, ?)`
    const values = [obj.heartmail, obj.account_id, obj.created_at, obj.updated_at]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }

  async delete () {
    const obj = this.toCassandraObject()

    const query = `delete from ${keyspace}.heartmail_accounts where heartmail = ?`
    const values = [obj.heartmail]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }

  static async delete (heartmail) {
    return new this(new HeartmailAccount(heartmail)).delete()
  }
}
