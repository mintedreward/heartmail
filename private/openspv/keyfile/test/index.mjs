import { Keyfile } from '../src/index.mjs'
import { PrivKey, Bn } from '@openspv/lib'
import should from 'should'

describe('Keyfile', () => {
  it('should open', () => {
    should.exist(Keyfile)
  })

  describe('@passwordHashFromPassword', () => {
    it('should hash to this value', () => {
      const password = 'password'
      const passwordHash = Keyfile.passwordHashFromPassword(password)
      passwordHash.should.equal('e0c979c8c5cf3df1806d8b3ff56ac4afa7d58df2fa5315bef159261d393fa0be')
    })
  })

  describe('@passwordHashHashFromPassword', () => {
    it('should hash to this value', () => {
      const password = 'password'
      const passwordHash = Keyfile.passwordHashHashFromPassword(password)
      passwordHash.should.equal('59d3451b5f37c2519189977c9a2581822be60c278c065596e56f534810c32345')
    })
  })

  describe('@encryptPrivKey', () => {
    it('should get this value', () => {
      const ivBuf = Buffer.from('06'.repeat(16), 'hex')
      const privKey = PrivKey.fromBn(new Bn(500))
      const password = 'password'
      const encryptedPrivKey = Keyfile.encryptPrivKey(privKey, password, ivBuf)
      encryptedPrivKey.should.equal('44de80ba381723e7f846ea6c01cea71e65fb3471b3338d282c94cada8ee53a290606060606060606060606060606060640f1341010a05e2f947ca84dab18ca154338f56a9b39c96624a94e2d5cc9420d926ee849ba16d90c2feb048b2c547090')
    })

    it('should encrypt and decrypt without ivBuf', () => {
      const privKey = PrivKey.fromRandom()
      const password = 'password'
      const encryptedPrivKey = Keyfile.encryptPrivKey(privKey, password)
      const privKey2 = Keyfile.decryptPrivKey(encryptedPrivKey, password)
      privKey2.toString().should.equal(privKey.toString())
    })
  })
  
  describe('@decryptPrivKey', () => {
    it('should get this value', () => {
      const ivBuf = Buffer.from('06'.repeat(16), 'hex')
      const privKey = PrivKey.fromBn(new Bn(500))
      const password = 'password'
      const encryptedPrivKey = Keyfile.encryptPrivKey(privKey, password, ivBuf)
      encryptedPrivKey.should.equal('44de80ba381723e7f846ea6c01cea71e65fb3471b3338d282c94cada8ee53a290606060606060606060606060606060640f1341010a05e2f947ca84dab18ca154338f56a9b39c96624a94e2d5cc9420d926ee849ba16d90c2feb048b2c547090')
      const privKey2 = Keyfile.decryptPrivKey(encryptedPrivKey, password, ivBuf)
      privKey2.toString().should.equal(privKey.toString())
    })
  })

  describe('#addPrivKey', () => {
    it('should add a privKey', () => {
      const privKey = PrivKey.fromRandom()
      const password = 'password'
      const keyfile = new Keyfile()
      keyfile.addPrivKey(privKey, password)
      Object.keys(keyfile.keysByPasswordHashHash).length.should.equal(1)
    })

    it('should add a privKey and get the privKey back again', () => {
      const privKey = PrivKey.fromRandom()
      const password = 'password'
      const keyfile = new Keyfile()
      const address = keyfile.addPrivKey(privKey, password)
      const privKey2 = keyfile.getPrivKey(address, password)
      privKey2.toString().should.equal(privKey.toString())
    })

    it('should add a privKey and get exactly this data back again', () => {
      const privKey = PrivKey.fromBn(new Bn(501))
      const ivBuf = Buffer.from('07'.repeat(16), 'hex')
      const password = 'p4ssw0rd'
      const keyfile = new Keyfile()
      const address = keyfile.addPrivKey(privKey, password, ivBuf)
      const jsonStr = JSON.stringify(keyfile.toJSON())
      jsonStr.should.equal('{"keysByPasswordHashHash":{"41d2e53673e5b99ad93d8bbffcb9d2eb6dc088c09fe6cda7ed0dbb868edad793":{"186bbzwCAj6CcJqpB6og1Amifg2DGupMqn":"27bf795dcd74a11e0ca2e78701f0b5bdb621853621c20682eeb9df7564d071e407070707070707070707070707070707b44caf6a9b6bdc403171d646b775886c92be29b44f09c32ce80d170fd8600ce0bfd515d372711234b52f41aa5f85ac9b"}}}')
    })
  })

  describe('#changePassword', () => {
    it('should add a privKey and then change the password and then get the key', () => {
      const privKey = PrivKey.fromRandom()
      const password1 = 'password 1'
      const keyfile = new Keyfile()
      const address = keyfile.addPrivKey(privKey, password1)
      Object.keys(keyfile.keysByPasswordHashHash).length.should.equal(1)
      const password2 = 'password 2'
      const number = keyfile.changePassword(password1, password2)
      number.should.equal(1)
      const privKey2 = keyfile.getPrivKey(address, password2)
      privKey2.toString().should.equal(privKey.toString())
    })

    it('should add two privKeys and then change the password and then get the keys', () => {
      const privKey1 = PrivKey.fromRandom()
      const privKey2 = PrivKey.fromRandom()
      const password1 = 'password 1'
      const keyfile = new Keyfile()
      const address1 = keyfile.addPrivKey(privKey1, password1)
      const address2 = keyfile.addPrivKey(privKey2, password1)
      Object.keys(keyfile.keysByPasswordHashHash).length.should.equal(1)
      const password2 = 'password 2'
      const number = keyfile.changePassword(password1, password2)
      number.should.equal(2)
      const newPrivKey1 = keyfile.getPrivKey(address1, password2)
      newPrivKey1.toString().should.equal(privKey1.toString())
      const newPrivKey2 = keyfile.getPrivKey(address2, password2)
      newPrivKey2.toString().should.equal(privKey2.toString())
    })
  })

  describe('#toJSON / @fromJSON', () => {
    it('should go to and from json', () => {
      const privKey1 = PrivKey.fromRandom()
      const privKey2 = PrivKey.fromRandom()
      const password1 = 'password 1'
      const keyfile = new Keyfile()
      const address1 = keyfile.addPrivKey(privKey1, password1)
      const address2 = keyfile.addPrivKey(privKey2, password1)
      Object.keys(keyfile.keysByPasswordHashHash).length.should.equal(1)
      const password2 = 'password 2'
      const number = keyfile.changePassword(password1, password2)
      number.should.equal(2)
      const newPrivKey1 = keyfile.getPrivKey(address1, password2)
      newPrivKey1.toString().should.equal(privKey1.toString())
      const newPrivKey2 = keyfile.getPrivKey(address2, password2)
      newPrivKey2.toString().should.equal(privKey2.toString())

      const json = keyfile.toJSON()
      const keyfile2 = Keyfile.fromJSON(json)
      JSON.stringify(keyfile2.toJSON()).should.equal(JSON.stringify(json))
    })
  })
})
