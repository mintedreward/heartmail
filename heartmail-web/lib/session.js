import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

const options = {
  cookieName: 'heartmail_authentication',
  password: process.env.IRON_SESSION_PASSWORD,
  ttl: 0,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export function withSessionApiRoute (handler) {
  return withIronSessionApiRoute(handler, options)
}

export function withSessionSsr (handler) {
  return withIronSessionSsr(handler, options)
}
