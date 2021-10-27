/**
 * Keyfile
 * =======
 *
 * Each user has at least one identity key. Each identity key always belongs to
 * a paymail. Not all paymails are necessarily present in this file. Only unique
 * (non-deterministic) identity keys are present in this file. It is intended
 * that a user should have not too many unique identity keys. Typically the only
 * reason to generate a new identity key is if a key is lost or stolen. However,
 * it is possible the user will choose to rotate keys as a precaution even if no
 * keys have been lost or stolen.
 *
 * The private keys are always encrypted with a hash of the user's password.
 *
 * Keys are never removed from this file. It is an append-only log of all unique
 * identity keys.
 *
 * There is always one keyfile per user per domain.
 *
 * It is absolutely not intended that this file be used to store all keys or all
 * paymails held by the user. If the user has other keys, they should be
 * encrypted using keys from this file or from keys derived from keys in this
 * file.
 *
 * [
 *   {paymail, pubkeyHash, passwordHashHash, encryptedPrivKey},
 *   ...
 * ]
 *
 * This file is extensible. We enforce that it is an array. If it is ever an
 * object, that is because there is a new standard that needs new fields that
 * are not provided by the array.
 *
 * The user never sees the keys. It is assumed that every user has at least one
 * reliable 2FF (Two Factor Friend) which can be used to recover the keys.
 */
'use strict'

import { Struct, Hash, Ach, Address } from '@openspv/lib'

class Keyfile extends Struct {
  constructor () {
    this.keys = []
  }

  static passwordHashFromPassword (password = '') {
    // the passwordHash is used to encrypt the key
    return Hash.sha256Hmac(Buffer.from(password), Buffer.from('KeyFilePasswordHash')).toString('hex')
  }

  static passwordHashHashFromPassword (password = '') {
    // the passwordHashHash is used to identify the password and is written to
    // the keyfile
    const passwordHash = this.constructor.passwordHashFromPassword(password)
    return Hash.sha256Hmac(Buffer.from(passwordHash, 'hex'), Buffer.from('KeyFilePasswordHashHash')).toString('hex')
  }

  static encryptKey (privKey, passwordHash) {
    // the private key is encrypted with the passwordHash
    const passwordHashBuf = Buffer.from(passwordHash, 'hex')
    const privKeyBuf = privKey.toBuffer()
    const messageBuf = privKeyBuf
    const cipherKeyBuf = passwordHashBuf
    return Ach.encrypt(messageBuf, cipherKeyBuf).toString('hex')
  }

  static decryptKey (encryptedPrivKey, passwordHash) {
    const encBuf = Buffer.from(encryptedPrivKey, 'hex')
    const cipherKeyBuf = Buffer.from(passwordHash, 'hex')
    return Ach.decrypt(encBuf, cipherKeyBuf).toString('hex')
  }

  pushNewKey (paymail, keyPair, password = '') {
    const pubKey = keyPair.pubKey
    const privKey = keyPair.privKey
    const pubKeyHash = Address.fromPubKey(pubKey).toHex()
    const passwordHash = this.constructor.passwordHashFromPassword(password)
    const passwordHashHash = this.constructor.passwordHashHashFromPassword(password)
    const encryptedPrivKey = this.constructor.encryptedKey(privKey, passwordHash)
    this.keys.push({ paymail, pubKeyHash, passwordHashHash, encryptedPrivKey })
  }

  fromJSON (json) {
    const keys = JSON.parse(JSON.stringify(json))
    if (!Array.isArray(this.keys)) {
      throw new Error('keys must be an array')
    }
    this.keys = keys
    return this
  }

  toJSON () {
    return JSON.parse(JSON.stringify(this.keys))
  }
}

export { Keyfile }
