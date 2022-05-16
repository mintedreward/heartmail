/* global describe,it */
'use strict'
import { EmailAddress } from '../index.mjs'
import should from 'should'
import { PubKey, PrivKey, Sig } from 'heartmail-stamp-lib'

describe('EmailAddress', () => {
  it('should make a new EmailAddress', () => {
    let emailAddress = new EmailAddress('user@example.com')
    should.exist(emailAddress)
    emailAddress = new EmailAddress('user2@example.com')
    should.exist(emailAddress)
  })

  describe('#isValid', () => {
    it('should validate or invalidate', () => {
      new EmailAddress('user@example.com').isValid().should.equal(true)
      new EmailAddress('user @example.com').isValid().should.equal(false)
      new EmailAddress('').isValid().should.equal(false)
      new EmailAddress().isValid().should.equal(false)
      new EmailAddress(null).isValid().should.equal(false)
      new EmailAddress(undefined).isValid().should.equal(false)
    })
  })

  describe('#getNormalized', () => {
    it('should get a normalized emailAddress', () => {
      let emailAddress
      emailAddress = new EmailAddress('User@example.com')
      emailAddress.getNormalized().should.equal('user@example.com')
      emailAddress = new EmailAddress('user@example.com.')
      emailAddress.getNormalized().should.equal('user@example.com')
      emailAddress = new EmailAddress('User@example.com.')
      emailAddress.getNormalized().should.equal('user@example.com')
    })
  })

  describe('#normalize', () => {
    it('should normalize the emailAddress', () => {
      const emailAddress = new EmailAddress('User@example.com')
      emailAddress.emailAddressStr.should.equal('User@example.com')
      emailAddress.normalize().emailAddressStr.should.equal('user@example.com')
    })
  })

  describe('#getUserName', () => {
    it('should get the user name or local part', () => {
      const emailAddress = new EmailAddress('user@example.com')
      emailAddress.getUserName().should.equal('user')
    })
  })

  describe('#getDomainName', () => {
    it('should get the domain name', () => {
      const emailAddress = new EmailAddress('user@example.com')
      emailAddress.getDomainName().should.equal('example.com')
    })
  })

  describe('#getDomain', () => {
    it('should get the domain', () => {
      const emailAddress = new EmailAddress('user@example.com')
      emailAddress.getDomainName().should.equal('example.com')
      emailAddress.getDomain().domainName.should.equal('example.com')
    })
  })

  describe('#getPubKey', () => {
    it('should get this known public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const emailAddress = new EmailAddress('ryan@moneybutton.com')
      const pubKey = await emailAddress.getPubKey()
      pubKey.toString().should.equal('0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2')
    })
  })

  describe('#isValidPubKey', () => {
    it('should know this is a valid public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const pubKey = PubKey.fromString('0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2')
      const emailAddress = new EmailAddress('ryan@moneybutton.com')
      const match = await emailAddress.isValidPubKey(pubKey)
      match.should.equal(true)
    })

    it('should know this is not a valid public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const pubKey = PubKey.fromPrivKey(PrivKey.fromRandom())
      const emailAddress = new EmailAddress('ryan@moneybutton.com')
      const match = await emailAddress.isValidPubKey(pubKey)
      match.should.equal(false)
    })
  })

  describe('#isValidSig', () => {
    it('should know this new signature is a valid signature', async () => {
      const privKey = PrivKey.fromRandom()
      const pubKey = PubKey.fromPrivKey(privKey)
      const messageBuf = Buffer.from('this is my message')
      const emailAddress = new EmailAddress('ryan@moneybutton.com')
      emailAddress.isValidPubKey = () => true
      const sig = await emailAddress.sign(messageBuf, privKey)
      const isValid = await emailAddress.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
    })

    it('should know this known signature is a valid signature', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const messageBuf = Buffer.from('This is an essay that I want to sign. I am the author of it.')
      const emailAddress = new EmailAddress('ryan@moneybutton.com')
      const pubKeyStr = '0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2'
      const sigStr = 'H3LheWtnPU3lW7tuNH4GkH2EAPMsNLAHkReTTPOC4f7tGXUBfNKQ4w7qnZGDDz7UmAvmRVy6pH1F0ak58GOrOoA='
      const pubKey = PubKey.fromString(pubKeyStr)
      const sig = Sig.fromCompact(Buffer.from(sigStr, 'base64'))
      const isValid = await emailAddress.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
    })
  })

  describe('#sign', () => {
    it('should sign and create a valid signature', async () => {
      const privKey = PrivKey.fromString('Ky8jefw9f9jtAazLezCqDkfveP9xp9ZUCwpqUykfFWA3S5iKN665')
      const pubKey = PubKey.fromPrivKey(privKey)
      const messageBuf = Buffer.from('this is my message')
      const emailAddress = new EmailAddress('ryan@moneybutton.com')
      emailAddress.isValidPubKey = () => true
      const sig = await emailAddress.sign(messageBuf, privKey)
      const isValid = await emailAddress.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
      sig.toCompact().toString('base64').should.equal('IAqJX1+rmnulekNUNcB8fjVWSM6sAO+jVqJ0DCgc4ph5Jk84dcZsaZOtIqJWY1ifATZ7FzH4tefwms78mbw6o9w=')
    })
  })
})
