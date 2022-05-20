import { Struct } from 'heartmail-lib'

const digitStr = '0123456789abcdefghijklmnopqrstuvwxyz'
const digitArr = digitStr.split('')
const digitMap = (() => {
  const digitMap = {}
  digitArr.forEach((digit, index) => {
    digitMap[digit] = BigInt(index)
  })
  return digitMap
})()

export default class Bn extends Struct {
  constructor (bi, base) {
    super({ bi: BigInt(bi) })
    if (base) {
      this.bi = this.fromString(bi, base)
    }
  }

  static fromBigInt (bi = BigInt(0)) {
    return this(bi)
  }

  static fromNumber (num = 0) {
    return new this(BigInt(num))
  }

  static fromHex (str) {
    return new this(BigInt(`0x${str}`))
  }

  static fromOct (str) {
    return new this(BigInt(`0o${str}`))
  }

  static fromBin (str) {
    return new this(BigInt(`0b${str}`))
  }

  static fromString (str, base = 10) {
    if (base === 10) {
      return new this(str)
    } else if (base === 2) {
      return this.fromBin(str)
    } else if (base === 8) {
      return this.fromOct(str)
    } else if (base === 16) {
      return this.fromHex(str)
    } else {
      return this.fromBase(str, base)
    }
  }

  static fromBase (str, base = 10) {
    if (!(base >= 2 && base <= 36)) {
      throw new Error('base must be from 2 to 36')
    }
    base = BigInt(base)
    let bi = 0n
    let exp = 1n
    const length = str.length
    for (let i = 0; i < length; i++) {
      const pos = length - 1 - i
      const digit = str[pos]
      const num = digitMap[digit]
      bi = bi + num * exp
      exp = exp * base
    }
    return new this(bi)
  }

  toString (base = 10) {
    return this.bi.toString(base)
  }

  toBuffer (opts = { size: undefined, endian: 'big' }) {
    const arr = []
    const base = 256n
    let i = 0
    let bi = this.bi
    while (bi > 0) {
      arr[i] = Number(bi % base)
      bi = bi / base
      i++
    }
    return Buffer.from(opts.endian === 'big' ? arr.reverse() : arr)
  }
}
