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

  fromCassandraObject (obj) {
    this.account = AuthAddressAccount.fromObject({
      address: obj.address,

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
    return new this(new AuthAddressAccount(id)).findOne()
  }

  async insert () {
    const obj = this.toCassandraObject()

    const query = `insert into ${keyspace}.accounts (id, priv_key, created_at, updated_at, signed_in_at, name, heartmail, bio, contact_fee_usd, affiliate_id, email, paymail, access_granted_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [obj.id, obj.priv_key, obj.created_at, obj.updated_at, obj.signed_in_at, obj.name, obj.heartmail, obj.bio, obj.contact_fee_usd, obj.affiliate_id, obj.email, obj.paymail, obj.access_granted_at]

    const res = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return res
  }
}
