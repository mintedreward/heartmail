const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'spv.bundle.js',
    library: 'spv'
  },
  devtool: 'source-map',
  mode: 'production'
}
