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
 * This is the passwordHmac.
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
 *   keysByPasswordHmacHmac: {
 *     [passwordHmacHmac]: {
 *       [addressStr]: [encryptedPrivKey],
 *       [addressStr]: [encryptedPrivKey],
 *       ...
 *     },
 *     [passwordHmacHmac]: {
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

import { Struct, Hash, Ach, KeyAddress, PrivKey, PubKey } from 'heartmail-lib'

class Keyfile extends Struct {
  constructor () {
    super()
    this.keysByPasswordHmacHmac = {}
  }

  static passwordHmacFromPassword (password = '') {
    // the passwordHmac is used to encrypt the key
    return Hash.sha256Hmac(Buffer.from(password), Buffer.from('KeyFilePasswordHmac')).toString('hex')
  }

  static passwordHmacHmacFromPassword (password = '') {
    // the passwordHmacHmac is used to identify the password and is written to
    // the keyfile
    const passwordHmac = Keyfile.passwordHmacFromPassword(password)
    return Hash.sha256Hmac(Buffer.from(passwordHmac, 'hex'), Buffer.from('KeyFilePasswordHmacHmac')).toString('hex')
  }

  static encryptPrivKey (privKey, password = '', ivBuf) {
    const passwordHmac = Keyfile.passwordHmacFromPassword(password)
    return Keyfile.encryptPrivKeyWithpasswordHmac(privKey, passwordHmac, ivBuf)
  }

  static encryptPrivKeyWithpasswordHmac (privKey, passwordHmac, ivBuf) {
    // the private key is encrypted with the passwordHmac
    const passwordHmacBuf = Buffer.from(passwordHmac, 'hex')
    const privKeyBuf = privKey.toBuffer()
    const messageBuf = privKeyBuf
    const cipherKeyBuf = passwordHmacBuf
    return Ach.encrypt(messageBuf, cipherKeyBuf, ivBuf).toString('hex')
  }

  static decryptPrivKey (encryptedPrivKey, password = '', ivBuf) {
    const passwordHmac = Keyfile.passwordHmacFromPassword(password)
    return Keyfile.decryptPrivKeyWithpasswordHmac(encryptedPrivKey, passwordHmac, ivBuf)
  }

  static decryptPrivKeyWithpasswordHmac (encryptedPrivKey, passwordHmac) {
    const encBuf = Buffer.from(encryptedPrivKey, 'hex')
    const cipherKeyBuf = Buffer.from(passwordHmac, 'hex')
    const privKeyBuf = Ach.decrypt(encBuf, cipherKeyBuf)
    const privKey = PrivKey.fromBuffer(privKeyBuf)
    return privKey
  }

  addPrivKey (privKey, password = '', ivBuf) {
    const pubKey = PubKey.fromPrivKey(privKey)
    const address = KeyAddress.fromPubKey(pubKey)
    const addressStr = address.toString()
    const encryptedPrivKey = Keyfile.encryptPrivKey(privKey, password, ivBuf)
    if (!this.keysByPasswordHmacHmac) {
      this.keysByPasswordHmacHmac = {}
    }
    const passwordHmacHmac = Keyfile.passwordHmacHmacFromPassword(password)
    if (!this.keysByPasswordHmacHmac[passwordHmacHmac]) {
      this.keysByPasswordHmacHmac[passwordHmacHmac] = {}
    }
    this.keysByPasswordHmacHmac[passwordHmacHmac][addressStr] = encryptedPrivKey
    return address
  }

  getPrivKey (address, password = '', ivBuf) {
    const addressStr = address.toString()
    const passwordHmacHmac = Keyfile.passwordHmacHmacFromPassword(password)
    const encryptedPrivKey = this.keysByPasswordHmacHmac[passwordHmacHmac][addressStr]
    const privKey = Keyfile.decryptPrivKey(encryptedPrivKey, password, ivBuf)
    return privKey
  }

  changePassword (oldPassword = '', newPassword = '', ivBuf) {
    const oldpasswordHmacHmac = Keyfile.passwordHmacHmacFromPassword(oldPassword)
    if (!this.keysByPasswordHmacHmac[oldpasswordHmacHmac]) {
      throw new Error('no keys with that password')
    }
    const addressStrings = Object.keys(this.keysByPasswordHmacHmac[oldpasswordHmacHmac])
    for (const addressStr of addressStrings) {
      const address = KeyAddress.fromString(addressStr)
      const privKey = this.getPrivKey(address, oldPassword)
      this.addPrivKey(privKey, newPassword, ivBuf)
    }
    delete this.keysByPasswordHmacHmac[oldpasswordHmacHmac]
    const newpasswordHmacHmac = Keyfile.passwordHmacHmacFromPassword(newPassword)
    // return number of keys re-encrypted
    return Object.keys(this.keysByPasswordHmacHmac[newpasswordHmacHmac]).length
  }

  fromJSON (json) {
    this.keysByPasswordHmacHmac = json.keysByPasswordHmacHmac
    return this
  }

  toJSON () {
    return {
      keysByPasswordHmacHmac: JSON.parse(JSON.stringify(this.keysByPasswordHmacHmac))
    }
  }
}

export { Keyfile }
