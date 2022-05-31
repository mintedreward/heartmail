import DbAccessKey from './models/db-access-key.mjs'
import { KeyAlias } from 'heartmail-lib'
import assert from 'node:assert'

export async function paymentIsNewAndValid (affiliate, payment) {
  // add payment to DB and ensure uniqueness
  // add more validation later
  return true
}

export async function createAccessKeyWithPayment (contactFeeAmountUsd, affiliate, payment) {
  try {
    const isNewAndValid = await paymentIsNewAndValid(affiliate, payment)
    assert(isNewAndValid)
    const dbAccessKey = DbAccessKey.create().delayAccess().fromObject({
      affiliateKeyAlias: affiliate ? KeyAlias.fromLongId(affiliate.longId) : null,
      contactFeeAmountUsd: Math.round(contactFeeAmountUsd * 100, 2) / 100,
      mbEmail: payment.user.email,
      mbPaymail: payment.senderPaymail,
      mbPaymentId: payment.id,
      mbTxid: payment.txid
    })
    await dbAccessKey.insert()
    return dbAccessKey.keyAlias.toLongId()
  } catch (err) {
    return null
  }
}

export async function createAccountWithPayment (contactFeeAmountUsd, affiliate, payment) {
/*
 * - query the identity key for the MB user
 * - query the name / avatar for the MB user
 * - download the avatar at 288px for the MB user
 * - download the avatar at 120px for the MB user
 * - confirm total size of avatars is under 900KB
 * - if MB paymail is [alias]@moneybutton.com:
 *   - create new heartmail_address [alias]@heartmail.com
 *   - set primary_heartmail_address to the new address
 * - else:
 *   - set primary_heartmail_address to the account id
 *
 * - insert account
 * - insert mb_paymail_account
 * - if custom heartmail_address:
 *   - insert heartmail_address
 *   - insert account_heartmail_address
 * - insert account_avatar
 */
}

export async function getAccessKey (longId) {
  try {
    const dbAccessKey = await DbAccessKey.findOneByShortId(longId)
    return {
      longId: dbAccessKey.keyAlias.toLongId(),
      accessGrantedAt: dbAccessKey.accessGrantedAt.toJSON(),
      affiliateLongId: dbAccessKey.affiliateKeyAlias ? dbAccessKey.affiliateKeyAlias.toLongId() : null,
      contactFeeAmountUsd: dbAccessKey.contactFeeAmountUsd,
      mbEmail: dbAccessKey.mbEmail,
      mbPaymail: dbAccessKey.mbPaymail,
      mbPaymentId: dbAccessKey.mbPaymentId,
      mbTxid: dbAccessKey.mbTxid
    }
  } catch (err) {
    return null
  }
}

export async function getAffiliate (affiliateEmail = '') {
  try {
    if (affiliateEmail) {
      affiliateEmail = `${affiliateEmail}`
      const longId = affiliateEmail.split('@')[0]
      const dbAccessKey = await DbAccessKey.findOneByShortId(longId)
      if (dbAccessKey) {
        return {
          hasAffiliate: true,
          longId: dbAccessKey.keyAlias.toLongId(),
          mbPaymail: dbAccessKey.mbPaymail
        }
      }
    }
  } catch (err) {
    return null
  }
}
