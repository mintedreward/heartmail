// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/heartmail-avatar-light.png' />
      </Head>
      <body style={{ backgroundColor: '#66ace2' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
