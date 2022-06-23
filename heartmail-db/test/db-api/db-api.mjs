/* global describe,it */
import dbApi from '../../db-api/db-api.mjs'
import DbMbAccount from '../../models/db-mb-account.mjs'
import DbAccount from '../../models/db-account.mjs'
import DbEmailAccount from '../../models/db-email-account.mjs'
import Account from '../../structs/account.mjs'
import { Bn, Random } from 'heartmail-lib'
import should from 'should'

const clientPaymentStr = `
{
  "id": "9664453",
  "createdAt": "2022-06-20T21:28:50.265Z",
  "updatedAt": "2022-06-20T21:28:51.070Z",
  "deletedAt": null,
  "userId": "6",
  "txid": "85a62ef0a23bed1433d2786de351e67ee7c87189a7b578ed21ee443254424d37",
  "normalizedTxid": "b0da34c7effb60df440891a3cc61657f65bd9d3b7e45be637f43d4610616e8b3",
  "amount": "1.0000",
  "currency": "USD",
  "satoshis": "1555752",
  "transactionId": null,
  "status": "RECEIVED",
  "statusDescription": null,
  "clientId": "117292",
  "buttonId": null,
  "buttonData": "MoneyButtonTip",
  "referrerUrl": "http://localhost:3000/",
  "browserUserAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.124 Safari/537.36 Edg/102.0.1245.44",
  "amountUsd": "1.0000",
  "inputAmountUsd": "27.1212",
  "inputAmountSatoshis": "42193863",
  "spendAmountUsd": "0.0001",
  "spendAmountSatoshis": "137",
  "feeAmountUsd": "0.0001",
  "feeAmountSatoshis": "137",
  "changeAmountUsd": "26.1211",
  "changeAmountSatoshis": "40637974",
  "rawtx": "0100000001e05cb9de6f2876901d5419715280b6045c90ac2738720ec273b27dcab59cef36010000006b483045022100d35351b891c06b0e1aaf4f75b51e46ecdcdfcef57c41b5f7d63efabcdd5acc1302204bb8b03aaf99f413453a32fda3f85b960d8c9522480962286358ad3b468fcd27412103f5aa5f238052ca7d60c274ba43ca70e8ebe43e8f6d2648061f57ae05bb3be0d2ffffffff0228bd1700000000001976a914cb610f06273d83d2f8c2a3a8ad76e5013c7279b688ac16166c02000000001976a91493c3dbb27710103c910fbf7908294b40f69bfec888ac00000000",
  "source": "INTERNAL",
  "cryptoOperations": [],
  "senderSignature": "IGLgG9Dd7rAk4R+e0LP0POTSrY2fui3w5YA81ZnYzYdjDsIovgQFm/W6cV9fXDRiWhKlAUTWHuIgbrxbCRbTeOM=",
  "senderPaymail": "ryan@moneybutton.com",
  "signaturePubkey": "0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2",
  "preserveOrder": false,
  "historyCreated": null,
  "isWalletRecovery": false,
  "user": {
      "id": "6",
      "createdAt": "2018-09-12T19:18:12.056Z",
      "updatedAt": "2022-05-12T07:45:00.678Z",
      "deletedAt": null,
      "activeWalletId": "1022",
      "email": "ryanxcharles@gmail.com",
      "name": "Ryan X. Charles",
      "defaultCurrency": "USD",
      "defaultLanguage": "en",
      "emailVerified": true,
      "gravatarKey": "17e6619ba42a009b25f1883641e64e1c",
      "onboardingCompletedAt": "2018-11-01T20:55:22.475Z",
      "mnemonicBackedUpAt": "2018-11-01T20:55:12.023Z",
      "activeHandleId": "3064",
      "receiveEmails": false,
      "bannedAt": null,
      "bio": "Founder of Money Button",
      "coinifyOfflineToken": "sPk4HZYPDPH6OVqRaLTOmh2Gaq27UiGr6gTbCTPOgOZAEB+XO7yhGFv8d1yNVQlu",
      "passwordAlreadySet": true,
      "lastFailedLoginAttemptAt": "2022-04-04T19:29:56.582Z",
      "loginAttemptsNumber": 0,
      "activeHandle": {
          "id": "3064",
          "createdAt": "2019-04-26T22:16:56.419Z",
          "updatedAt": "2019-04-26T22:16:56.419Z",
          "deletedAt": null,
          "userId": "6",
          "localPart": "ryan",
          "domain": "moneybutton.com",
          "onSale": false,
          "priceAmount": null,
          "priceCurrency": null
      }
  },
  "paymentOutputs": [
      {
          "id": "26301478",
          "createdAt": "2022-06-20T21:28:50.279Z",
          "updatedAt": "2022-06-20T21:28:50.504Z",
          "deletedAt": null,
          "paymentId": "9664453",
          "to": "ryan@moneybutton.com",
          "amount": "1",
          "currency": "USD",
          "satoshis": "1555752",
          "type": "PAYMAIL",
          "userId": "6",
          "address": null,
          "script": null,
          "amountUsd": "1",
          "paymailRecipientHandle": "ryan@moneybutton.com",
          "paymailSenderHandle": "ryan@moneybutton.com",
          "paymailSenderName": "Ryan X. Charles",
          "paymailPurpose": "Payment with Money Button",
          "paymailDt": "2022-06-20T21:28:50.031Z",
          "paymailPubkey": "0380a5d1b99a2b3adab57d2adf4a21aac246652aebd1a4da4668351074172b7ae2",
          "paymailSignature": "IHBR4em2FM1Lz4RK+R32XEkPxNx0RBCBhsZ6uBrtiXnTRo0JNArTFrrlXY9mIg9LIZqQdY9fXBkgr+tTC/WFmUI=",
          "paymailReference": "5304203f-1f9d-429b-bb70-858bcf74011f",
          "assetId": null,
          "assetOptions": null,
          "user": {
              "id": "6",
              "name": "Ryan X. Charles",
              "gravatarKey": "17e6619ba42a009b25f1883641e64e1c",
              "activeHandleId": "3064",
              "activeHandle": {
                  "id": "3064",
                  "createdAt": "2019-04-26T22:16:56.419Z",
                  "updatedAt": "2019-04-26T22:16:56.419Z",
                  "deletedAt": null,
                  "userId": "6",
                  "localPart": "ryan",
                  "domain": "moneybutton.com",
                  "onSale": false,
                  "priceAmount": null,
                  "priceCurrency": null
              },
              "defaultCurrency": "USD"
          }
      }
  ]
}
`

describe('dbApi', () => {
  it('should exist', () => {
    should.exist(dbApi.getAffiliate)
  })

  describe('#paymentIsNew', () => {
    it('should be true for new and false for not new', async () => {
      const mbPaymentId = Bn.fromBuffer(Random.getRandomBuffer(6)).toString()
      const mbPayment = {
        id: mbPaymentId,
        user: {
          email: 'name@example.com'
        },
        senderPaymail: 'name@example.com',
        txid: '00'.repeat(32),
        userId: '1'
      }

      let isNew = await dbApi.paymentIsNew(mbPayment)
      isNew.should.equal(true)
      isNew = await dbApi.paymentIsNew(mbPayment)
      isNew.should.equal(false)
    })
  })

  describe('#paymentIsSameOnServer', () => {
    it('should know this payment is the same server-side', async function () {
      this.timeout(5000)
      const payment = JSON.parse(clientPaymentStr)
      const isSameOnServer = await dbApi.paymentIsSameOnServer(payment)
      isSameOnServer.should.equal(true)
    })

    it('should know this payment is not the same server-side', async function () {
      this.timeout(5000)
      const payment = JSON.parse(clientPaymentStr)
      payment.paymentOutputs[0].amount = '1000'
      const isSameOnServer = await dbApi.paymentIsSameOnServer(payment)
      isSameOnServer.should.equal(false)
    })
  })

  describe('#paymentIsFromOurDomain', () => {
    it('should know this payment is from "our" domain', async () => {
      const payment = JSON.parse(clientPaymentStr)
      const isFromOurDomain = await dbApi.paymentIsFromOurDomain(payment)
      isFromOurDomain.should.equal(true)
    })

    it('should know this payment is not from "our" domain', async () => {
      const payment = JSON.parse(clientPaymentStr)
      payment.referrerUrl = 'https://www.alternatewebsite.com'
      const isFromOurDomain = await dbApi.paymentIsFromOurDomain(payment)
      isFromOurDomain.should.equal(false)
    })
  })

  describe('#createAccountWithPayment', () => {
    it('should create a new account and then an affiliate account', async () => {
      let affiliateId
      {
        const contactFeeUsd = 5.00
        const affiliate = null
        const mbPaymentId = Bn.fromBuffer(Random.getRandomBuffer(6)).toString()
        const mbPayment = {
          id: mbPaymentId,
          user: {
            email: 'name@example.com'
          },
          senderPaymail: 'name@example.com',
          txid: '00'.repeat(32),
          userId: '1'
        }
        const mbAccountId = await dbApi.createAccountWithPayment(contactFeeUsd, affiliate, mbPayment)
        mbAccountId.length.should.greaterThan(10)
        affiliateId = mbAccountId
      }

      {
        const affiliate = {
          id: affiliateId
        }
        const contactFeeUsd = 10.00
        const mbPaymentId = Bn.fromBuffer(Random.getRandomBuffer(6)).toString()
        const mbPayment = {
          id: mbPaymentId,
          user: {
            email: 'name2@example.com'
          },
          senderPaymail: 'name2@example.com',
          txid: '01'.repeat(32),
          userId: '2'
        }
        const mbAccountId = await dbApi.createAccountWithPayment(contactFeeUsd, affiliate, mbPayment)
        mbAccountId.length.should.greaterThan(10)
        mbAccountId.should.not.equal(affiliateId)
        const mbAccount = await dbApi.getMbAccount(mbAccountId)
        mbAccount.id.should.equal(mbAccountId)
        mbAccount.mbEmail.should.equal('name2@example.com')
        mbAccount.mbPaymail.should.equal('name2@example.com')
        mbAccount.mbTxid.should.equal('01'.repeat(32))
        mbAccount.mbUserId.should.equal('2')
        mbAccount.mbPaymentId.should.equal(mbPaymentId)
      }
    })
  })

  describe('#getDbAccountsFromEmail', () => {
    it('should return dbAccount, dbEmailAcounts for this email', async () => {
      const mbUserId = Random.getRandomBuffer(8).toString('hex')
      const oldSignInDate = new Date()
      oldSignInDate.setDate(new Date().getDate() - 15)
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.signedInAt = oldSignInDate
        dbEmailAccount.emailAccount.signedInAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.signedInAt = oldSignInDate
        dbEmailAccount.emailAccount.signedInAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }
      const { dbAccount, dbEmailAccounts } = await dbApi.getDbAccountsFromEmail(`${mbUserId}@moneybutton.com`)
      const account = dbAccount.account
      const emailAccounts = dbEmailAccounts.map(dbEmailAccount => dbEmailAccount.emailAccount)
      should.exist(account)
      account.signedInAt.toJSON().should.equal(oldSignInDate.toJSON())
      emailAccounts.length.should.equal(2)
      emailAccounts[0].signedInAt.toJSON().should.equal(oldSignInDate.toJSON())
      emailAccounts[1].signedInAt.toJSON().should.equal(oldSignInDate.toJSON())
    })
  })

  describe('#getAccountsFromEmail', () => {
    it('should get this account and these emailAccounts', async () => {
      const mbUserId = Random.getRandomBuffer(8).toString('hex')
      const oldSignInDate = new Date()
      oldSignInDate.setDate(new Date().getDate() - 15)
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.signedInAt = oldSignInDate
        dbEmailAccount.emailAccount.signedInAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.signedInAt = oldSignInDate
        dbEmailAccount.emailAccount.signedInAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }
      const { account, emailAccounts } = await dbApi.getAccountsFromEmail(`${mbUserId}@moneybutton.com`)
      should.exist(account)
      account.signedInAt.toJSON().should.equal(oldSignInDate.toJSON())
      emailAccounts.length.should.equal(2)
      emailAccounts[0].signedInAt.toJSON().should.equal(oldSignInDate.toJSON())
      emailAccounts[1].signedInAt.toJSON().should.equal(oldSignInDate.toJSON())
    })
  })

  describe('#signInAsEmail', () => {
    it('should return account, emailAccounts for this email', async () => {
      const mbUserId = Random.getRandomBuffer(8).toString('hex')
      const oldSignInDate = new Date()
      oldSignInDate.setDate(new Date().getDate() - 15)
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.createdAt = oldSignInDate
        dbEmailAccount.emailAccount.createdAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.createdAt = oldSignInDate
        dbEmailAccount.emailAccount.createdAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }
      const { account, emailAccounts } = await dbApi.signInAsEmail(`${mbUserId}@moneybutton.com`)
      should.exist(account)
      account.signedInAt.toJSON().should.not.equal(oldSignInDate.toJSON())
      emailAccounts.length.should.equal(2)
      emailAccounts[0].signedInAt.toJSON().should.not.equal(oldSignInDate.toJSON())
      emailAccounts[1].signedInAt.toJSON().should.not.equal(oldSignInDate.toJSON())
    })
  })

  describe('#signInWithPayment', () => {
    it('should return email, account, emailAccounts', async () => {
      const mbUserId = Random.getRandomBuffer(8).toString('hex')
      const oldSignInDate = new Date()
      oldSignInDate.setDate(new Date().getDate() - 15)
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.createdAt = oldSignInDate
        dbEmailAccount.emailAccount.createdAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.createdAt = oldSignInDate
        dbEmailAccount.emailAccount.createdAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }

      const dbApiMock = {
        signInWithPayment: dbApi.signInWithPayment,
        signInAsEmail: dbApi.signInAsEmail,
        paymentIsNew: () => true,
        paymentIsSameOnServer: () => true,
        paymentIsFromOurDomain: () => true
      }

      const payment = JSON.parse(clientPaymentStr)
      payment.userId = mbUserId
      const { email, account, emailAccounts } = await dbApiMock.signInWithPayment(payment)
      email.should.equal(`${mbUserId}@moneybutton.com`)
      should.exist(account)
      account.signedInAt.toJSON().should.not.equal(oldSignInDate.toJSON())
      emailAccounts.length.should.equal(2)
      emailAccounts[0].signedInAt.toJSON().should.not.equal(oldSignInDate.toJSON())
      emailAccounts[1].signedInAt.toJSON().should.not.equal(oldSignInDate.toJSON())
    })
  })

  describe('#switchAccount', () => {
    it('should update signedInDate for emailAccount, account', async () => {
      const mbUserId = Random.getRandomBuffer(8).toString('hex')
      const oldSignInDate = new Date()
      oldSignInDate.setDate(new Date().getDate() - 15)
      let accountId
      let emailAccount2
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        accountId = dbMbAccount.mbAccount.id
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.signedInAt = oldSignInDate
        dbEmailAccount.emailAccount.signedInAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
      }
      {
        const dbMbAccount = DbMbAccount.fromRandom()
        dbMbAccount.mbAccount.fromObject({
          accessGrantedAt: new Date(),
          affiliateId: '12345',
          contactFeeUsd: 1.00,
          mbEmail: 'name@example.com',
          mbPaymail: 'name@example.com',
          mbPaymentId: '1',
          mbTxid: '00'.repeat(32),
          mbIdentityKey: null,
          mbUserId,
          mbName: 'name',
          mbAvatarUrl: 'https://www.ryanxcharles.com/me.jpg'
        })
        const mbAccount = dbMbAccount.mbAccount
        const dbAccount = DbAccount.fromMbAccount(mbAccount)
        const dbEmailAccount = DbEmailAccount.fromMbAccount(mbAccount)
        dbAccount.account.signedInAt = oldSignInDate
        dbEmailAccount.emailAccount.signedInAt = oldSignInDate
        await dbAccount.insert()
        await dbEmailAccount.insert()
        emailAccount2 = dbEmailAccount.emailAccount
      }
      const { account, emailAccount } = await dbApi.switchAccount(`${mbUserId}@moneybutton.com`, accountId)
      should.exist(account)
      should.exist(emailAccount)
      account.signedInAt.toJSON().should.not.equal(oldSignInDate.toJSON())
      emailAccount.signedInAt.toJSON().should.not.equal(oldSignInDate.toJSON())
      emailAccount2.signedInAt.toJSON().should.equal(oldSignInDate.toJSON())
    })
  })

  describe('#updateAccountProfileSettings', () => {
    it('should insert, update, find one back again', async () => {
      const date = new Date()
      const dbAccount = DbAccount.fromRandom()
      dbAccount.account.fromObject({
        name: 'Name',
        heartmail: '12345@heartmail.com',
        bio: '',
        contactFeeUsd: 1.00,
        affiliateId: '1234',
        email: 'name@example.com',
        paymail: 'name@example.com',
        accessGrantedAt: date
      })
      await dbAccount.insert()

      const email = `${dbAccount.account.id}@moneybutton.com`

      const dbEmailAccount = DbEmailAccount.fromRandom()
      const emailAccount1 = dbEmailAccount.emailAccount
      dbEmailAccount.emailAccount.fromObject({
        email,
        accountId: dbAccount.account.id,
        accountName: dbAccount.account.name,
        accountBio: dbAccount.account.bio,
        accountHeartmail: dbAccount.account.heartmail
      })
      await dbEmailAccount.insert()

      const account1 = dbAccount.account
      const account2 = Account.fromJSON({
        id: dbAccount.account.id,
        bio: 'I love HeartMail'
      })

      await dbApi.updateAccountProfileSettings(email, account2)
      const dbAccount3 = await DbAccount.findOne(account1.id)
      const account3 = dbAccount3.account
      account3.bio.should.equal('I love HeartMail')
      account3.bio.should.not.equal(account1.bio)
      account3.bio.should.equal(account2.bio)
      account3.privKey.toString().should.equal(account1.privKey.toString())
      account3.name.should.equal(account1.name)
      account3.heartmail.should.equal(account1.heartmail)
      account3.contactFeeUsd.should.equal(account1.contactFeeUsd)
      account3.affiliateId.should.equal(account1.affiliateId)
      account3.email.should.equal(account1.email)
      account3.paymail.should.equal(account1.paymail)
      account3.accessGrantedAt.toJSON().should.equal(account1.accessGrantedAt.toJSON())
      account3.updatedAt.toJSON().should.equal(account1.updatedAt.toJSON())
      account3.createdAt.toJSON().should.equal(account1.createdAt.toJSON())
      account3.signedInAt.toJSON().should.equal(account1.signedInAt.toJSON())

      const dbEmailAccount2 = await DbEmailAccount.findOneWithAccountId(email, account2.id)
      const emailAccount2 = dbEmailAccount2.emailAccount
      emailAccount2.accountBio.should.equal('I love HeartMail')
      emailAccount2.accountName.should.equal(emailAccount1.accountName)
      emailAccount2.accountHeartmail.should.equal(emailAccount2.accountHeartmail)
      emailAccount2.accountId.should.equal(emailAccount2.accountId)
    })
  })

  describe('#getAccount', () => {
    it('should get an account', async () => {
      const dbAccount = DbAccount.fromRandom()
      await dbAccount.insert()
      const account = await dbApi.getAccount(dbAccount.account.id)
      should.exist(account.id)
      account.id.should.equal(dbAccount.account.id)
      ;(account.privKey === null).should.equal(true)
      ;(dbAccount.account.privKey === null).should.equal(false)
    })
  })

  describe('#getMbAccount', () => {
    it('should get an account', async () => {
      const dbMbAccount = DbMbAccount.fromRandom()
      await dbMbAccount.insert()
      const mbAccount = await dbApi.getMbAccount(dbMbAccount.mbAccount.id)
      should.exist(mbAccount.id)
      mbAccount.id.should.equal(dbMbAccount.mbAccount.id)
      ;(mbAccount.privKey === null).should.equal(true)
      ;(dbMbAccount.mbAccount.privKey === null).should.equal(false)
    })
  })

  describe('#getAffiliate', () => {
    it('should get an affiliate that exists', async function () {
      const dbMbAccount = DbMbAccount.create()
      dbMbAccount.mbAccount.fromObject({
        mbPaymail: 'name@example.com'
      })
      await dbMbAccount.insert()
      const affiliateHeartmail = `${dbMbAccount.mbAccount.id}@heartmail.com`
      const affiliate = await dbApi.getAffiliate(affiliateHeartmail)
      affiliate.hasAffiliate.should.equal(true)
      affiliate.id.should.equal(dbMbAccount.mbAccount.id)
      affiliate.mbPaymail.should.equal(dbMbAccount.mbAccount.mbPaymail)
    })
  })
})
