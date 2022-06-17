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
    console.log(mbPaymail, name, avatar)
  }
  await client.shutdown()
})()
