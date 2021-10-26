'use strict'
const testsContext = require.context('./test', false, /^.*\.mjs$/)
testsContext.keys().forEach(testsContext)
