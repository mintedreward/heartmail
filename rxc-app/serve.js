const express = require('express')
const serve = express()
const path = require('path')

serve.use('/', express.static(path.join(__dirname, 'web-build')))
serve.use('/*', express.static(path.join(__dirname, 'web-build')))

serve.listen(3000)
console.log('Listening on port 3000')
