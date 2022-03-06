import emailValidator from 'email-validator'

class Paymail {
  constructor (paymail = '', pubKey, privKey, normalized, domainName) {
    this.paymail = paymail
    this.pubKey = pubKey
    this.privKey = privKey
    this.normalized = normalized || this.constructor.getNormalized(paymail)
    this.domainName = domainName || this.constructor.getDomainName(paymail)
  }

  static isValid (paymail = '') {
    return emailValidator.validate(paymail)
  }

  isValid () {
    return this.constructor.isValid(this.paymail)
  }

  static getNormalized(paymail) {
    if (typeof paymail !== 'string' || paymail.length === 0) {
      return paymail
    }
    let normalized = paymail
    normalized = normalized.toLowerCase()
    return normalized
  }

  getNormalized () {
    return this.constructor.getNormalized(this.paymail)
  }

  normalize() {
    this.paymail = this.getNormalized()
    return this
  }

  static getUserName (paymail = '') {
    const arr = paymail.split('@')
    return arr[0]
  }

  // also the "local part"
  getUserName () {
    return this.constructor.getUserName(this.paymail)
  }

  static getDomainName (paymail = '') {
    if (typeof paymail !== 'string' || paymail.length === 0) {
      return paymail
    }
    const arr = paymail.split('@')
    return arr[1]
  }

  getDomainName () {
    return this.constructor.getDomainName(this.paymail)
  }

  async getPaymailHost () {
    // query DNS
    // ensure DNSSEC
    return 'http://localhost:4000'
  }

  async getPubKey () {
    // query .well-known
    // query PKI
    // convert string to pubKey object
  }

  async verifySig (data, sig) {

  }

  async sign () {

  }
}

export { Paymail }