/**
 * Bip32: HD Wallets
 * =================
 *
 * Bip32 is hierarchical deterministic wallets. The standard way to use this is:
 * const bip32 = new Bip32().fromRandom()
 * const bip32 = new Bip32().fromSeed(buf)
 * const bip32 = new Bip32().fromString(string)
 * const xprv = bip32.toString()
 * const xpub = bip32.toPublic().toString()
 *
 * This code was originally copied from here:
 *
 * https://github.com/sarchar/brainwallet.github.com
 *
 * It has faced mostly cosmetic alterations since it was copied.
 */
'use strict'

import { Bn } from './bn.mjs'
import { Bw } from './bw.mjs'
import { Base58Check } from './base-58-check.mjs'
import { Constants } from './constants.mjs'
import { Hash } from './hash.mjs'
import { Point } from './point.mjs'
import { PrivKey as PrivKeyClass } from './priv-key.mjs'
import { PubKey } from './pub-key.mjs'
import { Random } from './random.mjs'
import { Struct } from './struct.mjs'

class Bip32 extends Struct {
  constructor (
    versionBytesNum,
    depth,
    parentFingerPrint,
    childIndex,
    chainCode,
    privKey,
    pubKey,
    constants = null,
    PrivKey = PrivKeyClass
  ) {
    super({
      versionBytesNum,
      depth,
      parentFingerPrint,
      childIndex,
      chainCode,
      privKey,
      pubKey
    })
    constants = constants || Constants.Default.Bip32
    this.Constants = constants
    this.PrivKey = PrivKey
  }

  fromRandom () {
    this.versionBytesNum = this.Constants.privKey
    this.depth = 0x00
    this.parentFingerPrint = Buffer.from([0, 0, 0, 0])
    this.childIndex = 0
    this.chainCode = Random.getRandomBuffer(32)
    this.privKey = new this.PrivKey().fromRandom()
    this.pubKey = new PubKey().fromPrivKey(this.privKey)
    return this
  }

  static fromRandom () {
    return new this().fromRandom()
  }

  fromString (str) {
    return this.fromBuffer(Base58Check.decode(str))
  }

  fromSeed (bytes) {
    if (!Buffer.isBuffer(bytes)) {
      throw new Error('bytes must be a buffer')
    }
    if (bytes.length < 128 / 8) {
      throw new Error('Need more than 128 bits of entropy')
    }
    if (bytes.length > 512 / 8) {
      throw new Error('More than 512 bits of entropy is nonstandard')
    }
    const hash = Hash.sha512Hmac(bytes, Buffer.from('Bitcoin seed'))

    this.depth = 0x00
    this.parentFingerPrint = Buffer.from([0, 0, 0, 0])
    this.childIndex = 0
    this.chainCode = hash.slice(32, 64)
    this.versionBytesNum = this.Constants.privKey
    this.privKey = new this.PrivKey().fromBn(Bn().fromBuffer(hash.slice(0, 32)))
    this.pubKey = new PubKey().fromPrivKey(this.privKey)

    return this
  }

  static fromSeed (bytes) {
    return new this().fromSeed(bytes)
  }

  fromBuffer (buf) {
    // Both pub and private extended keys are 78 buf
    if (buf.length !== 78) {
      throw new Error('incorrect bip32 data length')
    }

    this.versionBytesNum = buf.slice(0, 4).readUInt32BE(0)
    this.depth = buf.slice(4, 5).readUInt8(0)
    this.parentFingerPrint = buf.slice(5, 9)
    this.childIndex = buf.slice(9, 13).readUInt32BE(0)
    this.chainCode = buf.slice(13, 45)
    const keyBytes = buf.slice(45, 78)

    const isPrivate = this.versionBytesNum === this.Constants.privKey
    const isPublic = this.versionBytesNum === this.Constants.pubKey

    if (isPrivate && keyBytes[0] === 0) {
      this.privKey = new this.PrivKey().fromBn(
        Bn().fromBuffer(keyBytes.slice(1, 33))
      )
      this.pubKey = new PubKey().fromPrivKey(this.privKey)
    } else if (isPublic && (keyBytes[0] === 0x02 || keyBytes[0] === 0x03)) {
      this.pubKey = new PubKey().fromDer(keyBytes)
    } else {
      throw new Error('Invalid key')
    }

    return this
  }

  /**
   * This is a faster version of .fromBuffer that reads in the output from
   * .toFastBuffer rather than from .toBuffer. .toFastBuffer outputs almost the
   * same thing as .toBuffer, except the public key is uncompressed. That makes
   * it larger, but also means that point multiplication doesn't have to be
   * used to derive the y value. So reading it in is faster. The only thing we
   * have to do is explicitely set the "compressed" value of public key to true
   * after reading it in. That is because although .toFastBuffer and
   * .fromFastBuffer transmit the public key in uncompressed form, we want it
   * to be set to compressed when stored in memory.
   */
  fromFastBuffer (buf) {
    if (buf.length === 0) {
      return this
    }
    if (buf.length !== 78 && buf.length !== 78 + 33) {
      throw new Error('incorrect bip32 fastBuffer data length: ' + buf.length)
    }

    this.versionBytesNum = buf.slice(0, 4).readUInt32BE(0)
    this.depth = buf.slice(4, 5).readUInt8(0)
    this.parentFingerPrint = buf.slice(5, 9)
    this.childIndex = buf.slice(9, 13).readUInt32BE(0)
    this.chainCode = buf.slice(13, 45)

    const keyBytes = buf.slice(45, buf.length)

    const isPrivate = this.versionBytesNum === this.Constants.privKey
    const isPublic = this.versionBytesNum === this.Constants.pubKey

    if (isPrivate && keyBytes[0] === 0 && buf.length === 78) {
      this.privKey = new this.PrivKey().fromBn(
        Bn().fromBuffer(keyBytes.slice(1, 33))
      )
      this.pubKey = new PubKey().fromPrivKey(this.privKey)
    } else if (isPublic && buf.length === 78 + 33) {
      this.pubKey = new PubKey().fromFastBuffer(keyBytes)
      this.pubKey.compressed = true
    } else {
      throw new Error('Invalid key')
    }

    return this
  }

  derive (path) {
    const e = path.split('/')

    if (path === 'm') {
      return this
    }

    let bip32 = this
    for (const i in e) {
      const c = e[i]

      if (i === '0') {
        if (c !== 'm') throw new Error('invalid path')
        continue
      }

      if (
        parseInt(c.replace("'", ''), 10).toString() !== c.replace("'", '')
      ) {
        throw new Error('invalid path')
      }

      const usePrivate = c.length > 1 && c[c.length - 1] === "'"
      let childIndex =
        parseInt(usePrivate ? c.slice(0, c.length - 1) : c, 10) & 0x7fffffff

      if (usePrivate) {
        childIndex += 0x80000000
      }

      bip32 = bip32.deriveChild(childIndex)
    }

    return bip32
  }

  deriveChild (i) {
    if (typeof i !== 'number') {
      throw new Error('i must be a number')
    }

    let ib = []
    ib.push((i >> 24) & 0xff)
    ib.push((i >> 16) & 0xff)
    ib.push((i >> 8) & 0xff)
    ib.push(i & 0xff)
    ib = Buffer.from(ib)

    const usePrivate = (i & 0x80000000) !== 0

    const isPrivate = this.versionBytesNum === this.Constants.privKey

    if (usePrivate && (!this.privKey || !isPrivate)) {
      throw new Error('Cannot do private key derivation without private key')
    }

    let ret = null
    if (this.privKey) {
      let data = null

      if (usePrivate) {
        data = Buffer.concat([
          Buffer.from([0]),
          this.privKey.bn.toBuffer({ size: 32 }),
          ib
        ])
      } else {
        data = Buffer.concat([this.pubKey.toBuffer({ size: 32 }), ib])
      }

      const hash = Hash.sha512Hmac(data, this.chainCode)
      const il = Bn().fromBuffer(hash.slice(0, 32), { size: 32 })
      const ir = hash.slice(32, 64)

      // ki = IL + kpar (mod n).
      const k = il.add(this.privKey.bn).mod(Point.getN())

      ret = new this.constructor()
      ret.chainCode = ir

      ret.privKey = new this.PrivKey().fromBn(k)
      ret.pubKey = new PubKey().fromPrivKey(ret.privKey)
    } else {
      const data = Buffer.concat([this.pubKey.toBuffer(), ib])
      const hash = Hash.sha512Hmac(data, this.chainCode)
      const il = Bn().fromBuffer(hash.slice(0, 32))
      const ir = hash.slice(32, 64)

      // Ki = (IL + kpar)*G = IL*G + Kpar
      const ilG = Point.getG().mul(il)
      const Kpar = this.pubKey.point
      const Ki = ilG.add(Kpar)
      const newpub = new PubKey()
      newpub.point = Ki

      ret = new this.constructor()
      ret.chainCode = ir

      ret.pubKey = newpub
    }

    ret.childIndex = i
    const pubKeyhash = Hash.sha256Ripemd160(this.pubKey.toBuffer())
    ret.parentFingerPrint = pubKeyhash.slice(0, 4)
    ret.versionBytesNum = this.versionBytesNum
    ret.depth = this.depth + 1

    return ret
  }

  toPublic () {
    const bip32 = new this.constructor().fromObject(this)
    bip32.versionBytesNum = this.Constants.pubKey
    bip32.privKey = undefined
    return bip32
  }

  toBuffer () {
    const isPrivate = this.versionBytesNum === this.Constants.privKey
    const isPublic = this.versionBytesNum === this.Constants.pubKey
    if (isPrivate) {
      return new Bw()
        .writeUInt32BE(this.versionBytesNum)
        .writeUInt8(this.depth)
        .write(this.parentFingerPrint)
        .writeUInt32BE(this.childIndex)
        .write(this.chainCode)
        .writeUInt8(0)
        .write(this.privKey.bn.toBuffer({ size: 32 }))
        .toBuffer()
    } else if (isPublic) {
      if (this.pubKey.compressed === false) {
        throw new Error(
          'cannot convert bip32 to buffer if pubKey is not compressed'
        )
      }
      return new Bw()
        .writeUInt32BE(this.versionBytesNum)
        .writeUInt8(this.depth)
        .write(this.parentFingerPrint)
        .writeUInt32BE(this.childIndex)
        .write(this.chainCode)
        .write(this.pubKey.toBuffer())
        .toBuffer()
    } else {
      throw new Error('bip32: invalid versionBytesNum byte')
    }
  }

  /**
   * This is the "fast" analog of toBuffer. It is almost the same as toBuffer,
   * and in fact is actually not any faster. The only difference is that it
   * adds an uncompressed rather than compressed public key to the output. This
   * is so that .fromFastBufer can read in the public key without having to do
   * fancy, slow point multiplication to derive the y value of the public key.
   * Thus, although .toFastBuffer is not any faster, .fromFastBuffer is faster.
   */
  toFastBuffer () {
    if (!this.versionBytesNum) {
      return Buffer.alloc(0)
    }
    const isPrivate = this.versionBytesNum === this.Constants.privKey
    const isPublic = this.versionBytesNum === this.Constants.pubKey
    if (isPrivate) {
      return new Bw()
        .writeUInt32BE(this.versionBytesNum)
        .writeUInt8(this.depth)
        .write(this.parentFingerPrint)
        .writeUInt32BE(this.childIndex)
        .write(this.chainCode)
        .writeUInt8(0)
        .write(this.privKey.bn.toBuffer({ size: 32 }))
        .toBuffer()
    } else if (isPublic) {
      return new Bw()
        .writeUInt32BE(this.versionBytesNum)
        .writeUInt8(this.depth)
        .write(this.parentFingerPrint)
        .writeUInt32BE(this.childIndex)
        .write(this.chainCode)
        .write(this.pubKey.toFastBuffer())
        .toBuffer()
    } else {
      throw new Error('bip32: invalid versionBytesNum byte')
    }
  }

  toString () {
    return Base58Check.encode(this.toBuffer())
  }

  toJSON () {
    return this.toFastHex()
  }

  fromJSON (json) {
    return this.fromFastHex(json)
  }

  isPrivate () {
    return this.versionBytesNum === this.Constants.privKey
  }
}

export { Bip32 }
