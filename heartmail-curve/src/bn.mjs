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
  constructor (bn, base) {
    super({ bn })
    if (base) {
      this.fromString(bn, base)
    }
    if (this.bn !== undefined && typeof this.bn !== 'bigint') {
      this.bn = BigInt(this.bn)
    }
  }

  fromBigInt (bn = BigInt(0)) {
    this.bn = bn
    return this
  }

  static fromBigInt (bn = BigInt(0)) {
    return new this().fromBigInt(bn)
  }

  fromNumber (num = 0) {
    this.bn = BigInt(num)
    return this
  }

  static fromNumber (num = 0) {
    return new this().fromNumber(num)
  }

  toNumber () {
    return Number(this.bn)
  }

  fromHex (str) {
    this.bn = BigInt(`0x${str}`)
    return this
  }

  static fromHex (str) {
    return new this().fromHex(str)
  }

  toHex (opts) {
    return this.toBuffer(opts).toString('hex')
  }

  fromOct (str) {
    this.bn = BigInt(`0o${str}`)
    return this
  }

  static fromOct (str) {
    return new this().fromOct(str)
  }

  toOct () {
    return this.toString(8)
  }

  fromBin (str) {
    this.bn = BigInt(`0b${str}`)
    return this
  }

  static fromBin (str) {
    return new this().fromBin(str)
  }

  toBin () {
    return this.toString(2)
  }

  fromBase (str, base = 10) {
    if (!(base >= 2 && base <= 36)) {
      throw new Error('base must be from 2 to 36')
    }
    base = BigInt(base)
    let bn = 0n
    let exp = 1n
    const length = str.length
    for (let i = 0; i < length; i++) {
      const pos = length - 1 - i
      const digit = str[pos]
      const num = digitMap[digit]
      bn = bn + num * exp
      exp = exp * base
    }
    this.bn = bn
    return this
  }

  static fromBase (str, base = 10) {
    return new this().fromBase(str, base)
  }

  toBase (base = 10) {
    return this.bn.toString(base)
  }

  fromString (str, base = 10) {
    if (base === 10) {
      this.bn = BigInt(str)
      return this
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

  static fromString (str, base = 10) {
    return new this().fromString(str, base)
  }

  toString (base = 10) {
    return this.bn.toString(base)
  }

  fromJSON (json) {
    return this.fromString(json)
  }

  static fromJSON (json) {
    return new this().fromJSON(json)
  }

  toJSON () {
    return this.toString()
  }

  fromBuffer (buf, opts = { endian: 'big', encoding: 'non-negative' }) {
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
      let bn = this.constructor.fromString(buf.toString('hex'), 16)
      bn = new Bn(neg * bn.bn)
      this.bn = bn
      return this
    } else if (opts.encoding === 'twos-complement') {
      // 2^N = A + A'
      // A = 2^N - A'
      const bn = this.constructor.fromString(buf.toString('hex'), 16)
      const largestPositive = BigInt('0x7f' + 'ff'.repeat(buf.length - 1))
      if (bn.bn > largestPositive) {
        const twoPowN = BigInt('0x1' + '00'.repeat(buf.length))
        bn.bn = twoPowN - bn.bn
        bn.bn = -1n * bn.bn
      }
      this.bn = bn
      return this
    } else {
      throw new Error('invalid encoding')
    }
  }

  static fromBuffer (buf, opts) {
    return new this().fromBuffer(buf, opts)
  }

  toBuffer (opts = { size: undefined, endian: 'big', encoding: 'non-negative' }) {
    opts.endian = opts.endian ? opts.endian : 'big'
    opts.encoding = opts.encoding ? opts.encoding : 'non-negative'
    opts.size = opts.size ? Number.parseInt(opts.size) : undefined

    let bn = this.bn
    let neg = false

    if (bn < 0) {
      if (this.encoding === 'non-negative') {
        throw new Error('cannot encode negative number as non-negative')
      } else {
        bn = -1n * bn
        neg = true
        if (opts.encoding === 'twos-complement') {
          if (opts.size) {
            // 2^N = A + A'
            // A' = 2^N - A
            const twoPowN = BigInt('0x1' + '00'.repeat(opts.size))
            bn = twoPowN - bn
          } else {
            throw new Error('twos-complement encoding requires a fixed size')
          }
        }
      }
    } else if (opts.encoding === 'twos-complement') {
      if (opts.size) {
        const largestPositive = BigInt('0x7f' + 'ff'.repeat(opts.size - 1))
        if (bn > largestPositive) {
          throw new Error('number does not fit in requested size')
        }
      } else {
        throw new Error('twos-complement encoding requires a fixed size')
      }
    }

    const arr = []
    const base = 256n
    let i = 0
    while (bn > 0) {
      arr[i] = Number(bn % base)
      bn = bn / base
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
}
