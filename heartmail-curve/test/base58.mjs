/* global describe,it */
import Base58 from '../src/base58.mjs'
import should from 'should'

describe('Base58', () => {
  const buf = Buffer.from([0, 1, 2, 3, 253, 254, 255])
  const enc = '1W7N4RuG'

  it('should exist', () => {
    should.exist(Base58)
  })

  it.skip('should allow this handy syntax', function () {
    Base58.fromBuffer(buf).toString().should.equal(enc)
    new Base58()
      .fromString(enc)
      .toBuffer()
      .toString('hex')
      .should.equal(buf.toString('hex'))
  })
})