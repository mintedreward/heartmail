import { util } from 'heartmail-db'
import { assert } from 'heartmail-elliptic/lib/elliptic/utils'

export default async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    const { contactFeeAmountUsd, affiliate, payment } = req.body

    const longId = await util.createAccountWithPayment(contactFeeAmountUsd, affiliate, payment)

    assert(longId)
    assert(typeof longId === 'string')

    res.status(200).json(longId)
  } catch (err) {
    console.log(err)
    res.status(400).json('Error')
  }
}
