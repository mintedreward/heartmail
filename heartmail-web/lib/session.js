import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

export function withSessionApiRoute (handler) {
  return withIronSessionApiRoute(handler, {
    cookieName: 'heartmail_authentication',
    password: process.env.IRON_SESSION_PASSWORD,
    ttl: 0,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  })
}

export function withSessionSsr (handler) {
  return withIronSessionSsr(handler, {
    cookieName: 'heartmail_authentication',
    password: process.env.IRON_SESSION_PASSWORD,
    ttl: 0,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  })
}
