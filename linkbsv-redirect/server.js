'use strict'
const app = require('express')()

app.get('/', (req, res) => {
  res.redirect(`https://www.heartmail.com`)
})

app.get('/*', (req, res) => {
  res.redirect(`https://www.heartmail.com`)
})

app.listen(3000)
