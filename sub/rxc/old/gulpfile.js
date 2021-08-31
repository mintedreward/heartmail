'use strict'
require('babel-register')

let DB = require('./lib/db')
let React = require('react')
let ReactDOMServer = require('react-dom/server')
let asink = require('asink')
let fs = require('fs')
let gulp = require('gulp')
let path = require('path')

let PageIndex = React.createFactory(require('./react/page-index.jsx'))
let PagePost = React.createFactory(require('./react/page-post.jsx'))

gulp.task('copy-bootstrap', function () {
  return asink(function *() {
    yield new Promise((resolve, reject) => {
      fs.mkdir(path.join(__dirname, 'build', 'css'), (err) => {
        if (err) {
        }
        resolve()
      })
    })
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.css'))
        .pipe(fs.createWriteStream(path.join(__dirname, 'build', 'css', 'bootstrap.css')))
        .on('close', resolve)
        .on('error', reject)
    })
  })
})

gulp.task('copy-static', function () {
  return asink(function *() {
    return new Promise((resolve, reject) => {
      gulp.src(path.join(__dirname, 'static/**'))
        .pipe(gulp.dest(path.join(__dirname, 'build')));
    })
  })
})

function build_page (ReactClass, title, destination, props) {
  return asink(function *() {
    let template = yield new Promise((resolve, reject) => {
      let fullfilename = path.join(__dirname, 'template', 'page.html')
      fs.readFile(fullfilename, 'utf8', (err, res) => {
        if (err) {
          return reject(err)
        }
        resolve(res)
      })
    })
    let body = ReactDOMServer.renderToString(ReactClass(props))
    let page = ''
    page = template.replace('TITLE', title)
    page = page.replace('BODY', body)
    yield new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, 'build', destination), page, err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}

gulp.task('build-posts', function () {
  return asink(function *() {
    yield new Promise((resolve, reject) => {
      fs.mkdir(path.join(__dirname, 'build', 'archive'), (err) => {
        if (err) {
        }
        resolve()
      })
    })
    let posts = yield DB().asyncGetPosts()
    for (let post of posts) {
      console.log(post.tagname)
      let title = `${post.title} | Ryan X. Charles`
      yield new Promise((resolve, reject) => {
        fs.mkdir(path.join(__dirname, 'build', 'archive', post.tagname), (err) => {
          if (err) {
          }
          resolve()
        })
      })
      let destination = path.join('archive', post.tagname, 'index.html')
      let props = {
        bodyHTML: post.html,
        title: post.meta.title,
        author: post.meta.author,
        date: post.meta.date.toString(),
        label: post.meta.label
      }
      yield build_page(PagePost, title, destination, props)
    }
  })
})

gulp.task('build-page-index', function () {
  return build_page(PageIndex, 'Ryan X. Charles', 'index.html')
})

gulp.task('build-pages', ['build-page-index', 'build-posts'], function () {
})

gulp.task('build', ['copy-bootstrap', 'copy-static', 'build-pages'], function () {
})
