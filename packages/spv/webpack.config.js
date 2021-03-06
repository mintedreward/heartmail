const path = require('path')

module.exports = {
  entry: './entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'coasianspv.bundle.js',
    library: 'coasianspv'
  },
  devtool: 'source-map',
  mode: 'production'
}
