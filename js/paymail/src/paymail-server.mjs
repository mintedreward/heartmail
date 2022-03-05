import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = 4000
app.use(bodyParser.urlencoded({ extended: false }))

const wellknown = `
{
  "bsvalias": "1.0",
  "capabilities": {
    "pki": "https://bsvalias.example.org/{alias}@{domain.tld}/id",
    "[extension-name]": "[extension-url]"
  }
}
`
app.get('/.well-known/bsvalias', (req, res) => {
  res.send(wellknown)
})

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`)
})
