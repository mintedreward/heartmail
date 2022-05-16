/* global describe,it */
'use strict'
import { Email2 } from '../index.mjs'
import should from 'should'
import { PubKey, PrivKey, Sig } from 'stamp-lib'

describe('Email2', () => {
  it('should make a new Email2', () => {
    let email2 = new Email2('user@example.com')
    should.exist(email2)
    email2 = new Email2('user2@example.com')
    should.exist(email2)
  })

  describe('#isValid', () => {
    it('should validate or invalidate', () => {
      new Email2('user@example.com').isValid().should.equal(true)
      new Email2('user @example.com').isValid().should.equal(false)
      new Email2('').isValid().should.equal(false)
      new Email2().isValid().should.equal(false)
      new Email2(null).isValid().should.equal(false)
      new Email2(undefined).isValid().should.equal(false)
    })
  })

  describe('#getNormalized', () => {
    it('should get a normalized email2', () => {
      let email2
      email2 = new Email2('User@example.com')
      email2.getNormalized().should.equal('user@example.com')
      email2 = new Email2('user@example.com.')
      email2.getNormalized().should.equal('user@example.com')
      email2 = new Email2('User@example.com.')
      email2.getNormalized().should.equal('user@example.com')
    })
  })

  describe('#normalize', () => {
    it('should normalize the email2', () => {
      const email2 = new Email2('User@example.com')
      email2.email2.should.equal('User@example.com')
      email2.normalize().email2.should.equal('user@example.com')
    })
  })

  describe('#getUserName', () => {
    it('should get the user name or local part', () => {
      const email2 = new Email2('user@example.com')
      email2.getUserName().should.equal('user')
    })
  })

  describe('#getDomainName', () => {
    it('should get the domain name', () => {
      const email2 = new Email2('user@example.com')
      email2.getDomainName().should.equal('example.com')
    })
  })

  describe('#getDomain', () => {
    it('should get the domain', () => {
      const email2 = new Email2('user@example.com')
      email2.getDomainName().should.equal('example.com')
      email2.getDomain().domainName.should.equal('example.com')
    })
  })

  describe('#getPubKey', () => {
    it('should get this known public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const email2 = new Email2('ryan@moneybutton.com')
      const pubKey = await email2.getPubKey()
      pubKey.toString().should.equal('0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2')
    })
  })

  describe('#isValidPubKey', () => {
    it('should know this is a valid public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const pubKey = PubKey.fromString('0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2')
      const email2 = new Email2('ryan@moneybutton.com')
      const match = await email2.isValidPubKey(pubKey)
      match.should.equal(true)
    })

    it('should know this is not a valid public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const pubKey = PubKey.fromPrivKey(PrivKey.fromRandom())
      const email2 = new Email2('ryan@moneybutton.com')
      const match = await email2.isValidPubKey(pubKey)
      match.should.equal(false)
    })
  })

  describe('#isValidSig', () => {
    it('should know this new signature is a valid signature', async () => {
      const privKey = PrivKey.fromRandom()
      const pubKey = PubKey.fromPrivKey(privKey)
      const messageBuf = Buffer.from('this is my message')
      const email2 = new Email2('ryan@moneybutton.com')
      email2.isValidPubKey = () => true
      const sig = await email2.sign(messageBuf, privKey)
      const isValid = await email2.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
    })

    it('should know this known signature is a valid signature', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const messageBuf = Buffer.from('This is an essay that I want to sign. I am the author of it.')
      const email2 = new Email2('ryan@moneybutton.com')
      const pubKeyStr = '0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2'
      const sigStr = 'H3LheWtnPU3lW7tuNH4GkH2EAPMsNLAHkReTTPOC4f7tGXUBfNKQ4w7qnZGDDz7UmAvmRVy6pH1F0ak58GOrOoA='
      const pubKey = PubKey.fromString(pubKeyStr)
      const sig = Sig.fromCompact(Buffer.from(sigStr, 'base64'))
      const isValid = await email2.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
    })
  })

  describe('#sign', () => {
    it('should sign and create a valid signature', async () => {
      const privKey = PrivKey.fromString('Ky8jefw9f9jtAazLezCqDkfveP9xp9ZUCwpqUykfFWA3S5iKN665')
      const pubKey = PubKey.fromPrivKey(privKey)
      const messageBuf = Buffer.from('this is my message')
      const email2 = new Email2('ryan@moneybutton.com')
      email2.isValidPubKey = () => true
      const sig = await email2.sign(messageBuf, privKey)
      const isValid = await email2.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
      sig.toCompact().toString('base64').should.equal('IAqJX1+rmnulekNUNcB8fjVWSM6sAO+jVqJ0DCgc4ph5Jk84dcZsaZOtIqJWY1ifATZ7FzH4tefwms78mbw6o9w=')
    })
  })
})
