'use strict'
const app = require('express')()

app.get('/', (req, res) => {
  res.redirect(`https://www.heartmail.com${req.url}`)
})

app.get('/*', (req, res) => {
  res.redirect(`https://www.heartmail.com${req.url}`)
})

app.listen(3000)

