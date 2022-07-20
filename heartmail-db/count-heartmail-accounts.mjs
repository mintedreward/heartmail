import { getClient, useKeyspace } from './connect.mjs'
import DbHeartmailAccount from './lib/models/db-heartmail-account.mjs'

const client = getClient()

;(async function () {
  await useKeyspace()
  const dbHeartmailAccounts = await DbHeartmailAccount.findAll()
  let count = 0
  for (const dbHeartmailAccount of dbHeartmailAccounts) {
    console.log(dbHeartmailAccount.heartmailAccount.heartmail)
    count++
  }
  console.log(count)
  await client.shutdown()
})()
