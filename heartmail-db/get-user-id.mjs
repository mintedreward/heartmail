import { getClient, useKeyspace } from './connect.mjs'
import { MoneyButtonClient } from '@moneybutton/api-client'
import { DbMbAccount } from './index.mjs'

const MB_CLIENT_IDENTIFIER = process.env.MB_CLIENT_IDENTIFIER
const MB_OAUTH_CLIENT_SECRET = process.env.MB_OAUTH_CLIENT_SECRET

const client = getClient()
const mbClient = new MoneyButtonClient(MB_CLIENT_IDENTIFIER, MB_OAUTH_CLIENT_SECRET)

;(async function () {
  await useKeyspace()

  await mbClient.logInAsApp()

  const dbMbAccounts = await DbMbAccount.findAll()

  for (const dbMbAccount of dbMbAccounts) {
    const id = dbMbAccount.mbAccount.id
    const mbPaymentId = dbMbAccount.mbAccount.mbPaymentId
    const mbPayment = await mbClient.getPaymentById(mbPaymentId)
    const mbUserId = mbPayment.userId
    dbMbAccount.mbAccount.mbUserId = mbUserId
    dbMbAccount.mbAccount.mbPayment = JSON.stringify(mbPayment)
    console.log(id, mbPaymentId, mbUserId)
    await dbMbAccount.insert()
  }

  await client.shutdown()
})()
