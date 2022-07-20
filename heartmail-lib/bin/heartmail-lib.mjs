#!/usr/bin/env node
import repl from 'repl'
import * as HeartMailLib from '../index.mjs'
Object.assign(global, HeartMailLib, { HeartMailLib })
repl.start({
  prompt: '💌-lib> ',
  useGlobal: true,
  ignoreUndefined: true
})
