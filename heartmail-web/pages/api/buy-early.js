import { dbApi } from 'heartmail-db'
import assert from 'node:assert'

export default async function handler (req, res) {
  try {
    assert(req.method === 'POST')

    const { contactFeeUsd, affiliate, payment } = req.body

    const id = await dbApi.createAccountWithPayment(contactFeeUsd, affiliate, payment)

    assert(id)
    assert(typeof id === 'string')

    res.status(200).json(id)
  } catch (err) {
    res.status(400).json('Error')
  }
}
