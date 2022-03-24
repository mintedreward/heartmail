'use strict'

const BSON = require('bson')
const fs = require('fs')
const util = require('util')
const readFile = (fileName) => util.promisify(fs.readFile)(fileName)

;(async () => {
  try {
    const usersFile = await readFile('./dump/linkBsv/users.bson')
    console.log('hello')
    const usersJSON = BSON.deserialize(usersFile)
    console.log('hello')
    console.log(usersJSON)
    console.log('hello')
  }
  catch (error) {
    console.error(error)
  }
})()
