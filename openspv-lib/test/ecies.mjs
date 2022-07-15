/* global describe,it */
import { Ecies } from '../src/ecies.mjs'
import should from 'should'
import { KeyPair } from '../src/key-pair.mjs'
import { PrivKey } from '../src/priv-key.mjs'
import { Hash } from '../src/hash.mjs'

describe('#Ecies', function () {
  it('should make a new Ecies object', function () {
    should.exist(Ecies)
  })

  const fromkey = new KeyPair().fromRandom()
  const tokey = new KeyPair().fromRandom()
  const messageBuf = Hash.sha256(
    Buffer.from('my message is the hash of this string')
  )

  describe('@bitcoreEncrypt', function () {
    it('should return a buffer', function () {
      const encBuf = Ecies.bitcoreEncrypt(messageBuf, tokey.pubKey, fromkey)
      Buffer.isBuffer(encBuf).should.equal(true)
    })

    it('should return a buffer if fromkey is not present', function () {
      const encBuf = Ecies.bitcoreEncrypt(messageBuf, tokey.pubKey)
      Buffer.isBuffer(encBuf).should.equal(true)
    })
  })

  describe('@bitcoreDecrypt', function () {
    it('should decrypt that which was encrypted', function () {
      const encBuf = Ecies.bitcoreEncrypt(messageBuf, tokey.pubKey, fromkey)
      const messageBuf2 = Ecies.bitcoreDecrypt(encBuf, tokey.privKey)
      messageBuf2.toString('hex').should.equal(messageBuf.toString('hex'))
    })

    it('should decrypt that which was encrypted if fromKeyPair was randomly generated', function () {
      const encBuf = Ecies.bitcoreEncrypt(messageBuf, tokey.pubKey)
      const messageBuf2 = Ecies.bitcoreDecrypt(encBuf, tokey.privKey)
      messageBuf2.toString('hex').should.equal(messageBuf.toString('hex'))
    })
  })

  describe('Electrum Ecies', function () {
    const alicePrivKey = PrivKey.fromString('L1Ejc5dAigm5XrM3mNptMEsNnHzS7s51YxU7J61ewGshZTKkbmzJ')
    const aliceKeyPair = KeyPair.fromPrivKey(alicePrivKey)
    const bobPrivKey = PrivKey.fromString('KxfxrUXSMjJQcb3JgnaaA6MqsrKQ1nBSxvhuigdKRyFiEm6BZDgG')
    const bobKeyPair = KeyPair.fromPrivKey(bobPrivKey)

    it('should do these test vectors correctly', function () {
      const message = Buffer.from('this is my test message')

      Ecies.electrumDecrypt(Buffer.from('QklFMQOGFyMXLo9Qv047K3BYJhmnJgt58EC8skYP/R2QU/U0yXXHOt6L3tKmrXho6yj6phfoiMkBOhUldRPnEI4fSZXbiaH4FsxKIOOvzolIFVAS0FplUmib2HnlAM1yP/iiPsU=', 'base64'), alicePrivKey).toString().should.equal(message.toString())
      Ecies.electrumDecrypt(Buffer.from('QklFMQM55QTWSSsILaluEejwOXlrBs1IVcEB4kkqbxDz4Fap53XHOt6L3tKmrXho6yj6phfoiMkBOhUldRPnEI4fSZXbvZJHgyAzxA6SoujduvJXv+A9ri3po9veilrmc8p6dwo=', 'base64'), bobPrivKey).toString().should.equal(message.toString())

      Ecies.electrumEncrypt(message, bobKeyPair.pubKey, aliceKeyPair).toString('base64').should.equal('QklFMQM55QTWSSsILaluEejwOXlrBs1IVcEB4kkqbxDz4Fap53XHOt6L3tKmrXho6yj6phfoiMkBOhUldRPnEI4fSZXbvZJHgyAzxA6SoujduvJXv+A9ri3po9veilrmc8p6dwo=')
      Ecies.electrumEncrypt(message, aliceKeyPair.pubKey, bobKeyPair).toString('base64').should.equal('QklFMQOGFyMXLo9Qv047K3BYJhmnJgt58EC8skYP/R2QU/U0yXXHOt6L3tKmrXho6yj6phfoiMkBOhUldRPnEI4fSZXbiaH4FsxKIOOvzolIFVAS0FplUmib2HnlAM1yP/iiPsU=')
    })

    it('should encrypt and decrypt symmetrically with matching strings in ECDH noKey mode', function () {
      const message = Buffer.from('this is my ECDH test message')
      const ecdhMessageEncryptedBob = Ecies.electrumEncrypt(message, bobKeyPair.pubKey, aliceKeyPair, true)
      const ecdhMessageEncryptedAlice = Ecies.electrumEncrypt(message, aliceKeyPair.pubKey, bobKeyPair, true)
      ecdhMessageEncryptedBob.toString('base64').should.equal(ecdhMessageEncryptedAlice.toString('base64'))
      Ecies.electrumDecrypt(ecdhMessageEncryptedAlice, bobPrivKey, aliceKeyPair.pubKey).toString().should.equal('this is my ECDH test message')
      Ecies.electrumDecrypt(ecdhMessageEncryptedBob, alicePrivKey, bobKeyPair.pubKey).toString().should.equal('this is my ECDH test message')
    })
  })
})
