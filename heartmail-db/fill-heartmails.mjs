import { getClient, useKeyspace } from './connect.mjs'
import DbHeartmailAccount from './models/db-heartmail-account.mjs'
import DbAccountHeartmail from './models/db-account-heartmail.mjs'
import DbAccount from './models/db-account.mjs'

const client = getClient()

;(async function () {
  await useKeyspace()
  const dbAccounts = await DbAccount.findAll()
  for (const dbAccount of dbAccounts) {
    const account = dbAccount.account
    if (!account.heartmail) {
      console.log('skipping', account.id)
      continue
    }

    const dbAccountHeartmail = DbAccountHeartmail.fromAccount(account)
    const dbHeartmailAccount = DbHeartmailAccount.fromAccount(account)

    console.log('writing', account.id)

    await dbAccountHeartmail.insert()
    await dbHeartmailAccount.insert()
  }
  await client.shutdown()
})()
