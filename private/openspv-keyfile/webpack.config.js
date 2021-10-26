const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'openspv-keyfile.bundle.js',
    library: 'OpenSPVKeyFile'
  },
  devtool: 'source-map',
  mode: 'production'
}
