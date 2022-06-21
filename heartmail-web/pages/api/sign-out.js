import { dbApi } from 'heartmail-db'
import assert from 'node:assert'
import { withSessionApiRoute } from '../../lib/session.js'

async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    req.session.destroy()

    res.status(200).json({ signedOut: true })
  } catch (err) {
    res.status(400).json('Error')
  }
}

export default withSessionApiRoute(handler)
