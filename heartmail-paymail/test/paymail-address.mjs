/* global describe,it */
'use strict'
import { PaymailAddress } from '../index.mjs'
import should from 'should'
import { PubKey, PrivKey, Sig } from 'heartmail-lib'

describe('PaymailAddress', () => {
  it('should make a new PaymailAddress', () => {
    let paymailAddress = new PaymailAddress('user@example.com')
    should.exist(paymailAddress)
    paymailAddress = new PaymailAddress('user2@example.com')
    should.exist(paymailAddress)
  })

  describe('#isValid', () => {
    it('should validate or invalidate', () => {
      new PaymailAddress('user@example.com').isValid().should.equal(true)
      new PaymailAddress('user @example.com').isValid().should.equal(false)
      new PaymailAddress('').isValid().should.equal(false)
      new PaymailAddress().isValid().should.equal(false)
      new PaymailAddress(null).isValid().should.equal(false)
      new PaymailAddress(undefined).isValid().should.equal(false)
    })
  })

  describe('#getNormalized', () => {
    it('should get a normalized paymailAddress', () => {
      let paymailAddress
      paymailAddress = new PaymailAddress('User@example.com')
      paymailAddress.getNormalized().should.equal('user@example.com')
      paymailAddress = new PaymailAddress('user@example.com.')
      paymailAddress.getNormalized().should.equal('user@example.com')
      paymailAddress = new PaymailAddress('User@example.com.')
      paymailAddress.getNormalized().should.equal('user@example.com')
    })
  })

  describe('#normalize', () => {
    it('should normalize the paymailAddress', () => {
      const paymailAddress = new PaymailAddress('User@example.com')
      paymailAddress.paymailAddressStr.should.equal('User@example.com')
      paymailAddress.normalize().paymailAddressStr.should.equal('user@example.com')
    })
  })

  describe('#getUserName', () => {
    it('should get the user name or local part', () => {
      const paymailAddress = new PaymailAddress('user@example.com')
      paymailAddress.getUserName().should.equal('user')
    })
  })

  describe('#getDomainName', () => {
    it('should get the domain name', () => {
      const paymailAddress = new PaymailAddress('user@example.com')
      paymailAddress.getDomainName().should.equal('example.com')
    })
  })

  describe('#getDomain', () => {
    it('should get the domain', () => {
      const paymailAddress = new PaymailAddress('user@example.com')
      paymailAddress.getDomainName().should.equal('example.com')
      paymailAddress.getDomain().domainName.should.equal('example.com')
    })
  })

  describe('#getPubKey', () => {
    it('should get this known public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const paymailAddress = new PaymailAddress('ryan@moneybutton.com')
      const pubKey = await paymailAddress.getPubKey()
      pubKey.toString().should.equal('0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2')
    })
  })

  describe('#isValidPubKey', () => {
    it('should know this is a valid public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const pubKey = PubKey.fromString('0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2')
      const paymailAddress = new PaymailAddress('ryan@moneybutton.com')
      const match = await paymailAddress.isValidPubKey(pubKey)
      match.should.equal(true)
    })

    it('should know this is not a valid public key', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const pubKey = PubKey.fromPrivKey(PrivKey.fromRandom())
      const paymailAddress = new PaymailAddress('ryan@moneybutton.com')
      const match = await paymailAddress.isValidPubKey(pubKey)
      match.should.equal(false)
    })
  })

  describe('#isValidSig', () => {
    it('should know this new signature is a valid signature', async () => {
      const privKey = PrivKey.fromRandom()
      const pubKey = PubKey.fromPrivKey(privKey)
      const messageBuf = Buffer.from('this is my message')
      const paymailAddress = new PaymailAddress('ryan@moneybutton.com')
      paymailAddress.isValidPubKey = () => true
      const sig = await paymailAddress.sign(messageBuf, privKey)
      const isValid = await paymailAddress.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
    })

    it('should know this known signature is a valid signature', async () => {
      // TODO(@ryanxcharles): Remove live network tests by replacing with mockups
      const messageBuf = Buffer.from('This is an essay that I want to sign. I am the author of it.')
      const paymailAddress = new PaymailAddress('ryan@moneybutton.com')
      const pubKeyStr = '0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2'
      const sigStr = 'H3LheWtnPU3lW7tuNH4GkH2EAPMsNLAHkReTTPOC4f7tGXUBfNKQ4w7qnZGDDz7UmAvmRVy6pH1F0ak58GOrOoA='
      const pubKey = PubKey.fromString(pubKeyStr)
      const sig = Sig.fromCompact(Buffer.from(sigStr, 'base64'))
      const isValid = await paymailAddress.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
    })
  })

  describe('#sign', () => {
    it('should sign and create a valid signature', async () => {
      const privKey = PrivKey.fromString('Ky8jefw9f9jtAazLezCqDkfveP9xp9ZUCwpqUykfFWA3S5iKN665')
      const pubKey = PubKey.fromPrivKey(privKey)
      const messageBuf = Buffer.from('this is my message')
      const paymailAddress = new PaymailAddress('ryan@moneybutton.com')
      paymailAddress.isValidPubKey = () => true
      const sig = await paymailAddress.sign(messageBuf, privKey)
      const isValid = await paymailAddress.isValidSig(pubKey, messageBuf, sig)
      isValid.should.equal(true)
      sig.toCompact().toString('base64').should.equal('IAqJX1+rmnulekNUNcB8fjVWSM6sAO+jVqJ0DCgc4ph5Jk84dcZsaZOtIqJWY1ifATZ7FzH4tefwms78mbw6o9w=')
    })
  })
})
