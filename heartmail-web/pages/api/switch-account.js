import { dbApi } from 'openspv-db'
import assert from 'node:assert'
import { withSessionApiRoute } from '../../lib/session.js'

async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    const { accountId } = req.body

    const email = req.session.email
    const currentAccountId = req.session.accountId

    if (accountId === currentAccountId) {
      res.status(200).json({ accountId })
      return
    }

    const { emailAccount, account } = await dbApi.switchAccount(email, accountId)

    assert(emailAccount)
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
