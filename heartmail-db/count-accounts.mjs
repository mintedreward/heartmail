import { getClient, useKeyspace } from './connect.mjs'
import DbAccount from './lib/models/db-account.mjs'

const client = getClient()

;(async function () {
  await useKeyspace()
  const dbAccounts = await DbAccount.findAll()
  let count = 0
  for (const dbAccount of dbAccounts) {
    console.log(dbAccount.account.name, dbAccount.account.heartmail, dbAccount.account.paymail)
    count++
  }
  console.log(count)
  await client.shutdown()
})()
