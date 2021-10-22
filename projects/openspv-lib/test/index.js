/* global describe,it */
'use strict'
import should from 'should'
import * as spv from '../src/index'

describe('spv', function () {
  it('should pass this sanity check on loading the main package', function () {
    should.exist(spv)
  })
})
