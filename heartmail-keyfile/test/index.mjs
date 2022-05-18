import { Keyfile } from '../src/index.mjs'
import { PrivKey, Bn } from 'heartmail-lib'
import should from 'should'

describe('Keyfile', () => {
  it('should open', () => {
    should.exist(Keyfile)
  })

  describe('@passwordHmacFromPassword', () => {
    it('should hash to this value', () => {
      const password = 'password'
      const passwordHmac = Keyfile.passwordHmacFromPassword(password)
      passwordHmac.should.equal('783ab20a3f1924ad896c0533ebebda050c8400e3f7f5939ef4ad40935ac573c1')
    })
  })

  describe('@passwordHmacHmacFromPassword', () => {
    it('should hash to this value', () => {
      const password = 'password'
      const passwordHmac = Keyfile.passwordHmacHmacFromPassword(password)
      passwordHmac.should.equal('fc92e874d454d273b78c43c63d75bb1ddb591668776fd4e2202c39199b642559')
    })
  })

  describe('@encryptPrivKey', () => {
    it('should get this value', () => {
      const ivBuf = Buffer.from('06'.repeat(16), 'hex')
      const privKey = PrivKey.fromBn(new Bn(500))
      const password = 'password'
      const encryptedPrivKey = Keyfile.encryptPrivKey(privKey, password, ivBuf)
      encryptedPrivKey.should.equal('bf68168d5369685cdab862c752cf41521f2aeb36d910bfada878121119729781060606060606060606060606060606068f68386de74b481c2c37b28d441daaad8fd2604afbc875e834640b90051e72955990851680487adbeae0ec3909466b0a')
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
      encryptedPrivKey.should.equal('bf68168d5369685cdab862c752cf41521f2aeb36d910bfada878121119729781060606060606060606060606060606068f68386de74b481c2c37b28d441daaad8fd2604afbc875e834640b90051e72955990851680487adbeae0ec3909466b0a')
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
      Object.keys(keyfile.keysByPasswordHmacHmac).length.should.equal(1)
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
      jsonStr.should.equal('{"keysByPasswordHmacHmac":{"bf6a1c062394557f4b79211f969a0d178d0debfc6d336cbe919232a3d26f6c1e":{"186bbzwCAj6CcJqpB6og1Amifg2DGupMqn":"89cc76e96e9c2bd1d876a6dcd46b5dcd83cdeb8751218a25f792fcd0c3d4125807070707070707070707070707070707d93e79bad8700c64b6f184771e4cb4b30ea872638e454e41cab20c3e50bc4d283ee48300eb1bdeaf84bb63c83fe54745"}}}')
    })
  })

  describe('#changePassword', () => {
    it('should add a privKey and then change the password and then get the key', () => {
      const privKey = PrivKey.fromRandom()
      const password1 = 'password 1'
      const keyfile = new Keyfile()
      const address = keyfile.addPrivKey(privKey, password1)
      Object.keys(keyfile.keysByPasswordHmacHmac).length.should.equal(1)
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
      Object.keys(keyfile.keysByPasswordHmacHmac).length.should.equal(1)
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
      Object.keys(keyfile.keysByPasswordHmacHmac).length.should.equal(1)
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
