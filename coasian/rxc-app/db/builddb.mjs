/**
 * The "db" is a temporary solution to get the prototype out the door.
 *
 * We need to use a server-side database and an API to store and access content.
 * That will take some time to build. For now we have the world's most
 * simplistic client-side database to contain all of the content. This works for
 * the prototype but needs to be replaced with a real solution. The entire db
 * directory should be deleted after the content is hosted on a server(s).
 */
'use strict'
import metadataParser from 'markdown-yaml-metadata-parser'
import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let files = fs.readdirSync(__dirname)
files = files.filter(file => file.endsWith('.md') ? true : false)

let db = []

for (let i = 0; i < files.length; i++) {
  const source = fs.readFileSync(`${__dirname}/${files[i]}`, 'utf8')
  const obj = metadataParser(source)
  obj.date = Date.parse(obj.metadata.date)
  obj.filename = files[i]
  db.push(obj)
  // obj.metadata = js object with title, date, etc.
  // obj.content = markdown string
  // obj.date = date in seconds
  // obj.filename = filename, including .md
}

// Sort descending, the way we would expect for reverse chronological blog
db = db.sort((a, b) => b.date - a.date)

const data = `'use strict'
const db = ${JSON.stringify(db)}
export default db
`

fs.writeFileSync(`${__dirname}/db.js`, data)