#!/usr/bin/env node
import repl from 'repl'
import * as OpenSPV from '../index.mjs'
// Make all SPV classes globally available.
Object.assign(global, OpenSPV, { OpenSPV: OpenSPV })
repl.start({
  prompt: 'OpenSPV> ',
  useGlobal: true,
  ignoreUndefined: true
})
