import { dbApi } from 'heartmail-db'
import { withIronSessionApiRoute } from 'iron-session/next'
import assert from 'node:assert'

export default withIronSessionApiRoute(
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
  },
  {
    cookieName: 'heartmail_authentication',
    password: process.env.IRON_SESSION_KEY_1,
    ttl: 0,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
)
