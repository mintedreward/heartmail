import assert from 'node:assert'
import MbPayment from '../structs/mb-payment.mjs'
import DbMbAccount from '../models/db-mb-account.mjs'
import DbAccount from '../models/db-account.mjs'
import DbMbPayment from '../models/db-mb-payment.mjs'
import DbEmailAccount from '../models/db-email-account.mjs'
import fetch from 'isomorphic-fetch'

export async function fetchMbUserNameAvatar (paymail) {
  try {
    const url = `https://www.moneybutton.com/api/v1/bsvalias/public-profile/${paymail}`
    const res = await fetch(url)
    const json = await res.json()
    const { name, avatar } = json
    return { name, avatar }
  } catch (err) {
    return {
      name: null,
      avatar: null
    }
  }
}

export async function paymentIsNew (payment) {
  try {
    const mbPaymentId = payment.id
    const mbPaymentStr = JSON.stringify(payment)
    const dbMbPayment = await DbMbPayment.findOne(mbPaymentId)
    if (dbMbPayment.mbPayment) {
      return false
    }
    dbMbPayment.mbPayment = MbPayment.fromRandom().fromObject({
      mbPaymentId,
      mbPaymentStr
    })
    await dbMbPayment.insert()
    return true
  } catch (err) {
    return false
  }
}

export async function paymentIsNewAndValid (affiliate, payment) {
  // retrieve same payment from DB - does it exist?
  // if payment already exists, mark as invalid and return false
  // else, save the payment to the DB
  // is payment for the correct amount? return true
  // else, return false
  // (payment goes in DB no matter what)
  return paymentIsNew(payment)
}

export async function createAccountWithPayment (contactFeeUsd, affiliate, payment) {
/*
 * TODO (full flow):
 * - query the identity key for the MB user
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
 * - insert mb_account
 * - if custom heartmail:
 *   - insert heartmail
 *   - insert account_heartmail
 * - insert account_avatar
 *
 * TODO (partial flow):
 * - [x] check payment is new
 * - [ ] verify payment
 * - [x] create mb_account
 * - [x] create account
 * - [x] create email_account
 */
  try {
    const isNewAndValid = await paymentIsNewAndValid(affiliate, payment)
    assert(isNewAndValid)

    const dbMbAccount = DbMbAccount.fromPurchase(contactFeeUsd, affiliate, payment)
    const dbAccount = DbAccount.fromMbAccount(dbMbAccount.mbAccount)
    const dbEmailAccount = DbEmailAccount.fromMbAccount(dbMbAccount.mbAccount)

    await dbMbAccount.insert()
    await dbAccount.insert()
    await dbEmailAccount.insert()

    return dbAccount.account.id
  } catch (err) {
    // console.log(err)
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
