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
      externalEmail: payment.user.email.toLowerCase(),
      externalPaymail: payment.senderPaymail.toLowerCase(),
      affiliateKeyAlias: KeyAlias.fromLongId(affiliate.longId),
      contactFeeAmountUsd: Math.round(contactFeeAmountUsd * 100, 2) / 100,
      mbPaymentId: payment.id,
      mbTxid: payment.txid
    })
    await dbAccount.insert()
    return dbAccount.keyAlias.toLongId()
  } catch (err) {
    return undefined
  }
}

export async function getAccount (longId) {
  try {
    const dbAccount = await DbAccount.findOneByShortId(longId)
    return {
      longId: dbAccount.keyAlias.toLongId(),
      accessGrantedAt: dbAccount.accessGrantedAt.toJSON(),
      externalEmail: dbAccount.externalEmail,
      externalPaymail: dbAccount.externalPaymail,
      affiliateLongId: dbAccount.affiliateKeyAlias.toLongId(),
      contactFeeAmountUsd: dbAccount.contactFeeAmountUsd,
      mbPaymentId: dbAccount.mbPaymentId,
      mbTxid: dbAccount.mbTxid
    }
  } catch (err) {
    return undefined
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
          externalPaymail: dbAccount.externalPaymail
        }
      }
    }
  } catch (err) {
    return undefined
  }
}
