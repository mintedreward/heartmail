#!/usr/bin/env node
'use strict'
const repl = require('repl')
const coasianspv = require('../')
// Make all OpenSPV classes globally available.
Object.assign(global, coasianspv, { coasianspv: coasianspv })
repl.start({
  prompt: 'Coasian SPV> ',
  useGlobal: true,
  ignoreUndefined: true
})
