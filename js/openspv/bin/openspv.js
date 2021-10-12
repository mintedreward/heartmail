#!/usr/bin/env node
'use strict'
const repl = require('repl')
const OpenSPV = require('../')
// Make all SPV classes globally available.
Object.assign(global, OpenSPV, { OpenSPV: OpenSPV })
repl.start({
  prompt: 'OpenSPV> ',
  useGlobal: true,
  ignoreUndefined: true
})
