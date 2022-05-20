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

    it('should produce a sign-magnitude buffer', () => {
      const opts = { encoding: 'sign-magnitude' }
      new Bn(5).toBuffer(opts).toString('hex').should.equal('05')
      new Bn(-5).toBuffer(opts).toString('hex').should.equal('85')
      new Bn(0x80).toBuffer(opts).toString('hex').should.equal('80')
      new Bn(-0x80).toBuffer(opts).toString('hex').should.equal('8080')

      opts.size = 3
      new Bn(-0x80).toBuffer(opts).toString('hex').should.equal('800080')
    })

    it('should produce a twos-complement buffer', () => {
      const opts = { encoding: 'twos-complement', size: 1 }
      new Bn(5).toBuffer(opts).toString('hex').should.equal('05')
      new Bn(-1).toBuffer(opts).toString('hex').should.equal('ff')
      new Bn(-2).toBuffer(opts).toString('hex').should.equal('fe')
      new Bn(0).toBuffer(opts).toString('hex').should.equal('00')
      new Bn(-128).toBuffer(opts).toString('hex').should.equal('80')
      new Bn(127).toBuffer(opts).toString('hex').should.equal('7f')

      let m
      m = ''
      try {
        new Bn(256).toBuffer(opts).toString('hex').should.equal('')
      } catch (err) {
        m = err.message
      }
      m.should.equal('number does not fit in requested size')

      m = ''
      try {
        new Bn(128).toBuffer(opts).toString('hex').should.equal('')
      } catch (err) {
        m = err.message
      }
      m.should.equal('number does not fit in requested size')

      m = ''
      try {
        new Bn(10000).toBuffer(opts).toString('hex').should.equal('')
      } catch (err) {
        m = err.message
      }
      m.should.equal('number does not fit in requested size')

      opts.size = 3
      new Bn(-1).toBuffer(opts).toString('hex').should.equal('ffffff')
      new Bn(-2).toBuffer(opts).toString('hex').should.equal('fffffe')
    })
  })

  describe('@fromBuffer', () => {
    it('should convert these known values', () => {
      Bn.fromBuffer(Buffer.from('ff', 'hex')).toString().should.equal('255')
      Bn.fromBuffer(Buffer.from('ff', 'hex'), { encoding: 'sign-magnitude'}).toString().should.equal('-127')
      Bn.fromBuffer(Buffer.from('ff', 'hex'), { encoding: 'twos-complement'}).toString().should.equal('-1')

      Bn.fromBuffer(Buffer.from('ff00', 'hex'), { endian: 'little' }).toString().should.equal('255')
      Bn.fromBuffer(Buffer.from('ff00', 'hex'), { endian: 'little', encoding: 'sign-magnitude'}).toString().should.equal('255')
      Bn.fromBuffer(Buffer.from('ff00', 'hex'), { endian: 'little', encoding: 'twos-complement'}).toString().should.equal('255')
      Bn.fromBuffer(Buffer.from('ffff', 'hex'), { endian: 'little', encoding: 'twos-complement'}).toString().should.equal('-1')
      Bn.fromBuffer(Buffer.from('ffff', 'hex'), { endian: 'little', encoding: 'sign-magnitude'}).toString().should.equal('-32767')
    })
  })
})
