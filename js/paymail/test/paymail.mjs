/* global describe,it */
'use strict'
import { Paymail } from '../index.mjs'
import should from 'should'
import { PubKey, PrivKey, Sig } from '@openspv/lib'

describe('Paymail', () => {
  it('should make a new Paymail', () => {
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
      let paymail
      paymail = new Paymail('User@example.com')
      paymail.getNormalized().should.equal('user@example.com')
      paymail = new Paymail('user@example.com.')
      paymail.getNormalized().should.equal('user@example.com')
      paymail = new Paymail('User@example.com.')
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

  describe('#getDomain', () => {
    it('should get the domain', () => {
      const paymail = new Paymail('user@example.com')
      paymail.getDomainName().should.equal('example.com')
      paymail.getDomain().domainName.should.equal('example.com')
    })
  })

  describe('#getPubKey', () => {
    it('should get this known public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const paymail = new Paymail('ryan@moneybutton.com')
      const pubKey = await paymail.getPubKey()
      pubKey.toString().should.equal('0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2')
    })
  })

  describe('#isValidPubKey', () => {
    it('should know this is a valid public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const pubKey = PubKey.fromString('0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2')
      const paymail = new Paymail('ryan@moneybutton.com')
      const match = await paymail.isValidPubKey(pubKey)
      match.should.equal(true)
    })

    it('should know this is not a valid public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const pubKey = PubKey.fromPrivKey(PrivKey.fromRandom())
      const paymail = new Paymail('ryan@moneybutton.com')
      const match = await paymail.isValidPubKey(pubKey)
      match.should.equal(false)
    })
  })

  describe('#isValidSig', () => {
    it('should know this new signature is a valid signature', async () => {
      const privKey = PrivKey.fromRandom()
      const pubKey = PubKey.fromPrivKey(privKey)
      const messageBuf = Buffer.from('this is my message')
      const paymail = new Paymail('ryan@moneybutton.com')
      paymail.isValidPubKey = () => true
      const sig = await paymail.sign(messageBuf, privKey)
      const isValid = await paymail.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
    })

    it('should know this known signature is a valid signature', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const messageBuf = Buffer.from('This is an essay that I want to sign. I am the author of it.')
      const paymail = new Paymail('ryan@moneybutton.com')
      const pubKeyStr = '0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2'
      const sigStr = 'H3LheWtnPU3lW7tuNH4GkH2EAPMsNLAHkReTTPOC4f7tGXUBfNKQ4w7qnZGDDz7UmAvmRVy6pH1F0ak58GOrOoA='
      const pubKey = PubKey.fromString(pubKeyStr)
      const sig = Sig.fromCompact(Buffer.from(sigStr, 'base64'))
      const isValid = await paymail.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
    })
  })

  describe('#sign', () => {
    it('should sign and create a valid signature', async () => {
      const privKey = PrivKey.fromString('Ky8jefw9f9jtAazLezCqDkfveP9xp9ZUCwpqUykfFWA3S5iKN665')
      const pubKey = PubKey.fromPrivKey(privKey)
      const messageBuf = Buffer.from('this is my message')
      const paymail = new Paymail('ryan@moneybutton.com')
      paymail.isValidPubKey = () => true
      const sig = await paymail.sign(messageBuf, privKey)
      const isValid = await paymail.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
      sig.toCompact().toString('base64').should.equal('IAqJX1+rmnulekNUNcB8fjVWSM6sAO+jVqJ0DCgc4ph5Jk84dcZsaZOtIqJWY1ifATZ7FzH4tefwms78mbw6o9w=')
    })
  })
})
