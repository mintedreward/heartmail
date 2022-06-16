import assert from 'node:assert'
import DbMbAccount from './models/db-mb-account.mjs'

export async function paymentIsNewAndValid (affiliate, payment) {
  // add payment to DB and ensure uniqueness
  // add more validation later
  return true
}

export async function createMbAccountWithPayment (contactFeeUsd, affiliate, payment) {
/*
 * TODO:
 * - query the identity key for the MB user
 * - query the name / avatar for the MB user
 * - download the avatar at 288px for the MB user
 * - download the avatar at 120px for the MB user
 * - confirm total size of avatars is under 900KB
 * - if MB paymail is [alias]@moneybutton.com:
 *   - create new heartmail [alias]@heartmail.com
 *   - set primary_heartmail to the new address
 * - else:
 *   - set primary_heartmail to the account id
 *
 * - insert account
 * - insert mb_paymail_account
 * - if custom heartmail:
 *   - insert heartmail
 *   - insert account_heartmail
 * - insert account_avatar
 */
  try {
    const isNewAndValid = await paymentIsNewAndValid(affiliate, payment)
    assert(isNewAndValid)
    const dbMbAccount = DbMbAccount.create()
    dbMbAccount.mbAccount.delayAccess().fromObject({
      affiliateId: affiliate?.id || null,
      contactFeeUsd: Math.round(contactFeeUsd * 100, 2) / 100,
      mbEmail: payment.user?.email || null,
      mbPaymail: payment.senderPaymail,
      mbPaymentId: payment.id,
      mbTxid: payment.txid,
      mbUserId: payment.userId,
      mbPayment: JSON.stringify(payment)
    })
    await dbMbAccount.insert()
    return dbMbAccount.mbAccount.id
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getMbAccount (id) {
  try {
    const dbMbAccount = await DbMbAccount.findOne(id)
    const mbAccount = dbMbAccount.mbAccount
    if (mbAccount) {
      return mbAccount.toPublic()
    } else {
      return null
    }
  } catch (err) {
    return null
  }
}

export async function getAffiliate (affiliateHeartmail = '') {
  try {
    if (affiliateHeartmail) {
      affiliateHeartmail = `${affiliateHeartmail}`
      const id = affiliateHeartmail.split('@')[0]
      const dbMbAccount = await DbMbAccount.findOne(id)
      const mbAccount = dbMbAccount.mbAccount
      if (mbAccount) {
        return {
          hasAffiliate: true,
          id: mbAccount.id,
          mbPaymail: mbAccount.mbPaymail
        }
      }
    }
    return null
  } catch (err) {
    return null
  }
}
