import DbAccount from './models/db-account.mjs'
import { KeyAlias } from 'heartmail-lib'
import assert from 'node:assert'

export async function paymentIsNewAndValid (affiliate, payment) {
  // add payment to DB and ensure uniqueness
  // add more validation later
  return true
}

export async function createAccountWithPayment (contactFeeAmountUsd, affiliate, payment) {
  try {
    const isNewAndValid = await paymentIsNewAndValid(affiliate, payment)
    assert(isNewAndValid)
    const dbAccount = DbAccount.create().delayAccess().fromObject({
      affiliateKeyAlias: affiliate ? KeyAlias.fromLongId(affiliate.longId) : null,
      contactFeeAmountUsd: Math.round(contactFeeAmountUsd * 100, 2) / 100,
      mbEmail: payment.user.email,
      mbPaymail: payment.senderPaymail,
      mbPaymentId: payment.id,
      mbTxid: payment.txid
    })
    await dbAccount.insert()
    return dbAccount.keyAlias.toLongId()
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getAccount (longId) {
  try {
    const dbAccount = await DbAccount.findOneByShortId(longId)
    return {
      longId: dbAccount.keyAlias.toLongId(),
      accessGrantedAt: dbAccount.accessGrantedAt.toJSON(),
      affiliateLongId: dbAccount.affiliateKeyAlias ? dbAccount.affiliateKeyAlias.toLongId() : null,
      contactFeeAmountUsd: dbAccount.contactFeeAmountUsd,
      mbEmail: dbAccount.mbEmail,
      mbPaymail: dbAccount.mbPaymail,
      mbPaymentId: dbAccount.mbPaymentId,
      mbTxid: dbAccount.mbTxid
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getAffiliate (affiliateEmail = '') {
  try {
    if (affiliateEmail) {
      affiliateEmail = `${affiliateEmail}`
      const longId = affiliateEmail.split('@')[0]
      const dbAccount = await DbAccount.findOneByShortId(longId)
      if (dbAccount) {
        return {
          hasAffiliate: true,
          longId: dbAccount.keyAlias.toLongId(),
          mbPaymail: dbAccount.mbPaymail
        }
      }
    }
  } catch (err) {
    return null
  }
}
