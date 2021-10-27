/**
 * Keyfile
 * =======
 *
 * Each user has at least one identity key. Only unique (non-deterministic)
 * identity keys are present in this file. It is intended that a user should
 * have not too many unique identity keys. Typically the only reason to generate
 * a new identity key is if a key is lost or stolen. However, it is possible the
 * user will choose to rotate keys as a precaution even if no keys have been
 * lost or stolen.
 *
 * The private keys are always encrypted with a hash of the user's password.
 * This is the passwordHash.
 *
 * Keys are never removed from this file. If you want to rotate your keys, then
 * create a new key and stop using the old ones. However, there is no reason to
 * delete keys. This file should never be too long.
 *
 * There is always at least one keyfile per user per domain.
 *
 * It is absolutely not intended that this file be used to store all keys held
 * by the user. If the user has other keys, they should be encrypted using keys
 * from this file or from keys derived from keys in this file.
 * 
 * The keyfile is extensible. 
 *
 * The user never sees the keys. It is assumed that every user has at least one
 * reliable 2FF (Two Factor Friend) which can be used to recover the keys.
 * 
 * We do not use bcrypt. It is important that the password is strong. If you
 * want a stronger password for your users, then use bcrypt on their password
 * and use that as the password for the keyfile.
 * 
 * If the user has had their password compromised, then the keys in this file
 * can no longer be trusted. What they should do in that case is to change their
 * password first and then generate a new identity to be added to this file.
 * They should then migrate all old keys to the new keys. e.g., if they have
 * money stored in derivative keys, they should move all that to new keys.
 * 
 * File structure:
 *
 * {
 *   keysByPasswordHashHash: {
 *     [passwordHashHash]: {
 *       [addressStr]: [encryptedPrivKey],
 *       [addressStr]: [encryptedPrivKey],
 *       ...
 *     },
 *     [passwordHashHash]: {
 *       [addressStr]: [encryptedPrivKey],
 *       [addressStr]: [encryptedPrivKey],
 *       ...
 *     },
 *     ...
 *   }
 * }
 *
 */
'use strict'

import { Struct, Hash, Ach, Address, PrivKey, PubKey } from '@openspv/lib'

class Keyfile extends Struct {
  constructor () {
    super()
    this.keysByPasswordHashHash = {}
  }

  static passwordHashFromPassword (password = '') {
    // the passwordHash is used to encrypt the key
    return Hash.sha256Hmac(Buffer.from(password), Buffer.from('KeyFilePasswordHash')).toString('hex')
  }

  static passwordHashHashFromPassword (password = '') {
    // the passwordHashHash is used to identify the password and is written to
    // the keyfile
    const passwordHash = Keyfile.passwordHashFromPassword(password)
    return Hash.sha256Hmac(Buffer.from(passwordHash, 'hex'), Buffer.from('KeyFilePasswordHashHash')).toString('hex')
  }

  static encryptPrivKey (privKey, password = '', ivBuf) {
    const passwordHash = Keyfile.passwordHashFromPassword(password)
    return Keyfile.encryptPrivKeyWithPasswordHash(privKey, passwordHash, ivBuf)
  }

  static encryptPrivKeyWithPasswordHash (privKey, passwordHash, ivBuf) {
    // the private key is encrypted with the passwordHash
    const passwordHashBuf = Buffer.from(passwordHash, 'hex')
    const privKeyBuf = privKey.toBuffer()
    const messageBuf = privKeyBuf
    const cipherKeyBuf = passwordHashBuf
    return Ach.encrypt(messageBuf, cipherKeyBuf, ivBuf).toString('hex')
  }

  static decryptPrivKey (encryptedPrivKey, password = '', ivBuf) {
    const passwordHash = Keyfile.passwordHashFromPassword(password)
    return Keyfile.decryptPrivKeyWithPasswordHash(encryptedPrivKey, passwordHash, ivBuf)
  }

  static decryptPrivKeyWithPasswordHash (encryptedPrivKey, passwordHash) {
    const encBuf = Buffer.from(encryptedPrivKey, 'hex')
    const cipherKeyBuf = Buffer.from(passwordHash, 'hex')
    const privKeyBuf = Ach.decrypt(encBuf, cipherKeyBuf)
    const privKey = PrivKey.fromBuffer(privKeyBuf)
    return privKey
  }

  addPrivKey (privKey, password = '', ivBuf) {
    const pubKey = PubKey.fromPrivKey(privKey)
    const address = Address.fromPubKey(pubKey)
    const addressStr = address.toString()
    const encryptedPrivKey = Keyfile.encryptPrivKey(privKey, password, ivBuf)
    if (!this.keysByPasswordHashHash) {
      this.keysByPasswordHashHash = {}
    }
    const passwordHashHash = Keyfile.passwordHashHashFromPassword(password)
    if (!this.keysByPasswordHashHash[passwordHashHash]) {
      this.keysByPasswordHashHash[passwordHashHash] = {}
    }
    this.keysByPasswordHashHash[passwordHashHash][addressStr] = encryptedPrivKey
    return address
  }

  getPrivKey (address, password = '', ivBuf) {
    const addressStr = address.toString()
    const passwordHashHash = Keyfile.passwordHashHashFromPassword(password)
    const encryptedPrivKey = this.keysByPasswordHashHash[passwordHashHash][addressStr]
    const privKey = Keyfile.decryptPrivKey(encryptedPrivKey, password, ivBuf)
    return privKey
  }

  changePassword (oldPassword = '', newPassword = '', ivBuf) {
    const oldPasswordHashHash = Keyfile.passwordHashHashFromPassword(oldPassword)
    if (!this.keysByPasswordHashHash[oldPasswordHashHash]) {
      throw new Error('no keys with that password')
    }
    const addressStrings = Object.keys(this.keysByPasswordHashHash[oldPasswordHashHash])
    const obj = {}
    for (const addressStr of addressStrings) {
      const address = Address.fromString(addressStr)
      const privKey = this.getPrivKey(address, oldPassword)
      this.addPrivKey(privKey, newPassword, ivBuf)
    }
    delete this.keysByPasswordHashHash[oldPasswordHashHash]
    const newPasswordHashHash = Keyfile.passwordHashHashFromPassword(newPassword)
    // return number of keys re-encrypted
    return Object.keys(this.keysByPasswordHashHash[newPasswordHashHash]).length
  }

  fromJSON (json) {
    this.keysByPasswordHashHash = json.keysByPasswordHashHash
    return this
  }

  toJSON () {
    return {
      keysByPasswordHashHash: JSON.parse(JSON.stringify(this.keysByPasswordHashHash))
    }
  }
}

export { Keyfile }
