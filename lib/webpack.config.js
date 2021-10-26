const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'openspv-lib.bundle.js',
    library: 'OpenSPVLib'
  },
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.json']
  },
  devtool: 'source-map',
  mode: 'production',
  experiments: {
    topLevelAwait: true
  }
}
