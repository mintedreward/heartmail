import { getClient } from '../connect.mjs'
import { PrivKey, Struct } from 'heartmail-lib'
import { MbAccount } from '../structs/mb-account.mjs'
import cassandra from 'cassandra-driver'

const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
const client = getClient()

export default class DbMbAccount extends Struct {
  constructor (mbAccount) {
    super({ mbAccount })
  }

  fromRandom () {
    this.mbAccount = MbAccount.fromRandom()
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  fromCassandraObject (obj) {
    this.mbAccount = MbAccount.fromObject({
      id: obj.id,
      privKey: obj.privKey ? PrivKey.fromString(obj.priv_key) : null,
      createdAt: obj.created_at,
      updatedAt: obj.updated_at,
      contactFeeUsd: obj.contact_fee_usd,
      affiliateId: obj.affiliate_id,
      accessGrantedAt: obj.access_granted_at,
      mbPayment: obj.mb_payment,
      mbPaymentId: obj.mb_payment_id,
      mbTxid: obj.mb_txid,
      mbEmail: obj.mb_email,
      mbPaymail: obj.mb_paymail,
      mbIdentityKey: obj.mb_identity_key,
      mbUserId: obj.mb_user_id,
      mbName: obj.mb_name,
      mbAvatarUrl: obj.mb_avatar_url
    })
  }

  toCassandraObject () {
    return {
      id: this.mbAccount.id,
      priv_key: this.mbAccount.privKey?.toString() || null,
      created_at: this.mbAccount.createdAt,
      updated_at: this.mbAccount.updatedAt,
      contact_fee_usd: this.mbAccount.contactFeeUsd,
      affiliate_id: this.mbAccount.affiliateId,
      access_granted_at: this.mbAccount.accessGrantedAt,
      mb_payment: this.mbAccount.mbPayment,
      mb_payment_id: this.mbAccount.mbPaymentId,
      mb_txid: this.mbAccount.mbTxid,
      mb_email: this.mbAccount.mbEmail,
      mb_paymail: this.mbAccount.mbPaymail,
      mb_identity_key: this.mbAccount.mbIdentityKey,
      mb_user_id: this.mbAccount.mbUserId,
      mb_name: this.mbAccount.mbName,
      mb_avatar_url: this.mbAccount.mbAvatarUrl
    }
  }

  async findOne () {
    const obj = this.toCassandraObject()

    const query = `select * from ${keyspace}.keys where id = ?`
    const values = [obj.id]

    const result = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    const row = result.first()

    if (row) {
      this.fromCassandraObject(row)
    }

    return this
  }

  static async findOne (id) {
    return new this(id).findOne()
  }

  async insert () {
    const obj = this.toCassandraObject()

    const query = `insert into ${keyspace}.keys (id, priv_key, created_at, updated_at, contact_fee_usd, affiliate_id, access_granted_at, mb_payment, mb_payment_id, mb_txid, mb_email, mb_paymail, mb_identity_key, mb_user_id, mb_name, mb_avatar_url) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [obj.id, obj.priv_key, obj.created_at, obj.updated_at, obj.contact_fee_usd, obj.affiliate_id, obj.access_granted_at, obj.mb_payment, obj.mb_payment_id, obj.mb_txid, obj.mb_email, obj.mb_paymail, obj.mb_identity_key, obj.mb_user_id, obj.mb_name, obj.mb_avatar_url]

    const result = await client.execute(query, values, { prepare: true, consistency: cassandra.types.consistencies.localQuorum })

    return result
  }
}
