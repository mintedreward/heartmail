/* global describe,it */
'use strict'
import { Paymail } from '../index.mjs'
import should from 'should'

describe('Paymail', function () {
  it('should make a new Paymail', function () {
    let paymail = new Paymail('user@example.com')
    should.exist(paymail)
    paymail = new Paymail('user2@example.com')
    should.exist(paymail)
  })

  describe('#isValid', () => {
    it('should validate or invalidate', () => {
      new Paymail('user@example.com').isValid().should.equal(true)
      new Paymail('user @example.com').isValid().should.equal(false)
      new Paymail('').isValid().should.equal(false)
      new Paymail().isValid().should.equal(false)
      new Paymail(null).isValid().should.equal(false)
      new Paymail(undefined).isValid().should.equal(false)
    })
  })

  describe('#getNormalized', () => {
    it('should get a normalized paymail', () => {
      const paymail = new Paymail('User@example.com')
      paymail.getNormalized().should.equal('user@example.com')
    })
  })

  describe('#normalize', () => {
    it('should normalize the paymail', () => {
      const paymail = new Paymail('User@example.com')
      paymail.paymail.should.equal('User@example.com')
      paymail.normalize().paymail.should.equal('user@example.com')
    })
  })

  describe('#getUserName', () => {
    it('should get the user name or local part', () => {
      const paymail = new Paymail('user@example.com')
      paymail.getUserName().should.equal('user')
    })
  })

  describe('#getDomainName', () => {
    it('should get the domain name', () => {
      const paymail = new Paymail('user@example.com')
      paymail.getDomainName().should.equal('example.com')
    })
  })
})