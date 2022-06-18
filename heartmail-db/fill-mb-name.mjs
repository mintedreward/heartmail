import { getClient, useKeyspace } from './connect.mjs'
import DbMbAccount from './models/db-mb-account.mjs'
import * as util from './util.mjs'
const client = getClient()

;(async function () {
  await useKeyspace()
  const dbMbAccounts = await DbMbAccount.findAll()
  for (const dbMbAccount of dbMbAccounts) {
    const mbPaymail = dbMbAccount.mbAccount.mbPaymail
    const { name, avatar } = await util.fetchMbUserNameAvatar(mbPaymail)
    const mbAccount = dbMbAccount.mbAccount
    mbAccount.mbName = name
    mbAccount.mbAvatarUrl = avatar
    mbAccount.mbPayment = null
    console.log(mbAccount.id)
    await dbMbAccount.insert()
  }
  await client.shutdown()
})()
