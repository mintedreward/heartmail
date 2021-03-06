/* global describe,it */
'use strict'
import should from 'should'
import * as coasianspv from '../entry'

describe('coasianspv', function () {
  it('should pass this sanity check on loading the main package', function () {
    should.exist(coasianspv)
  })
})
