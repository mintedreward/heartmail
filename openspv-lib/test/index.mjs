/* global describe,it */
import should from 'should'
import * as HeartMailLib from '../src/index.mjs'

describe('HeartMailLib', function () {
  it('should pass this sanity check on loading the main package', function () {
    should.exist(HeartMailLib)
  })
})
