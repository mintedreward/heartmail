/* global describe,it */
import Bn from '../src/bn.mjs'
import should from 'should'

describe('Bn', () => {
  it('should exist', () => {
    should.exist(Bn)
  })

  describe('@fromBase', function () {
    it('should be the same as default methods in these cases', () => {
      const bi = 2340993834343434n
      let bn

      bn = Bn.fromBase(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })

    it('should be the same as default methods in these cases', () => {
      const bi = 23409938343434342340993834343434n
      let bn

      bn = Bn.fromBase(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })

    it('should be the same as default methods in these cases', () => {
      const bi = 2340993834343434234099383434343423409938343434342340993834343434n
      let bn

      bn = Bn.fromBase(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })

    it('should be the same as default methods in these cases', () => {
      const bi = 0n
      let bn

      bn = Bn.fromBase(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })

    it('should be the same as default methods in these cases', () => {
      const bi = 1n
      let bn

      bn = Bn.fromBase(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromBase(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })
  })

  describe('@fromString', function () {
    it('should be the same as default methods in these cases', () => {
      const bi = 2340993834343434n
      let bn

      bn = Bn.fromString(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })

    it('should be the same as default methods in these cases', () => {
      const bi = 23409938343434342340993834343434n
      let bn

      bn = Bn.fromString(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })

    it('should be the same as default methods in these cases', () => {
      const bi = 2340993834343434234099383434343423409938343434342340993834343434n
      let bn

      bn = Bn.fromString(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })

    it('should be the same as default methods in these cases', () => {
      const bi = 0n
      let bn

      bn = Bn.fromString(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })

    it('should be the same as default methods in these cases', () => {
      const bi = 1n
      let bn

      bn = Bn.fromString(bi.toString(10), 10)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(8), 8)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(16), 16)
      bn.toString().should.equal(bi.toString())
      bn = Bn.fromString(bi.toString(2), 2)
      bn.toString().should.equal(bi.toString())
    })
  })
})
