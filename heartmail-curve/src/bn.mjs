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
    if (typeof this.bi !== 'bigint') {
      this.bi = BigInt(this.bi)
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

  toBuffer (opts = { size: undefined, endian: 'big', encoding: 'non-negative' }) {
    opts.endian = opts.endian ? opts.endian : 'big'
    opts.encoding = opts.encoding ? opts.encoding : 'non-negative'
    opts.size = opts.size ? Number.parseInt(opts.size) : undefined

    let bi = this.bi
    let neg = false

    if (bi < 0) {
      if (this.encoding === 'non-negative') {
        throw new Error('cannot encode negative number as non-negative')
      } else {
        bi = -1n * bi
        neg = true
        if (opts.encoding === 'twos-complement') {
          if (opts.size) {
            // 2^N = A + A'
            // A' = 2^N - A
            const twoPowN = BigInt('0x1' + '00'.repeat(opts.size))
            bi = twoPowN - bi
          } else {
            throw new Error('twos-complement encoding requires a fixed size')
          }
        }
      }
    } else if (opts.encoding === 'twos-complement') {
      if (opts.size) {
        const largestPositive = BigInt('0x7f' + 'ff'.repeat(opts.size - 1))
        if (bi > largestPositive) {
          throw new Error('number does not fit in requested size')
        }
      } else {
        throw new Error('twos-complement encoding requires a fixed size')
      }
    }

    const arr = []
    const base = 256n
    let i = 0
    while (bi > 0) {
      arr[i] = Number(bi % base)
      bi = bi / base
      i++
    }

    if (neg && opts.encoding === 'sign-magnitude' && opts.size === undefined) {
      if (arr[arr.length - 1] & 0x80) {
        arr.push(0x80)
      } else {
        arr[arr.length - 1] = arr[arr.length - 1] | 0x80
      }
    }

    let buf = Buffer.from(arr)

    if (opts.size) {
      if (opts.size > buf.length) {
        const newBuf = Buffer.alloc(opts.size)
        if (buf.length > 0) {
          newBuf.fill(buf)
        }
        newBuf.fill(0, buf.length, opts.size)
        buf = newBuf
      } else if (opts.size < buf.length) {
        throw new Error('number does not fit in requested size')
      }
    }

    if (neg && opts.encoding === 'sign-magnitude' && opts.size) {
      if (buf[buf.length - 1] & 0x80) {
        throw new Error('number does not fit in requested size')
      } else {
        buf[buf.length - 1] = buf[buf.length - 1] | 0x80
      }
    }

    if (opts.endian === 'big') {
      buf = buf.reverse()
    }
    return buf
  }

  toHex (opts) {
    return this.toBuffer(opts).toString('hex')
  }

  static fromBuffer (buf, opts = { endian: 'big', encoding: 'non-negative' }) {
    opts.endian = opts.endian ? opts.endian : 'big'
    opts.encoding = opts.encoding ? opts.encoding : 'non-negative'
    buf = opts.endian === 'big' ? buf : buf.reverse()

    if (opts.encoding === 'non-negative') {
      return this.fromString(buf.toString('hex'), 16)
    } else if (opts.encoding === 'sign-magnitude') {
      let neg = 1n
      if (buf[0] & 0x80) {
        buf = Buffer.from(buf)
        buf[0] = buf[0] & 0x7f
        neg = -1n
      }
      let bn = this.fromString(buf.toString('hex'), 16)
      bn = new Bn(neg * bn.bi)
      return bn
    } else if (opts.encoding === 'twos-complement') {
      // 2^N = A + A'
      // A = 2^N - A'
      const bn = this.fromString(buf.toString('hex'), 16)
      const largestPositive = BigInt('0x7f' + 'ff'.repeat(buf.length - 1))
      if (bn.bi > largestPositive) {
        const twoPowN = BigInt('0x1' + '00'.repeat(buf.length))
        bn.bi = twoPowN - bn.bi
        bn.bi = -1n * bn.bi
      }
      return bn
    } else {
      throw new Error('invalid encoding')
    }
  }
}
