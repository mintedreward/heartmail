#!/usr/bin/env node
'use strict'
const repl = require('repl')
const bsv = require('../')
// Make all OpenSPV classes globally available.
Object.assign(global, bsv, { bsv: bsv })
repl.start({
  prompt: 'OpenSPV> ',
  useGlobal: true,
  ignoreUndefined: true
})
