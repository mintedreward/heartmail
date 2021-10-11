'use strict'
let path = require('path')
let asink = require('asink')
let metamarked = require('meta-marked')
let fs = require('fs')

function DB (dirname) {
  if (!(this instanceof DB)) {
    return new DB(dirname)
  }
  this.initialize()
}

DB.prototype.initialize = function () {
  this.dirname = path.join(__dirname, '..', 'posts')
  return this
}

DB.prototype.asyncGetPosts = function (nlimit) {
  return asink(function *() {
    let files = yield new Promise((resolve, reject) => {
      fs.readdir(this.dirname, (err, files) => {
        if (err) {
          return reject(err)
        }
        resolve(files)
      })
    })
    files.sort().reverse()
    let res = []
    for (let filename of files) {
      if (!filename.endsWith('.md') || filename.startsWith('.')) {
        continue
      }
      if (nlimit === 0) {
        break
      }
      let fullfilename
      let contents = yield new Promise((resolve, reject) => {
        fullfilename = path.join(this.dirname, filename)
        fs.readFile(fullfilename, 'utf8', (err, res) => {
          if (err) {
            return reject(err)
          }
          resolve(res)
        })
      })

      let obj = metamarked(contents)
      obj.fullfilename = fullfilename
      obj.meta.date = obj.meta.date
      obj.filename = filename
      obj.tagname = filename.substr(0, filename.length - 3)
      // meta, html, markdown, fullfilename, filename, tagname

      res.push(obj)
      nlimit--
    }
    return res
  }, this)
}

module.exports = DB
