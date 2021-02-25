const path = require('path')

module.exports = {
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'openspv.bundle.js',
    library: 'openspv'
  },
  devtool: 'source-map',
  mode: 'production'
}
