import assert from 'node:assert'
import AccountHeartmail from '../structs/account-heartmail.mjs'
import HeartmailAccount from '../structs/heartmail-account.mjs'
import MbPayment from '../structs/mb-payment.mjs'
import DbMbAccount from '../models/db-mb-account.mjs'
import DbAccount from '../models/db-account.mjs'
import DbMbPayment from '../models/db-mb-payment.mjs'
import DbEmailAccount from '../models/db-email-account.mjs'
import DbHeartmailAccount from '../models/db-heartmail-account.mjs'
import DbAccountHeartmail from '../models/db-account-heartmail.mjs'
import EmailAccount from '../structs/email-account.mjs'
import { MoneyButtonClient } from '@moneybutton/api-client'
import fetch from 'isomorphic-fetch'

const dbApi = {}

dbApi.mbClient = new MoneyButtonClient(
  process.env.NEXT_PUBLIC_MB_CLIENT_IDENTIFIER,
  process.env.MB_OAUTH_CLIENT_SECRET
)
dbApi.mbClient.logInAsApp()
// TODO: The previous method is async. It needs to go inside an async method and
// needs to have some option to re-try should it fail, because this is necessary
// for signing in MB users.

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

dbApi.paymentIsSameOnServer = async function (payment) {
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
    const dbAccountHeartmail = DbAccountHeartmail.fromAccount(dbAccount.account)
    const dbHeartmailAccount = DbHeartmailAccount.fromAccount(dbAccount.account)

    await dbMbAccount.insert()
    await dbAccount.insert()
    await dbEmailAccount.insert()
    await dbAccountHeartmail.insert()
    await dbHeartmailAccount.insert()

    return {
      accountId: dbAccount.account.id,
      email: dbEmailAccount.emailAccount.email
    }
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.getDbAccountsFromEmail = async function (email = '') {
  const dbEmailAccounts = await DbEmailAccount.findEmailAccounts(email)
  assert(dbEmailAccounts.length)
  const dbEmailAccount = dbEmailAccounts[0]
  const dbAccount = await DbAccount.findOne(dbEmailAccount.emailAccount.accountId)
  return { dbEmailAccounts, dbAccount }
}

dbApi.getAccountsFromEmail = async function (email = '') {
  try {
    const { dbEmailAccounts, dbAccount } = await this.getDbAccountsFromEmail(email)
    const emailAccounts = dbEmailAccounts.map(dbEmailAccount => dbEmailAccount.emailAccount)
    const account = dbAccount.account
    return {
      account,
      emailAccounts
    }
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.signInAsEmail = async function (email = '') {
  try {
    const { dbEmailAccounts, dbAccount } = await dbApi.getDbAccountsFromEmail(email)
    const dbEmailAccount = dbEmailAccounts[0]
    const signedInAt = new Date()
    dbEmailAccount.emailAccount.signedInAt = signedInAt
    dbAccount.account.signedInAt = signedInAt
    await dbEmailAccount.insert()
    await dbAccount.insert()

    const account = dbAccount.account.clone().toPublic()
    const emailAccounts = dbEmailAccounts.map(dbEmailAccount => dbEmailAccount.emailAccount)

    return { account, emailAccounts }
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.signInWithPayment = async function (payment) {
  try {
    const isNew = await this.paymentIsNew(payment)
    assert(isNew)

    const isSameOnServer = await this.paymentIsSameOnServer(payment)
    assert(isSameOnServer)

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
    // console.log(err)
    return null
  }
}

dbApi.switchAccount = async function (email, accountId) {
  try {
    const dbEmailAccount = await DbEmailAccount.findOneWithAccountId(email, accountId)
    assert(dbEmailAccount.emailAccount)

    const dbAccount = await DbAccount.findOne(dbEmailAccount.emailAccount.accountId)
    assert(dbAccount.account)

    const signedInAt = new Date()
    dbEmailAccount.emailAccount.signedInAt = signedInAt
    dbAccount.account.signedInAt = signedInAt
    await dbEmailAccount.insert()
    await dbAccount.insert()

    return {
      emailAccount: dbEmailAccount.emailAccount,
      account: dbAccount.account
    }
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.updateAccountProfileSettings = async function (email, account) {
  try {
    const dbAccount = await DbAccount.update(account)
    const emailAccount = EmailAccount.fromObject({
      email,
      createdAt: null,
      updatedAt: null,
      signedInAt: null,
      accountId: account.id,
      accountName: account.name,
      accountHeartmail: account.heartmail,
      accountBio: account.bio
    })
    await DbEmailAccount.update(emailAccount)
    return dbAccount.account
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.getAccountHeartmails = async function (accountId) {
  try {
    const dbAccountHeartmails = await DbAccountHeartmail.findMany(accountId)
    const accountHeartmails = dbAccountHeartmails.map(dbAccountHeartmail => dbAccountHeartmail.accountHeartmail)
    return accountHeartmails
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.getAccount = async function (id) {
  try {
    const dbAccount = await DbAccount.findOne(id)
    const account = dbAccount.account
    if (account) {
      return account.toPublic()
    } else {
      return null
    }
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.fetchMbPublicKey = async function (mbPaymail = '') {
  try {
    // https://www.moneybutton.com/api/v1/bsvalias/id/ryan@moneybutton.com
    let name = mbPaymail.split('@')[0]
    name = name.toLowerCase()
    name = name.replace(/[^A-Za-z0-9]/g, '')
    mbPaymail = `${name}@moneybutton.com`
    const res = await fetch(`https://www.moneybutton.com/api/v1/bsvalias/id/${mbPaymail}`)
    const json = await res.json()
    const pubkey = json.pubkey
    assert(pubkey)
    return pubkey
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.registerMbHeartmail = async function (accountId, heartmail) {
  try {
    // normalize heartmail
    let name = heartmail.split('@')[0]
    name = name.toLowerCase()
    name = name.replace(/[^A-Za-z0-9]/g, '')
    heartmail = `${name}@${process.env.NEXT_PUBLIC_DOMAIN}`

    // make sure heartmail is not already registered
    {
      const heartmailAccount = await DbHeartmailAccount.findOne(heartmail)
      if (heartmailAccount == null) {
        return null
      }
    }

    // fetch public keys and confirm they are the same, meaning the user
    // actually owns this paymail
    const dbMbAccount = await DbMbAccount.findOne(accountId)
    const mbUserId = dbMbAccount.mbAccount.mbUserId
    const mbPaymail1 = `${mbUserId}@moneybutton.com`
    const mbPaymail2 = `${name}@moneybutton.com`
    const pubkey1 = await this.fetchMbPublicKey(mbPaymail1)
    const pubkey2 = await this.fetchMbPublicKey(mbPaymail2)
    assert(pubkey1 && pubkey2)
    assert(pubkey1 === pubkey2)
    assert(typeof pubkey1 === 'string')

    // create new heartmail
    const accountHeartmail = new AccountHeartmail(accountId, heartmail)
    const heartmailAccount = new HeartmailAccount(heartmail, accountId)
    const dbAccountHeartmail = new DbAccountHeartmail(accountHeartmail)
    const dbHeartmailAccount = new DbHeartmailAccount(heartmailAccount)
    await dbAccountHeartmail.insert()
    await dbHeartmailAccount.insert()

    return heartmail
  } catch (err) {
    // console.log(err)
    return null
  }
}

dbApi.setPrimaryHeartmail = async function (email, accountId, heartmail) {
  // confirm that the heartmail exists
  // confirm that the heartmail is owned by this account
  // set the primary heartmail for the account
  // set the primary heartmail on the corresponding email_account
  try {
    const accountHeartmail = await DbAccountHeartmail.findOne(accountId, heartmail)
    assert(accountHeartmail.accountHeartmail)

    const dbAccount = await DbAccount.findOne(accountId)
    const dbEmailAccount = await DbEmailAccount.findOneWithAccountId(email, accountId)
    dbAccount.account.heartmail = heartmail
    dbEmailAccount.emailAccount.accountHeartmail = heartmail
    await dbAccount.insert()
    await dbEmailAccount.insert()

    // await DbAccount.update({
    //   id: accountId,
    //   heartmail
    // })
    // await DbEmailAccount.update({
    //   email,
    //   accountId,
    //   accountHeartmail: heartmail
    // })

    return heartmail
  } catch (err) {
    // console.log(err)
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
