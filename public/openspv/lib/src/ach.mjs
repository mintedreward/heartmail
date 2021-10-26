/**
 * Ach (Aes+Cbc+Hmac) (experimental)
 * =================================
 *
 * An "encrypt-then-MAC" that uses Aes, Cbc and SHA256 Hmac. This is suitable
 * for general encryption of data.
 *
 * The encrypted data takes the form:
 * (256 bit hmac)(128 bit iv)(128+ bits Aes+Cbc encrypted message)
 */
'use strict'

import { Aescbc } from './aescbc.mjs'
import { Hash } from './hash.mjs'
import { cmp } from './cmp.mjs'

class Ach { }

Ach.encrypt = function (messageBuf, cipherKeyBuf, ivBuf) {
  const encBuf = Aescbc.encrypt(messageBuf, cipherKeyBuf, ivBuf)
  const hmacbuf = Hash.sha256Hmac(encBuf, cipherKeyBuf)
  return Buffer.concat([hmacbuf, encBuf])
}

Ach.decrypt = function (encBuf, cipherKeyBuf) {
  if (encBuf.length < (256 + 128 + 128) / 8) {
    throw new Error(
      'The encrypted data must be at least 256+128+128 bits, which is the length of the Hmac plus the iv plus the smallest encrypted data size'
    )
  }
  const hmacbuf = encBuf.slice(0, 256 / 8)
  encBuf = encBuf.slice(256 / 8, encBuf.length)
  const hmacbuf2 = Hash.sha256Hmac(encBuf, cipherKeyBuf)
  if (!cmp(hmacbuf, hmacbuf2)) {
    throw new Error(
      'Message authentication failed - Hmacs are not equivalent'
    )
  }
  return Aescbc.decrypt(encBuf, cipherKeyBuf)
}

export { Ach }
