/* global describe,it */
import dbApi from '../../db-api/db-api.mjs'
import DbMbAccount from '../../models/db-mb-account.mjs'
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

  describe('#paymentIsServerSide', () => {
    it('should know this payment is the same server-side', async function () {
      this.timeout(5000)
      const payment = JSON.parse(clientPaymentStr)
      const isServerSide = await dbApi.paymentIsServerSide(payment)
      isServerSide.should.equal(true)
    })

    it('should know this payment is not the same server-side', async function () {
      this.timeout(5000)
      const payment = JSON.parse(clientPaymentStr)
      payment.paymentOutputs[0].amount = '1000'
      const isServerSide = await dbApi.paymentIsServerSide(payment)
      isServerSide.should.equal(false)
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
