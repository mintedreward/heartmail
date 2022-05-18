/* global describe,it */
import should from 'should'
import * as OpenSPVLib from '../src/index.mjs'

describe('OpenSPVLib', function () {
  it('should pass this sanity check on loading the main package', function () {
    should.exist(OpenSPVLib)
  })
})
