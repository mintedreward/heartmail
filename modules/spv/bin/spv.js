#!/usr/bin/env node
'use strict'
const repl = require('repl')
const spv = require('../')
// Make all SPV classes globally available.
Object.assign(global, spv, { spv: spv })
repl.start({
  prompt: 'spv> ',
  useGlobal: true,
  ignoreUndefined: true
})
