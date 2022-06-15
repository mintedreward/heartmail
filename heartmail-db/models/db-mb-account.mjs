// import { getClient } from '../connect.mjs'
import { PrivKey } from 'heartmail-lib'
import { MbAccount } from '../structs/mb-account.mjs'

// const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
// const client = getClient()

export default class DbMbAccount extends MbAccount {
  fromCassandraObject (obj) {
    return this.fromObject({
      id: obj.id,
      privKey: PrivKey.fromString(obj.priv_key),
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
      id: this.id,
      priv_key: this.privKey.toString(),
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      contact_fee_usd: this.contactFeeUsd,
      affiliate_id: this.affiliateId,
      access_granted_at: this.accessGrantedAt,
      mb_payment: this.mbPayment,
      mb_payment_id: this.mbPaymentId,
      mb_txid: this.mbTxid,
      mb_email: this.mbEmail,
      mb_paymail: this.mbPaymail,
      mb_identity_key: this.mbIdentityKey,
      mb_user_id: this.mbUserId,
      mb_name: this.mbName,
      mb_avatar_url: this.mbAvatarUrl
    }
  }
}

export { DbMbAccount }
