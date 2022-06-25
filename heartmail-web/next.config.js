module.exports = {
  optimizeFonts: false,
  reactStrictMode: true,

  async redirects () {
    return [
      {
        source: '/access/:id',
        destination: '/sign-in',
        permanent: false
      }
    ]
  }
}
