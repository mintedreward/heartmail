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
      new Bn(0x80).toBuffer(opts).toString('hex').should.equal('0080')
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
      m.should.equal('cannot produce buffer of desired size because number is too big')

      m = ''
      try {
        new Bn(128).toBuffer(opts).toString('hex').should.equal('')
      } catch (err) {
        m = err.message
      }
      m.should.equal('cannot produce buffer of desired size because number is too big')

      m = ''
      try {
        new Bn(10000).toBuffer(opts).toString('hex').should.equal('')
      } catch (err) {
        m = err.message
      }
      m.should.equal('cannot produce buffer of desired size because number is too big')

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

  describe('#fromBits', function () {
    it('should convert these known bits to Bns', function () {
      new Bn()
        .fromBits(0x01003456)
        .toHex()
        .should.equal('')
      new Bn()
        .fromBits(0x02003456)
        .toHex()
        .should.equal('34')
      new Bn()
        .fromBits(0x03003456)
        .toHex()
        .should.equal('3456')
      new Bn()
        .fromBits(0x04003456)
        .toHex()
        .should.equal('345600')
      new Bn()
        .fromBits(0x05003456)
        .toHex()
        .should.equal('34560000')
      new Bn()
        .fromBits(0x05f03456)
        .lt(0)
        .should.equal(true) // sign bit set
      ;(function () {
        new Bn().fromBits(0x05f03456, { strict: true }) // sign bit set
      }.should.throw('negative bit set'))
      new Bn()
        .fromBits(0x04923456)
        .lt(0)
        .should.equal(true)
    })
  })

  describe('#toBits', function () {
    it('should convert these known Bns to bits', function () {
      new Bn()
        .fromHex('00')
        .toBits()
        .should.equal(0x00000000)
      new Bn()
        .fromHex('01')
        .toBits()
        .should.equal(0x01000001)
      new Bn()
        .fromHex('0101')
        .toBits()
        .should.equal(0x02000101)
      new Bn()
        .fromHex('010101')
        .toBits()
        .should.equal(0x03010101)
      new Bn()
        .fromHex('01010101')
        .toBits()
        .should.equal(0x04010101)
      new Bn()
        .fromHex('0101010101')
        .toBits()
        .should.equal(0x05010101)
      new Bn()
        .fromHex('010101010101')
        .toBits()
        .should.equal(0x06010101)
      new Bn()
        .fromNumber(-1)
        .toBits()
        .should.equal(0x01800001)
    })
  })

  describe('#toSm', function () {
    it('should convert to Sm', function () {
      let buf
      buf = new Bn().toSm()
      buf.toString('hex').should.equal('')
      buf = new Bn(5).toSm()
      buf.toString('hex').should.equal('05')
      buf = new Bn(-5).toSm()
      buf.toString('hex').should.equal('85')
      buf = new Bn(128).toSm()
      buf.toString('hex').should.equal('0080')
      buf = new Bn(-128).toSm()
      buf.toString('hex').should.equal('8080')
      buf = new Bn(127).toSm()
      buf.toString('hex').should.equal('7f')
      buf = new Bn(-127).toSm()
      buf.toString('hex').should.equal('ff')
      buf = new Bn(128).toSm({ endian: 'little' })
      buf.toString('hex').should.equal('8000')
      buf = new Bn(-128).toSm({ endian: 'little' })
      buf.toString('hex').should.equal('8080')
      buf = new Bn(-128).toSm({ endian: 'little', size: 2 })
      buf.toString('hex').should.equal('8080')
      buf = new Bn(-42).toSm({ endian: 'little', size: 1 })
      buf.toString('hex').should.equal('aa')
      buf = new Bn(0).toSm({ endian: 'little', size: 1 })
      buf.toString('hex').should.equal('00')
      buf = new Bn(-128).toSm({ endian: 'little', size: 3 })
      buf.toString('hex').should.equal('800080')
      buf = new Bn(-128).toSm({ endian: 'little', size: 4 })
      buf.toString('hex').should.equal('80000080')
      buf = new Bn(-128).toSm({ endian: 'big', size: 4 })
      buf.toString('hex').should.equal('80000080')
      ;(() => {
        buf = new Bn(5000).toSm({ endian: 'big', size: 1 })
        buf.toString('hex')
      }).should.throw('cannot produce buffer of desired size because number is too big')
    })
  })

  describe('#fromSm', function () {
    it('should convert from Sm', function () {
      let buf
      buf = Buffer.from([0])
      new Bn()
        .fromSm(buf)
        .cmp(0)
        .should.equal(0)
      buf = Buffer.from('05', 'hex')
      new Bn()
        .fromSm(buf)
        .cmp(5)
        .should.equal(0)
      buf = Buffer.from('85', 'hex')
      new Bn()
        .fromSm(buf)
        .cmp(-5)
        .should.equal(0)
      buf = Buffer.from('0080', 'hex')
      new Bn()
        .fromSm(buf)
        .cmp(128)
        .should.equal(0)
      buf = Buffer.from('8080', 'hex')
      new Bn()
        .fromSm(buf)
        .cmp(-128)
        .should.equal(0)
      buf = Buffer.from('8000', 'hex')
      new Bn()
        .fromSm(buf, { endian: 'little' })
        .cmp(128)
        .should.equal(0)
      buf = Buffer.from('8080', 'hex')
      new Bn()
        .fromSm(buf, { endian: 'little' })
        .cmp(-128)
        .should.equal(0)
      buf = Buffer.from('0080', 'hex') // negative zero
      new Bn()
        .fromSm(buf, { endian: 'little' })
        .cmp(0)
        .should.equal(0)
    })
  })
})
