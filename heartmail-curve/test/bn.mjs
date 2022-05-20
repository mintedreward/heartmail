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

  describe('#toBuffer', () => {
    it('should compute these known values', () => {
      new Bn(5).toBuffer().toString('hex').should.equal('05')
      new Bn(50).toBuffer().toString('hex').should.equal('32')
      new Bn(500).toBuffer().toString('hex').should.equal('01f4')
      new Bn(255).toBuffer().toString('hex').should.equal('ff')
      new Bn(Math.pow(2, 3 * 8) - 1).toBuffer().toString('hex').should.equal('ffffff')
      new Bn(Math.pow(2, 3 * 8)).toBuffer().toString('hex').should.equal('01000000')
    })

    it('should compute these known values', () => {
      const opts = { endian: 'little' }
      new Bn(5).toBuffer(opts).toString('hex').should.equal('05')
      new Bn(50).toBuffer(opts).toString('hex').should.equal('32')
      new Bn(500).toBuffer(opts).toString('hex').should.equal('f401')
      new Bn(255).toBuffer(opts).toString('hex').should.equal('ff')
      new Bn(Math.pow(2, 3 * 8) - 1).toBuffer(opts).toString('hex').should.equal('ffffff')
      new Bn(Math.pow(2, 3 * 8)).toBuffer(opts).toString('hex').should.equal('00000001')
    })

    it('should produce a fixed size byte buffer', () => {
      new Bn(5).toBuffer({ size: 2 }).toString('hex').should.equal('0005')
      new Bn(5).toBuffer({ size: 2, endian: 'little' }).toString('hex').should.equal('0500')
      new Bn(50000000).toBuffer({ size: 32, endian: 'little' }).toString('hex').should.equal('80f0fa0200000000000000000000000000000000000000000000000000000000')
      new Bn(50000000).toBuffer({ size: 32, endian: 'big' }).toString('hex').should.equal('0000000000000000000000000000000000000000000000000000000002faf080')
    })
  })
})
