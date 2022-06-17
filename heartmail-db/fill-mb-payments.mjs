import { getClient, useKeyspace } from './connect.mjs'
import DbMbAccount from './models/db-mb-account.mjs'
import DbMbPayment from './models/db-mb-payment.mjs'
import { MbPayment } from './structs/mb-payment.mjs'
const client = getClient()

;(async function () {
  await useKeyspace()
  const dbMbAccounts = await DbMbAccount.findAll()
  for (const dbMbAccount of dbMbAccounts) {
    const mbPaymentId = dbMbAccount.mbAccount.mbPaymentId
    const mbPaymentStr = dbMbAccount.mbAccount.mbPayment
    if (!mbPaymentId) {
      continue
    }
    const dbMbPayment = await DbMbPayment.findOne(mbPaymentId)
    if (!dbMbPayment.mbPayment && mbPaymentStr) {
      dbMbPayment.mbPayment = MbPayment.fromRandom().fromObject({
        mbPaymentId,
        mbPaymentStr
      })
      console.log('inserting', mbPaymentId)
      await dbMbPayment.insert()
    } else {
      console.log('skipping', mbPaymentId)
    }
  }
  await client.shutdown()
})()
