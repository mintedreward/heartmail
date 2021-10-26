const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'openspv-lib.bundle.js',
    library: 'OpenSPVLib'
  },
  devtool: 'source-map',
  mode: 'production'
}
