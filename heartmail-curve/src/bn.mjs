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
  constructor (n = BigInt(0), base) {
    super({ n })
    if (base) {
      this.fromString(n, base)
    }
    if (this.n !== undefined && typeof this.n !== 'bigint') {
      this.n = BigInt(this.n)
    }
  }

  fromBigInt (n = BigInt(0)) {
    this.n = n
    return this
  }

  static fromBigInt (n = BigInt(0)) {
    return new this().fromBigInt(n)
  }

  fromNumber (num = 0) {
    this.n = BigInt(num)
    return this
  }

  static fromNumber (num = 0) {
    return new this().fromNumber(num)
  }

  toNumber () {
    return Number(this.n)
  }

  fromHex (str) {
    this.n = str ? BigInt(`0x${str}`) : 0n
    return this
  }

  static fromHex (str) {
    return new this().fromHex(str)
  }

  toHex (opts) {
    return this.toBuffer(opts).toString('hex')
  }

  fromOct (str) {
    this.n = str ? BigInt(`0o${str}`) : 0n
    return this
  }

  static fromOct (str) {
    return new this().fromOct(str)
  }

  toOct () {
    return this.toString(8)
  }

  fromBin (str) {
    this.n = str? BigInt(`0b${str}`) : 0n
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
    let n = 0n
    let exp = 1n
    const length = str.length
    for (let i = 0; i < length; i++) {
      const pos = length - 1 - i
      const digit = str[pos]
      const num = digitMap[digit]
      n = n + num * exp
      exp = exp * base
    }
    this.n = n
    return this
  }

  static fromBase (str, base = 10) {
    return new this().fromBase(str, base)
  }

  toBase (base = 10) {
    return this.n.toString(base)
  }

  fromString (str, base = 10) {
    if (base === 10) {
      this.n = BigInt(str)
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
    return this.n.toString(base)
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
      bn = new Bn(neg * bn.n)
      this.n = bn.n
      return this
    } else if (opts.encoding === 'twos-complement') {
      // 2^N = A + A'
      // A = 2^N - A'
      const bn = this.constructor.fromString(buf.toString('hex'), 16)
      const largestPositive = BigInt('0x7f' + 'ff'.repeat(buf.length - 1))
      if (bn.n > largestPositive) {
        const twoPowN = BigInt('0x1' + '00'.repeat(buf.length))
        bn.n = twoPowN - bn.n
        bn.n = -1n * bn.n
      }
      this.n = bn.n
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

    let n = this.n
    let neg = false
    if (n < 0n) {
      if (opts.encoding === 'non-negative') {
        throw new Error('cannot encode negative number as non-negative')
      } else {
        n = -1n * n
        neg = true
        if (opts.encoding === 'twos-complement') {
          if (opts.size) {
            // 2^N = A + A'
            // A' = 2^N - A
            const twoPowN = BigInt('0x1' + '00'.repeat(opts.size))
            n = twoPowN - n
          } else {
            throw new Error('twos-complement encoding requires a fixed size')
          }
        }
      }
    } else if (opts.encoding === 'twos-complement') {
      if (opts.size) {
        const largestPositive = BigInt('0x7f' + 'ff'.repeat(opts.size - 1))
        if (n > largestPositive) {
          throw new Error('cannot produce buffer of desired size because number is too big')
        }
      } else {
        throw new Error('twos-complement encoding requires a fixed size')
      }
    }

    const arr = []
    const base = 256n
    let i = 0
    while (n > 0) {
      arr[i] = Number(n % base)
      n = n / base
      i++
    }

    if (opts.encoding === 'sign-magnitude' && opts.size === undefined) {
      if (arr[arr.length - 1] & 0x80) {
        if (neg) {
          arr.push(0x80)
        } else {
          arr.push(0x00)
        }
      } else {
        if (neg) {
          arr[arr.length - 1] = arr[arr.length - 1] | 0x80
        }
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
        throw new Error('cannot produce buffer of desired size because number is too big')
      }
    }

    if (neg && opts.encoding === 'sign-magnitude' && opts.size) {
      if (buf[buf.length - 1] & 0x80) {
        throw new Error('cannot produce buffer of desired size because number is too big')
      } else {
        buf[buf.length - 1] = buf[buf.length - 1] | 0x80
      }
    }

    if (opts.endian === 'big') {
      buf = buf.reverse()
    }
    return buf
  }

  fromFastBuffer (...args) {
    return this.fromBuffer(...args)
  }

  static fromFastBuffer (...args) {
    return this.fromBuffer(...args)
  }

  toFastBuffer (...args) {
    return this.toBuffer(...args)
  }

  fromSm (buf, opts = { endian: 'big' }) {
    opts = {
      endian: opts.endian || 'big',
      encoding: 'sign-magnitude'
    }
    return this.fromBuffer(buf, opts)
  }

  toSm (opts = { size: undefined, endian: 'big' }) {
    opts = {
      endian: opts.endian || 'big',
      size: opts.size,
      encoding: 'sign-magnitude'
    }

    return this.toBuffer(opts)
  }

  /**
   * Produce a Bn from the "bits" value in a blockheader. Analagous to Bitcoin
   * Core's uint256 SetCompact method. bits is assumed to be UInt32.
   */
  fromBits (bits, opts = { strict: false }) {
  // To performed bitwise operations in javascript, we need to convert to a
  // signed 32 bit value.
  let buf = Buffer.alloc(4)
  buf.writeUInt32BE(bits, 0)
  bits = buf.readInt32BE(0)
  if (opts.strict && bits & 0x00800000) {
    throw new Error('negative bit set')
  }
  const nsize = bits >> 24
  const nword = bits & 0x007fffff
  buf = Buffer.alloc(4)
  buf.writeInt32BE(nword)
  if (nsize <= 3) {
    buf = buf.slice(1, nsize + 1)
  } else {
    const fill = Buffer.alloc(nsize - 3)
    fill.fill(0)
    buf = Buffer.concat([buf, fill])
  }
  this.fromBuffer(buf)
  if (bits & 0x00800000) {
    this.n = 0n - this.n
  }
  return this
  }

  /**
   * Convert Bn to the "bits" value in a blockheader. Analagous to Bitcoin
   * Core's uint256 GetCompact method. bits is a UInt32.
   */
  toBits () {
    let buf
    if (this.lt(0)) {
      buf = this.neg().toBuffer()
    } else {
      buf = this.toBuffer()
    }
    let nsize = buf.length
    let nword
    if (nsize > 3) {
      nword = Buffer.concat([Buffer.from([0]), buf.slice(0, 3)]).readUInt32BE(0)
    } else if (nsize <= 3) {
      const blank = Buffer.alloc(3 - nsize + 1)
      blank.fill(0)
      nword = Buffer.concat([blank, buf.slice(0, nsize)]).readUInt32BE(0)
    }
    if (nword & 0x00800000) {
      // The most significant bit denotes sign. Do not want unless number is
      // actually negative.
      nword >>= 8
      nsize++
    }
    if (this.lt(0)) {
      nword |= 0x00800000
    }
    const bits = (nsize << 24) | nword
    // convert bits to UInt32 before returning
    buf = Buffer.alloc(4)
    buf.writeInt32BE(bits, 0)
    return buf.readUInt32BE(0)
  }

  // This is analogous to the constructor for CScriptNum in bitcoind. Many ops
  // in bitcoind's script interpreter use CScriptNum, which is not really a
  // proper bignum. Instead, an error is thrown if trying to input a number
  // bigger than 4 bytes. We copy that behavior here. There is one exception -
  // in CHECKLOCKTIMEVERIFY, the numbers are allowed to be up to 5 bytes long.
  // We allow for setting that variable here for use in CHECKLOCKTIMEVERIFY.
  fromScriptNumBuffer (
    buf,
    fRequireMinimal,
    nMaxNumSize
  ) {
    if (nMaxNumSize === undefined) {
      nMaxNumSize = 4
    }
    if (buf.length > nMaxNumSize) {
      throw new Error('script number overflow')
    }
    if (fRequireMinimal && buf.length > 0) {
      // Check that the number is encoded with the minimum possible
      // number of bytes.
      //
      // If the most-significant-byte - excluding the sign bit - is zero
      // then we're not minimal. Note how this test also rejects the
      // negative-zero encoding, 0x80.
      if ((buf[buf.length - 1] & 0x7f) === 0) {
        // One exception: if there's more than one byte and the most
        // significant bit of the second-most-significant-byte is set
        // it would conflict with the sign bit. An example of this case
        // is +-255, which encode to 0xff00 and 0xff80 respectively.
        // (big-endian).
        if (buf.length <= 1 || (buf[buf.length - 2] & 0x80) === 0) {
          throw new Error('non-minimally encoded script number')
        }
      }
    }
    return this.fromSm(buf, { endian: 'little' })
  }

  // The corollary to the above, with the notable exception that we do not throw
  // an error if the output is larger than four bytes. (Which can happen if
  // performing a numerical operation that results in an overflow to more than 4
  // bytes).
  toScriptNumBuffer () {
    return this.toSm({ endian: 'little' })
  }

  neg () {
    const n = -1n * this.n
    return new this.constructor(n)
  }

  add (bn) {
    bn = new this.constructor(bn)
    return new this.constructor(this.n + bn.n)
  }

  sub (bn) {
    bn = new this.constructor(bn)
    return new this.constructor(this.n - bn.n)
  }

  mul (bn) {
    bn = new this.constructor(bn)
    return new this.constructor(this.n * bn.n)
  }

  mod (bn) {
    bn = new this.constructor(bn)
    return new this.constructor(this.n % bn.n)
  }

  invm (bn) {
    bn = new this.constructor(bn)
    throw new Error('not implemented yet')
  }

  div (bn) {
    bn = new this.constructor(bn)
    return new this.constructor(this.n / bn.n)
  }

  ushln () {
    throw new Error('not implemented yet')
  }

  ushrn () {
    throw new Error('not implemented yet')
  }

  cmp (bn) {
    bn = new this.constructor(bn)
    if (this.n === bn.n) {
      return 0
    } else if (this.n < bn.n) {
      return -1
    } else {
      return 1
    }
  }

  eq (bn) {
    bn = new this.constructor(bn)
    return this.n === bn.n
  }

  neq (bn) {
    bn = new this.constructor(bn)
    return this.n !== bn.n
  }

  gt (bn) {
    bn = new this.constructor(bn)
    return this.n > bn.n
  }

  geq (bn) {
    bn = new this.constructor(bn)
    return this.n >= bn.n
  }

  lt (bn) {
    bn = new this.constructor(bn)
    return this.n < bn.n
  }

  leq (bn) {
    return this.n <= bn.n
  }
}
