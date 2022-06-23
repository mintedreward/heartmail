import { dbApi, Account } from 'heartmail-db'
import assert from 'node:assert'
import { withSessionApiRoute } from '../../lib/session.js'

async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    const { account: accountJSON } = req.body

    const account = Account.fromJSON(accountJSON)
    account.id = req.session.accountId
    const email = req.session.email

    await dbApi.updateAccountProfileSettings(email, account)

    res.status(200).json({ accountId: account.id })
  } catch (err) {
    res.status(400).json('Error')
  }
}

export default withSessionApiRoute(handler)
