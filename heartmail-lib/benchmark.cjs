const openspv = require('./dist/spv')

const KeyAddress = openspv.KeyAddress
const PrivKey = openspv.PrivKey
const PubKey = openspv.PubKey
const TxBuilder = openspv.TxBuilder
const TxOut = openspv.TxOut
const Random = openspv.Random
const Bn = openspv.Bn
const KeyPair = openspv.KeyPair

const randhex = 'adf4953b2e679fdc453d9cec93ba26c3bd9f0fb875975f3d72ed0c6c6835e26e'
const randbn = new Bn().fromHex(randhex)
const privateKey = PrivKey.fromBn(randbn)
const publicKey = PubKey.fromPrivKey(privateKey)
const keyPair = new KeyPair(privateKey, publicKey)
const fromKeyAddress = KeyAddress.fromPrivKey(privateKey)
const toKeyAddress = fromKeyAddress
const changeKeyAddress = toKeyAddress

const n = 10000
const satoshis = 1e3
// const total = satoshis * n - satoshis / 2
let txb = new TxBuilder()
for (let i = 0; i < n; i++) {
  const txOut = TxOut.fromProperties(new Bn(satoshis), fromKeyAddress.toTxOutScript())
  const txHashBuf = Random.getRandomBuffer(32)
  const txOutNum = 0
  txb.inputFromPubKeyHash(txHashBuf, txOutNum, txOut, publicKey)
}
txb = txb.outputToKeyAddress(new Bn(satoshis), toKeyAddress)
txb = txb.setChangeKeyAddress(changeKeyAddress)
txb.setFeePerKbNum(500)
const useAllInputs = true

{
  const start = Date.now()
  txb.build({ useAllInputs })
  const finish = Date.now()
  console.log('building: ', finish - start, 'ms')
}

{
  const start = Date.now()
  for (let i = 0; i < txb.txIns.length; i++) {
    txb.signTxIn(i, keyPair)
  }
  const finish = Date.now()
  console.log('', n, 'inputs', 'signing: ', finish - start, 'ms')
}
