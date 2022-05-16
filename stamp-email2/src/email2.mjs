import emailValidator from 'email-validator'
import { Domain } from './domain.mjs'
import fetch from 'isomorphic-fetch'
import { PubKey, PrivKey, KeyPair, Sig, Address, Bsm } from 'stamp-lib'

class Email2 {
  constructor (email2 = '', pubKey, privKey, normalized, domainName) {
    this.email2 = email2
    this.pubKey = pubKey
    this.privKey = privKey
    this.normalized = normalized || this.constructor.getNormalized(email2)
    this.domainName = domainName || this.constructor.getDomainName(email2)
    this.domain = this.constructor.getDomain(this.domainName)
  }

  static isValid (email2 = '') {
    return emailValidator.validate(email2)
  }

  isValid () {
    return this.constructor.isValid(this.email2)
  }

  static getNormalized (email2) {
    if (typeof email2 !== 'string' || email2.length === 0) {
      return email2
    }
    let normalized = email2
    normalized = normalized.toLowerCase()
    const domain = this.getDomain(normalized)
    const userName = normalized.split('@')[0]
    normalized = `${userName}@${domain.normalize().domainName}`
    return normalized
  }

  getNormalized () {
    return this.constructor.getNormalized(this.email2)
  }

  normalize () {
    this.email2 = this.getNormalized()
    return this
  }

  static getUserName (email2 = '') {
    const arr = email2.split('@')
    return arr[0]
  }

  // also the "local part"
  getUserName () {
    return this.constructor.getUserName(this.email2)
  }

  static getDomainName (email2 = '') {
    if (typeof email2 !== 'string' || email2.length === 0) {
      return email2
    }
    const arr = email2.split('@')
    return arr[1]
  }

  getDomainName () {
    return this.constructor.getDomainName(this.email2)
  }

  static getDomain (email2 = '') {
    const domainName = this.getDomainName(email2)
    return new Domain(domainName)
  }

  getDomain () {
    return this.constructor.getDomain(this.email2)
  }

  async getPubKey () {
    // SBW 2002
    const userName = this.getUserName()
    const domainName = this.getDomainName()
    const wellKnown = await this.getDomain().getWellKnownFile()
    let url = wellKnown.capabilities.pki
    if (!url) {
      throw new Error('Could not retrieve PKI URL for email2')
    }
    url = url.replace('{alias}', userName)
    url = url.replace('{domain.tld}', domainName)
    const res = await fetch(url)
    const json = await res.json()
    const pubKeyStr = json.pubkey
    const pubKey = PubKey.fromString(pubKeyStr)
    return pubKey
  }

  async isValidPubKey (pubKey) {
    // SBW 2003
    const pubKeyStr = pubKey.toString()
    const userName = this.getUserName()
    const domainName = this.getDomainName()
    const wellKnown = await this.getDomain().getWellKnownFile()
    let url = wellKnown.capabilities.a9f510c16bde
    if (!url) {
      throw new Error('Could not retrieve PKI URL for email2')
    }
    url = url.replace('{alias}', userName)
    url = url.replace('{domain.tld}', domainName)
    url = url.replace('{pubkey}', pubKeyStr)
    const res = await fetch(url)
    const json = await res.json()
    return json.match // true or false
  }

  async isValidSig (pubKey, messageBuf, sig) {
    // SBW 2004
    if (!(pubKey instanceof PubKey)) {
      throw new Error('pubKey must be a PubKey')
    }
    if (!Buffer.isBuffer(messageBuf)) {
      throw new Error('dataBuf must be a Buffer')
    }
    if (!(sig instanceof Sig)) {
      throw new Error('sig must be a Sig')
    }
    const isValidPubKey = await this.isValidPubKey(pubKey)
    if (!isValidPubKey) {
      return false
    }
    const sigStr = sig.toCompact().toString('base64')
    const address = Address.fromPubKey(pubKey)
    const isValid = Bsm.verify(messageBuf, sigStr, address)
    return isValid
  }

  async sign (messageBuf, privKey) {
    // SBW 2004
    if (!(privKey instanceof PrivKey)) {
      throw new Error('privKey must be a PrivKey')
    }
    if (!Buffer.isBuffer(messageBuf)) {
      throw new Error('dataBuf must be a Buffer')
    }
    const pubKey = PubKey.fromPrivKey(privKey)
    const keyPair = new KeyPair(privKey, pubKey)
    const sigStr = Bsm.sign(messageBuf, keyPair)
    const sigBuf = Buffer.from(sigStr, 'base64')
    const sig = Sig.fromCompact(sigBuf)
    return sig
  }
}

export default Email2
