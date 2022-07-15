import { dbApi } from 'openspv-db'
import assert from 'node:assert'
import { withSessionApiRoute } from '../../lib/session.js'

async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    const { payment } = req.body

    const { email, account } = await dbApi.signInWithPayment(payment)

    assert(email)
    assert(account)

    req.session.email = email
    req.session.accountId = account.id

    await req.session.save()

    res.status(200).json(email)
  } catch (err) {
    res.status(400).json('Error')
  }
}

export default withSessionApiRoute(handler)
