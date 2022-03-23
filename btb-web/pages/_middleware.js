'use strict'
import { NextResponse } from 'next/server'

// https://nextjs.org/docs/middleware
export default function redirectWWW (req, ev) {
  const url = new URL(req.url)
  const hostname = url.hostname
  if (process.env.DOMAIN_PREFIX) {
    console.log('domain prefix')
    if (!hostname.startsWith(process.env.DOMAIN_PREFIX)) {
      console.log('starts with')
      url.hostname = `${process.env.DOMAIN_PREFIX}${hostname}`
      const href = url.href
      console.log('redirect', href)
      return NextResponse.redirect(href)
    }
  }
  return NextResponse.next()
}
