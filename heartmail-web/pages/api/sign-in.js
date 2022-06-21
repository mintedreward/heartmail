import { dbApi } from 'heartmail-db'
import assert from 'node:assert'
import { withSessionApiRoute } from '../../lib/session.js'

async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    const { payment } = req.body

    const { email, account, emailAccounts } = await dbApi.signInWithPayment(payment)

    assert(email)
    assert(account)
    assert(emailAccounts)

    req.session.email = email
    req.session.account = account
    req.session.emailAccounts = emailAccounts

    await req.session.save()

    res.status(200).json(email)
  } catch (err) {
    res.status(400).json('Error')
  }
}

export default withSessionApiRoute(handler)
