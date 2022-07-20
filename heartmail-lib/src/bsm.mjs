/**
 * Bitcoin Signed Message
 * ======================
 *
 * "Bitcoin Signed Message" just refers to a standard way of signing and
 * verifying an arbitrary message. The standard way to do this involves using a
 * "Bitcoin Signed Message:\n" prefix, which this code does. You are probably
 * interested in the static Bsm.sign( ... ) and Bsm.verify( ... ) functions,
 * which deal with a base64 string representing the compressed format of a
 * signature.
 */

import { KeyAddress } from './key-address.mjs'
import { Bw } from './bw.mjs'
import { cmp } from './cmp.mjs'
import { Ecdsa } from './ecdsa.mjs'
import { Hash } from './hash.mjs'
import { KeyPair } from './key-pair.mjs'
import { Sig } from './sig.mjs'
import { Struct } from './struct.mjs'

class Bsm extends Struct {
  constructor (messageBuf, keyPair, sig, address, verified) {
    super({ messageBuf, keyPair, sig, address, verified })
  }

  static magicHash (messageBuf) {
    if (!Buffer.isBuffer(messageBuf)) {
      throw new Error('messageBuf must be a buffer')
    }
    const bw = new Bw()
    bw.writeVarIntNum(Bsm.magicBytes.length)
    bw.write(Bsm.magicBytes)
    bw.writeVarIntNum(messageBuf.length)
    bw.write(messageBuf)
    const buf = bw.toBuffer()

    const hashBuf = Hash.sha256Sha256(buf)

    return hashBuf
  }

  static sign (messageBuf, keyPair) {
    const m = new Bsm(messageBuf, keyPair)
    m.sign()
    const sigbuf = m.sig.toCompact()
    const sigstr = sigbuf.toString('base64')
    return sigstr
  }

  static verify (messageBuf, sigstr, address) {
    const sigbuf = Buffer.from(sigstr, 'base64')
    const message = new Bsm()
    message.messageBuf = messageBuf
    message.sig = new Sig().fromCompact(sigbuf)
    message.address = address

    return message.verify().verified
  }

  sign () {
    const hashBuf = Bsm.magicHash(this.messageBuf)
    const ecdsa = new Ecdsa().fromObject({
      hashBuf,
      keyPair: this.keyPair
    })
    ecdsa.sign()
    ecdsa.calcrecovery()
    this.sig = ecdsa.sig
    return this
  }

  verify () {
    const hashBuf = Bsm.magicHash(this.messageBuf)

    const ecdsa = new Ecdsa()
    ecdsa.hashBuf = hashBuf
    ecdsa.sig = this.sig
    ecdsa.keyPair = new KeyPair()
    ecdsa.keyPair.pubKey = ecdsa.sig2PubKey()

    if (!ecdsa.verify()) {
      this.verified = false
      return this
    }

    const address = new KeyAddress().fromPubKey(
      ecdsa.keyPair.pubKey,
      undefined,
      this.sig.compressed
    )

    if (cmp(address.hashBuf, this.address.hashBuf)) {
      this.verified = true
    } else {
      this.verified = false
    }

    return this
  }
}

Bsm.magicBytes = Buffer.from('Bitcoin Signed Message:\n')

export { Bsm }
