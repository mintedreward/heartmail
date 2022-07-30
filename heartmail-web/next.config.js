module.exports = {
  optimizeFonts: false,
  reactStrictMode: true,

  async redirects () {
    return [
      {
        source: '/access/:id',
        destination: '/sign-in',
        permanent: false
      },
      {
        source: '/.well-known/bsvalias',
        destination: '/.well-known/api-capabilities',
        permanent: false
      }
    ]
  }
}
