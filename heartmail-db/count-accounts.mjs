import { getClient, useKeyspace } from './connect.mjs'
import DbAccount from './lib/models/db-account.mjs'

const client = getClient()

;(async function () {
  await useKeyspace()
  const dbAccounts = await DbAccount.findAll()
  let count = 0
  for (const dbAccount of dbAccounts) {
    const account = dbAccount.account
    const name = account.name
    const email = account.email
    // const paymail = account.paymail
    const heartmail = account.heartmail
    if (heartmail !== `${account.id}@heartmail.com`) {
      continue
    }
    console.log(`${name} <${email}> <${heartmail}>`)
    // console.log(name, paymail, email)
    count++
  }
  console.log(count, 'no primary heartmail')
  await client.shutdown()
})()
