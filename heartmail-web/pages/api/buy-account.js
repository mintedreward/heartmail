import { dbApi } from 'openspv-db'
import assert from 'node:assert'
import { withSessionApiRoute } from '../../lib/session.js'

async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    const { contactFeeUsd, affiliate, payment } = req.body

    const { accountId, email } = await dbApi.createAccountWithPayment(contactFeeUsd, affiliate, payment)

    assert(accountId)
    assert(typeof accountId === 'string')

    req.session.email = email
    req.session.accountId = accountId

    await req.session.save()

    res.status(200).json(accountId)
  } catch (err) {
    // console.log(err)
    res.status(400).json('Error')
  }
}

export default withSessionApiRoute(handler)
