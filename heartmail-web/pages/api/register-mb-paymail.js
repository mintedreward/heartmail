import { dbApi } from 'openspv-db'
import assert from 'node:assert'
import { withSessionApiRoute } from '../../lib/session.js'

async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    let { heartmail } = req.body
    const accountId = req.session.accountId
    assert(accountId)
    assert(heartmail)

    heartmail = await dbApi.registerMbHeartmail(accountId, heartmail)

    assert(heartmail)

    res.status(200).json(heartmail)
  } catch (err) {
    // console.log(err)
    res.status(400).json('Error')
  }
}

export default withSessionApiRoute(handler)
