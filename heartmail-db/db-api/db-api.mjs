import assert from 'node:assert'
import MbPayment from '../structs/mb-payment.mjs'
import DbMbAccount from '../models/db-mb-account.mjs'
import DbAccount from '../models/db-account.mjs'
import DbMbPayment from '../models/db-mb-payment.mjs'
import DbEmailAccount from '../models/db-email-account.mjs'
import { MoneyButtonClient } from '@moneybutton/api-client'
import fetch from 'isomorphic-fetch'

const dbApi = {}

dbApi.mbClient = new MoneyButtonClient(
  process.env.NEXT_PUBLIC_MB_CLIENT_IDENTIFIER,
  process.env.MB_OAUTH_CLIENT_SECRET
)
dbApi.mbClient.logInAsApp()
// TODO: The previous method is async. Should it go in an async method
// somewhere, or is it safe to be synchronous at the top level?

dbApi.fetchMbUserNameAvatar = async function (paymail) {
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

dbApi.paymentIsNew = async function (payment) {
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

dbApi.paymentIsServerSide = async function (payment) {
  try {
    const clientPayment = payment
    const serverPayment = await this.mbClient.getPaymentById(payment.id)
    assert(clientPayment.id = serverPayment.id)
    assert(clientPayment.userId = serverPayment.userId)
    assert(clientPayment.referrerUrl = serverPayment.referrerUrl)
    assert(clientPayment.paymentOutputs.length === serverPayment.paymentOutputs.length)
    for (let i = 0; i < clientPayment.paymentOutputs.length; i++) {
      assert(clientPayment.paymentOutputs[i].to === serverPayment.paymentOutputs[i].to)
      assert(clientPayment.paymentOutputs[i].amount === serverPayment.paymentOutputs[i].amount)
      assert(clientPayment.paymentOutputs[i].currency === serverPayment.paymentOutputs[i].currency)
    }
    return true
  } catch (err) {
    // console.log(err)
    return false
  }
}

// TODO: Test
dbApi.paymentIsFromOurDomain = async function (payment) {
  return payment.referrerUrl.startsWith(process.env.NEXT_PUBLIC_URL)
}

dbApi.paymentIsNewAndValid = async function (affiliate, payment) {
  // retrieve same payment from DB - does it exist?
  // if payment already exists, mark as invalid and return false
  // else, save the payment to the DB
  // is payment for the correct amount? return true
  // else, return false
  // (payment goes in DB no matter what)
  return this.paymentIsNew(payment)
}

dbApi.createAccountWithPayment = async function (contactFeeUsd, affiliate, payment) {
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
    const isNewAndValid = await this.paymentIsNewAndValid(affiliate, payment)
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

// TODO: Test
dbApi.signInAsEmail = async function (email = '') {
  try {
    const dbEmailAccounts = await DbEmailAccount.findEmailAccounts(email)
    const dbEmailAccount = dbEmailAccounts[0]
    const dbAccount = await DbAccount.findOne(dbEmailAccount.emailAccount.accountId)
    const signedInAt = new Date()
    dbEmailAccount.emailAccount.signedInAt = signedInAt
    dbAccount.account.signedInAt = signedInAt
    await dbEmailAccount.insert()
    await dbAccount.insert()

    const account = dbAccount.account.clone().toPublic()
    const emailAccounts = dbEmailAccounts.map(dbEmailAccount => dbEmailAccount.emailAccount)

    return { account, emailAccounts }
  } catch (err) {
    console.log(err)
    return null
  }
}

// TODO: Test
dbApi.signInWithPayment = async function (payment) {
  try {
    const isNew = await this.paymentIsNew(payment)
    assert(isNew)

    const isServerSide = await this.paymentIsServerSide(payment)
    assert(isServerSide)

    const isFromOurDomain = await this.paymentIsFromOurDomain(payment)
    assert(isFromOurDomain)

    const mbUserId = payment.userId
    const email = `${mbUserId}@moneybutton.com`
    const { account, emailAccounts } = await this.signInAsEmail(email)

    return {
      email,
      account,
      emailAccounts
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

dbApi.getMbAccount = async function (id) {
  try {
    const dbMbAccount = await DbMbAccount.findOne(id)
    const mbAccount = dbMbAccount.mbAccount
    if (mbAccount) {
      return mbAccount.toPublic()
    } else {
      return null
    }
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.getAffiliate = async function (affiliateHeartmail = '') {
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

export default dbApi
