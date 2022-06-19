import { getClient } from '../connect.mjs'
import { PrivKey, Struct } from 'heartmail-lib'
import Account from '../structs/account.mjs'
import cassandra from 'cassandra-driver'

const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
const client = getClient()

export default class DbMbAccount extends Struct {
  constructor (account) {
    super({ account })
  }

  fromRandom () {
    this.account = Account.fromRandom()
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  create (obj) {
    this.fromRandom()
    this.account.fromObject(obj)
    this.account.accessGrantedAt = this.account.accessGrantedAt ? this.account.accessGrantedAt : new Date()
    this.account.contactFeeAmountUsd = this.account.contactFeeAmountUsd === undefined ? 1.00 : this.contactFeeAmountUsd
    return this
  }

  static create (obj) {
    return new this().create(obj)
  }

  fromMbAccount (mbAccount) {
    this.account = Account.fromMbAccount(mbAccount)
    return this
  }

  static fromMbAccount (mbAccount) {
    return new this().fromMbAccount(mbAccount)
  }

  fromCassandraObject (obj) {
    this.account = Account.fromObject({
      id: obj.id,
      privKey: obj.priv_key ? PrivKey.fromString(obj.priv_key) : null,

      createdAt: obj.created_at,
      updatedAt: obj.updated_at,
      signedInAt: obj.signed_in_at,

      name: obj.name,
      heartmail: obj.heartmail,
      bio: obj.bio,
      contactFeeUsd: obj.contact_fee_usd,
      affiliateId: obj.affiliate_id,
      email: obj.email,
      paymail: obj.paymail,

      accessGrantedAt: obj.access_granted_at
    })
    return this
  }

  toCassandraObject () {
    return {
      id: this.account.id,
      priv_key: this.account.privKey?.toString() || null,

      created_at: this.account.createdAt,
      updated_at: this.account.updatedAt,
      signed_in_at: this.account.signedInAt,

      name: this.account.name,
      heartmail: this.account.heartmail,
      bio: this.account.bio,
      contact_fee_usd: this.account.contactFeeUsd,
      affiliate_id: this.account.affiliateId,
      email: this.account.email,
      paymail: this.account.paymail,

      access_granted_at: this.account.accessGrantedAt
    }
  }

  static async findAll () {
    const query = `select * from ${keyspace}.accounts`
    const values = []

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const dbAccounts = []

    for (const row of res) {
      const dbAccount = new this().fromCassandraObject(row)
      dbAccounts.push(dbAccount)
    }

    return dbAccounts
  }

  async findOne () {
    const query = `select * from ${keyspace}.accounts where id = ?`
    const values = [this.account.id]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const row = res.first()

    if (row) {
      this.fromCassandraObject(row)
    } else {
      this.account = null
    }

    return this
  }

  static async findOne (id) {
    return new this(new Account(id)).findOne()
  }

  async insert () {
    const obj = this.toCassandraObject()

    const query = `insert into ${keyspace}.accounts (id, priv_key, created_at, updated_at, signed_in_at, name, heartmail, bio, contact_fee_usd, affiliate_id, email, paymail, access_granted_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [obj.id, obj.priv_key, obj.created_at, obj.updated_at, obj.signed_in_at, obj.name, obj.heartmail, obj.bio, obj.contact_fee_usd, obj.affiliate_id, obj.email, obj.paymail, obj.access_granted_at]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }
}
