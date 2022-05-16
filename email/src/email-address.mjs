import emailValidator from 'email-validator'
import { Domain } from './domain.mjs'
import fetch from 'isomorphic-fetch'
import { PubKey, PrivKey, KeyPair, Sig, KeyAddress, Bsm } from 'stamp-lib'

class EmailAddress {
  constructor (emailAddressStr = '', pubKey, privKey, normalized, domainName) {
    this.emailAddressStr = emailAddressStr
    this.pubKey = pubKey
    this.privKey = privKey
    this.normalized = normalized || this.constructor.getNormalized(emailAddressStr)
    this.domainName = domainName || this.constructor.getDomainName(emailAddressStr)
    this.domain = this.constructor.getDomain(this.domainName)
  }

  static isValid (emailAddressStr = '') {
    return emailValidator.validate(emailAddressStr)
  }

  isValid () {
    return this.constructor.isValid(this.emailAddressStr)
  }

  static getNormalized (emailAddressStr) {
    if (typeof emailAddressStr !== 'string' || emailAddressStr.length === 0) {
      return emailAddressStr
    }
    let normalized = emailAddressStr
    normalized = normalized.toLowerCase()
    const domain = this.getDomain(normalized)
    const userName = normalized.split('@')[0]
    normalized = `${userName}@${domain.normalize().domainName}`
    return normalized
  }

  getNormalized () {
    return this.constructor.getNormalized(this.emailAddressStr)
  }

  normalize () {
    this.emailAddressStr = this.getNormalized()
    return this
  }

  static getUserName (emailAddressStr = '') {
    const arr = emailAddressStr.split('@')
    return arr[0]
  }

  // also the "local part"
  getUserName () {
    return this.constructor.getUserName(this.emailAddressStr)
  }

  static getDomainName (emailAddressStr = '') {
    if (typeof emailAddressStr !== 'string' || emailAddressStr.length === 0) {
      return emailAddressStr
    }
    const arr = emailAddressStr.split('@')
    return arr[1]
  }

  getDomainName () {
    return this.constructor.getDomainName(this.emailAddressStr)
  }

  static getDomain (emailAddressStr = '') {
    const domainName = this.getDomainName(emailAddressStr)
    return new Domain(domainName)
  }

  getDomain () {
    return this.constructor.getDomain(this.emailAddressStr)
  }

  async getPubKey () {
    // SBW 2002
    const userName = this.getUserName()
    const domainName = this.getDomainName()
    const wellKnown = await this.getDomain().getWellKnownFile()
    let url = wellKnown.capabilities.pki
    if (!url) {
      throw new Error('Could not retrieve PKI URL for emailAddressStr')
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
      throw new Error('Could not retrieve PKI URL for emailAddressStr')
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
    const keyAddress = KeyAddress.fromPubKey(pubKey)
    const isValid = Bsm.verify(messageBuf, sigStr, keyAddress)
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

export default EmailAddress
