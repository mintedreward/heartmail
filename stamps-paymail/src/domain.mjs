'use strict'
import isValidDomain from 'is-valid-domain'
import dns from 'dns'
import fetch from 'isomorphic-fetch'

/**
 * Domain
 * ======
 *
 * This should be an abstraction over DNS that works both in a browser and in
 * node.js via Google's "DNS over HTTPS".
 */
class Domain {
  constructor (domainName = '', useDNS = true, protocol = 'https') {
    this.domainName = domainName
    this.useDNS = useDNS // can be changed for testing
    this.protocol = protocol // can be changed for testing
  }

  static isValid (domainName = '') {
    return isValidDomain(domainName)
  }

  isValid () {
    return this.constructor.isValid(this.domainName)
  }

  static normalize (domainName = '') {
    const domainName2 = domainName.toLowerCase()
    let domainName3
    if (domainName2[domainName2.length - 1] === '.') {
      domainName3 = domainName2.substring(0, domainName2.length - 1)
    } else {
      domainName3 = domainName2
    }
    return domainName3
  }

  normalize () {
    this.domainName = this.constructor.normalize(this.domainName)
    return this
  }

  static async getPaymailHostInfo (domainName) {
    return new Promise((resolve, reject) => {
      // TODO(@ryanxcharles): Cache the DNS query
      dns.resolveSrv(`_bsvalias._tcp.${domainName}`, async (err, result) => {
        try {
          if (err && (err.code === 'ENODATA' || err.code === 'ENOTFOUND')) {
            return resolve({
              domainName: domainName,
              port: 443,
              isSecure: true
            })
          }
          if (err) {
            return reject(err)
          }

          const { name: domainNameFromDns, port } = result[0]
          resolve({
            domainName: domainNameFromDns,
            port,
            isSecure: domainNameFromDns.endsWith(domainName)
          })
        } catch (err) {
          return reject(err)
        }
      })
    }).then(result => {
      return result
    }, (err) => {
      return err
    })
  }

  async getPaymailHostInfo () {
    return this.constructor.getPaymailHostInfo(this.domainName)
  }

  async getPaymailHostURL () {
    const { domainName, port, isSecure } = await this.getPaymailHostInfo()
    if (!isSecure) {
      throw new Error('Paymail host failed security check')
    }
    return `${this.protocol}://${domainName}:${port}`
  }

  async getWellKnownURL () {
    return `${await this.getPaymailHostURL()}/.well-known/bsvalias`
  }

  async getWellKnownFile () {
    // TODO(@ryanxcharles): Cache the HTTP query
    const res = await fetch(await this.getWellKnownURL())
    return res.json()
  }
}

export { Domain }
