/* global describe,it */
import { Bn } from '../src/bn.mjs'
import should from 'should'
import { Br } from '../src/br.mjs'
import { Bw } from '../src/bw.mjs'
import { VarInt } from '../src/var-int.mjs'

describe('VarInt', function () {
  it('should make a new varInt', function () {
    const buf = Buffer.from('00', 'hex')
    let varInt = new VarInt(buf)
    should.exist(varInt)
    varInt.buf.toString('hex').should.equal('00')
    varInt = new VarInt(buf)
    should.exist(varInt)
    varInt.buf.toString('hex').should.equal('00')

    // varInts can have multiple buffer representations
    VarInt.fromNumber(0)
      .toNumber()
      .should.equal(new VarInt(Buffer.from([0xfd, 0, 0])).toNumber())
    VarInt.fromNumber(0)
      .toBuffer()
      .toString('hex')
      .should.not.equal(
        new VarInt()
          .fromBuffer(Buffer.from([0xfd, 0, 0]))
          .toBuffer()
          .toString('hex')
      )
  })

  describe('#fromObject', function () {
    it('should set a buffer', function () {
      const buf = Buffer.from('00', 'hex')
      const varInt = new VarInt().fromObject({ buf: buf })
      varInt.buf.toString('hex').should.equal('00')
      varInt.fromObject({})
      varInt.buf.toString('hex').should.equal('00')
    })
  })

  describe('#fromJSON', function () {
    it('should set a buffer', function () {
      const buf = new Bw().writeVarIntNum(5).toBuffer()
      const varInt = new VarInt().fromJSON(buf.toString('hex'))
      varInt.toNumber().should.equal(5)
    })
  })

  describe('#toJSON', function () {
    it('should return a buffer', function () {
      const buf = new Bw().writeVarIntNum(5).toBuffer()
      const varInt = new VarInt().fromJSON(buf.toString('hex'))
      varInt.toJSON().should.equal('05')
    })
  })

  describe('#fromBuffer', function () {
    it('should set a buffer', function () {
      const buf = new Bw().writeVarIntNum(5).toBuffer()
      const varInt = new VarInt().fromBuffer(buf)
      varInt.toNumber().should.equal(5)
    })
  })

  describe('#fromBr', function () {
    it('should set a buffer reader', function () {
      const buf = new Bw().writeVarIntNum(5).toBuffer()
      const br = new Br(buf)
      const varInt = new VarInt().fromBr(br)
      varInt.toNumber().should.equal(5)
    })
  })

  describe('#fromBn', function () {
    it('should set a number', function () {
      const varInt = new VarInt().fromBn(new Bn(5))
      varInt.toNumber().should.equal(5)
    })
  })

  describe('@fromBn', function () {
    it('should set a number', function () {
      const varInt = VarInt.fromBn(new Bn(5))
      varInt.toNumber().should.equal(5)
    })
  })

  describe('#fromNumber', function () {
    it('should set a number', function () {
      const varInt = new VarInt().fromNumber(5)
      varInt.toNumber().should.equal(5)
    })
  })

  describe('@fromNumber', function () {
    it('should set a number', function () {
      const varInt = VarInt.fromNumber(5)
      varInt.toNumber().should.equal(5)
    })
  })

  describe('#toBuffer', function () {
    it('should return a buffer', function () {
      const buf = new Bw().writeVarIntNum(5).toBuffer()
      const varInt = new VarInt(buf)
      varInt
        .toBuffer()
        .toString('hex')
        .should.equal(buf.toString('hex'))
    })
  })

  describe('#toBn', function () {
    it('should return a buffer', function () {
      const varInt = VarInt.fromNumber(5)
      varInt
        .toBn()
        .toString()
        .should.equal(new Bn(5).toString())
    })
  })

  describe('#toNumber', function () {
    it('should return a buffer', function () {
      const varInt = VarInt.fromNumber(5)
      varInt.toNumber().should.equal(5)
    })
  })
})
