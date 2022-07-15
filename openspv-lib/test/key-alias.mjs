/* global describe,it */
import { KeyAddress } from '../src/key-address.mjs'
import { PrivKey } from '../src/priv-key.mjs'
import { PubKey } from '../src/pub-key.mjs'
import { KeyAlias } from '../src/key-alias.mjs'
import should from 'should'
import { Bn } from '../src/bn.mjs'

describe('KeyAlias', function () {
  it('should exist', () => {
    should.exist(KeyAlias)
  })

  describe('#fromKeyAddress', () => {
    it('should produce this known value', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const address = KeyAddress.fromPubKey(pubKey)
      const keyAlias = new KeyAlias().fromKeyAddress(address)
      keyAlias.toString().should.equal('47x4dm45stw4w6vl4difdhztr')
    })

    it('should produce this known value', () => {
      const privKey = PrivKey.fromBn(new Bn(7))
      const pubKey = PubKey.fromPrivKey(privKey)
      const address = KeyAddress.fromPubKey(pubKey)
      const keyAlias = new KeyAlias().fromKeyAddress(address)
      keyAlias.toString().should.equal('5k6vjfsim3xg9zw5vrh5h9x0y')
    })

    it('should produce this known value', () => {
      const privKey = PrivKey.fromBn(new Bn(8))
      const pubKey = PubKey.fromPrivKey(privKey)
      const address = KeyAddress.fromPubKey(pubKey)
      const keyAlias = new KeyAlias().fromKeyAddress(address)
      keyAlias.toString().should.equal('8wds38dnbr2h3yyay0ievp29j')
    })
  })

  describe('@fromKeyAddress', () => {
    it('should produce this known value', () => {
      const privKey = PrivKey.fromBn(new Bn(5))
      const pubKey = PubKey.fromPrivKey(privKey)
      const address = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(address)
      keyAlias.toString().should.equal('47x4dm45stw4w6vl4difdhztr')
    })

    it('should produce this known value', () => {
      const privKey = PrivKey.fromBn(new Bn(6))
      const pubKey = PubKey.fromPrivKey(privKey)
      const address = KeyAddress.fromPubKey(pubKey)
      const keyAlias = KeyAlias.fromKeyAddress(address)
      keyAlias.toString().should.equal('7khrkf3z64jcbu80i5rvv629o')
    })

    it('should produce this known value', () => {
      const address = new KeyAddress()
      address.hashBuf = Buffer.from('00'.repeat(160 / 8), 'hex')
      const keyAlias = KeyAlias.fromKeyAddress(address)
      keyAlias.toString().should.equal('0')
    })

    it('should produce this known value', () => {
      const address = new KeyAddress()
      address.hashBuf = Buffer.from('01'.repeat(160 / 8), 'hex')
      const keyAlias = KeyAlias.fromKeyAddress(address)
      keyAlias.toString().should.equal('250za67mbtgh1tvq6ktn8q2p')
    })

    it('should produce this known value', () => {
      const address = new KeyAddress()
      address.hashBuf = Buffer.from('02'.repeat(160 / 8), 'hex')
      const keyAlias = KeyAlias.fromKeyAddress(address)
      keyAlias.toString().should.equal('4a1ykcf8nmwy3nrgd5nahg5e')
    })
  })

  describe('@fromString', () => {
    it('should produce this known value', () => {
      const string = '0'
      const keyAlias = KeyAlias.fromString(string)
      keyAlias.buf.toString('hex').should.equal('00'.repeat(128 / 8))
    })

    it('should produce this known value', () => {
      const string = '7khrkf3z64jcbu80i5rvv629o'
      const keyAlias = KeyAlias.fromString(string)
      keyAlias.buf.toString('hex').should.equal('7fda9cf020c16cacf529c87d8de89bfc')
    })
  })

  describe('#toJSON', () => {
    it('should produce this known value', () => {
      const string = '7khrkf3z64jcbu80i5rvv629o'
      const keyAlias = KeyAlias.fromString(string)
      keyAlias.toJSON().should.equal('"7khrkf3z64jcbu80i5rvv629o"')
    })
  })

  describe('@fromJSON', () => {
    it('should produce this known value', () => {
      const string = '7khrkf3z64jcbu80i5rvv629o'
      const keyAlias = KeyAlias.fromString(string)
      keyAlias.toJSON().should.equal('"7khrkf3z64jcbu80i5rvv629o"')
      const keyAlias2 = KeyAlias.fromJSON(keyAlias.toJSON())
      keyAlias2.toString().should.equal(string)
    })
  })
})
