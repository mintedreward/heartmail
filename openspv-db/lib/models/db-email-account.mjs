import { getClient } from '../../connect.mjs'
import { Struct } from 'openspv-lib'
import EmailAccount from '../structs/email-account.mjs'
import cassandra from 'cassandra-driver'

const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
const client = getClient()

export default class DbEmailAccount extends Struct {
  constructor (emailAccount) {
    super({ emailAccount })
  }

  fromRandom () {
    this.emailAccount = EmailAccount.fromRandom()
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  fromMbAccount (mbAccount) {
    this.emailAccount = EmailAccount.fromMbAccount(mbAccount)
    return this
  }

  static fromMbAccount (mbAccount) {
    return new this().fromMbAccount(mbAccount)
  }

  fromCassandraObject (obj) {
    this.emailAccount = EmailAccount.fromObject({
      email: obj.email,

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
      email: this.emailAccount.email,

      created_at: this.emailAccount.createdAt,
      updated_at: this.emailAccount.updatedAt,
      signed_in_at: this.emailAccount.signedInAt,

      account_id: this.emailAccount.accountId,
      account_name: this.emailAccount.accountName,
      account_heartmail: this.emailAccount.accountHeartmail,
      account_bio: this.emailAccount.accountBio
    }
  }

  static async findEmailAccounts (email = '') {
    const query = `select * from ${keyspace}.email_accounts where email = ?`
    const values = [email]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    let dbEmailAccounts = []

    for (const row of res) {
      const dbEmailAccount = new this().fromCassandraObject(row)
      dbEmailAccounts.push(dbEmailAccount)
    }

    dbEmailAccounts = dbEmailAccounts.sort((a, b) => b.emailAccount.signedInAt.getTime() - a.emailAccount.signedInAt.getTime())

    return dbEmailAccounts
  }

  static async findAll () {
    const query = `select * from ${keyspace}.email_accounts`
    const values = []

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const dbEmailAccounts = []

    for (const row of res) {
      const dbEmailAccount = new this().fromCassandraObject(row)
      dbEmailAccounts.push(dbEmailAccount)
    }

    return dbEmailAccounts
  }

  async findOne () {
    const query = `select * from ${keyspace}.email_accounts where email = ?`
    const values = [this.emailAccount.email]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const row = res.first()

    if (row) {
      this.fromCassandraObject(row)
    } else {
      this.emailAccount = null
    }

    return this
  }

  static async findOne (email) {
    return new this(new EmailAccount(email)).findOne()
  }

  async findOneWithAccountId () {
    const query = `select * from ${keyspace}.email_accounts where email = ? and account_id = ?`
    const values = [this.emailAccount.email, this.emailAccount.accountId]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const row = res.first()

    if (row) {
      this.fromCassandraObject(row)
    } else {
      this.emailAccount = null
    }

    return this
  }

  static async findOneWithAccountId (email, accountId) {
    return new this(new EmailAccount().fromObject({
      email,
      accountId
    })).findOneWithAccountId()
  }

  async insert () {
    const obj = this.toCassandraObject()

    const query = `insert into ${keyspace}.email_accounts (email, created_at, updated_at, signed_in_at, account_id, account_name, account_heartmail, account_bio) values (?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [obj.email, obj.created_at, obj.updated_at, obj.signed_in_at, obj.account_id, obj.account_name, obj.account_heartmail, obj.account_bio]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }

  async update () {
    // update all non-nullish values

    const obj = this.toCassandraObject()
    const email = obj.email
    delete obj.email
    delete obj.account_id
    const keys = Object.keys(obj).filter(key => obj[key] != null)
    const values = keys.map(key => obj[key])
    values.push(email, this.emailAccount.accountId)

    const query = `update ${keyspace}.email_accounts set ${keys.join(' = ?, ') + ' = ?'} where email = ? and account_id = ?`

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }

  static async update (account) {
    return new this(account).update()
  }
}
