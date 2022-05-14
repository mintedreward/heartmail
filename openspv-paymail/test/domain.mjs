/* global describe,it */
'use strict'
import { Domain } from '../src/domain.mjs'
import should from 'should'

describe('Domain', () => {
  it('should make a new Domain', () => {
    let domain = new Domain('example.com')
    should.exist(domain)
    domain = new Domain('example.com')
    should.exist(domain)
  })

  describe('#isValid', () => {
    it('should know this is a valid domain name', () => {
      new Domain('example.com').isValid().should.equal(true)
      new Domain('example.com.').isValid().should.equal(true)
      new Domain('example.com..').isValid().should.equal(false)
      new Domain('example .com').isValid().should.equal(false)
    })
  })

  describe('#normalize', () => {
    it('should normalize this domain', () => {
      new Domain('example.com').normalize().domainName.should.equal('example.com')
      new Domain('example.com.').normalize().domainName.should.equal('example.com')
      new Domain('Example.com').normalize().domainName.should.equal('example.com')
      new Domain('Example.com.').normalize().domainName.should.equal('example.com')
    })
  })

  describe('#getPaymailHostInfo', () => {
    // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
    it('should get money button host info accurately', async () => {
      const domain = new Domain('moneybutton.com')
      const info = await domain.getPaymailHostInfo()
      info.domainName.should.equal('www.moneybutton.com')
      info.port.should.equal(443)
      info.isSecure.should.equal(true)
    })
  })

  describe('#getWellKnownFile', () => {
    // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
    it('should get money button host info accurately', async () => {
      const domain = new Domain('moneybutton.com')
      const wellKnownFile = await domain.getWellKnownFile()
      wellKnownFile.bsvalias.should.equal('1.0')
    })
  })
})
