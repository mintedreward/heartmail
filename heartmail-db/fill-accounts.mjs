import { getClient, useKeyspace } from './connect.mjs'
import DbMbAccount from './models/db-mb-account.mjs'
import DbAccount from './models/db-account.mjs'
import DbEmailAccount from './models/db-email-account.mjs'

const client = getClient()

;(async function () {
  await useKeyspace()
  const dbMbAccounts = await DbMbAccount.findAll()
  for (const dbMbAccount of dbMbAccounts) {
    const dbAccount = DbAccount.fromMbAccount(dbMbAccount.mbAccount)
    const dbEmailAccount = DbEmailAccount.fromMbAccount(dbMbAccount.mbAccount)

    console.log(dbAccount.account.id)
    await dbAccount.insert()
    await dbEmailAccount.insert()
  }
  await client.shutdown()
})()
