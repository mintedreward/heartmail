import { getClient, useKeyspace } from './connect.mjs'
import { DbAccessKey, DbMbAccount } from './index.mjs'
const client = getClient()

;(async function () {
  await useKeyspace()
  const dbAccessKeys = await DbAccessKey.findAll()

  for (let i = 0; i < dbAccessKeys.length; i++) {
    const dbAccessKey = dbAccessKeys[i]
    const mbAccount = dbAccessKey.toMbAccount()
    const dbMbAccount = new DbMbAccount(mbAccount)
    await dbMbAccount.insert()
    console.log(dbMbAccount.mbAccount.id)
  }

  await client.shutdown()
})()
