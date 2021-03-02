/* global describe,it,before */
'use strict'
import { Address } from '../lib/address'
import { Bn } from '../lib/bn'
import { Hash } from '../lib/hash'
import { Interp } from '../lib/interp'
import { KeyPair } from '../lib/key-pair'
import { PrivKey } from '../lib/priv-key'
import { PubKey } from '../lib/pub-key'
import { Script } from '../lib/script'
import { Sig } from '../lib/sig'
import { Tx } from '../lib/tx'
import { TxBuilder } from '../lib/tx-builder'
import { TxOut } from '../lib/tx-out'
import { TxOutMap } from '../lib/tx-out-map'
import { TxVerifier } from '../lib/tx-verifier'
import should from 'should'
import sinon from 'sinon'

describe('Tx Experiments', function () {
  it('should spend script template: Satoshi XOR', () => {
    // Satoshi XOR
    //
    // The Satoshi XOR script template is the idea that you can pay to an
    // address XOR'd with hashed data to force that data into the input. This
    // script template is itself not very useful, but the concept can be re-used
    // to propagate state in any script template. Therefore the concept is
    // extremely useful.

    // make address to send to
    const privKey1 = PrivKey.fromBn(new Bn(1))
    const keyPair1 = KeyPair.fromPrivKey(privKey1)
    const addr1 = Address.fromPubKey(keyPair1.pubKey)
    const state = new Bn(9000).toBuffer() // the state we are propagating is the number 9000
    const addr1StateHash = Hash.sha256Ripemd160(state)
    const addr1XorHashBuf = Buffer.from(addr1.hashBuf)
    for (let i = 0; i < addr1XorHashBuf.length; i++) {
      addr1XorHashBuf[i] ^= addr1StateHash[i]
    }
    const addr1Xor = Address.fromPubKeyHashBuf(addr1XorHashBuf)

    // script template Satoshi XOR
    const scriptout1 = new Script().fromString(
      `
      OP_HASH160
      OP_TOALTSTACK
      OP_DUP
      OP_HASH160
      OP_FROMALTSTACK
      OP_XOR
      20 0x${addr1Xor.hashBuf.toString('hex')}
      OP_EQUALVERIFY
      OP_CHECKSIG
      `
    )

    const outputScript0 = new Script()
    const txOut0 = TxOut.fromProperties(new Bn(3), outputScript0)
    const inputScript0 = new Script()

    const txb1 = new TxBuilder()
    txb1.setFeePerKbNum(1)
    txb1.setDust(0)
    txb1.setChangeAddress(addr1)
    const txHashBuf0 = Buffer.alloc(32)
    txHashBuf0.fill(0)
    const txOutNum0 = 0
    txb1.inputFromScript(txHashBuf0, txOutNum0, txOut0, inputScript0, keyPair1.pubKey)
    // because we aren't signing it, this tx is invalid. but we don't care. it
    // is the next tx we are really testing and will bother to correctly sign.
    txb1.outputToScript(new Bn(2), scriptout1)
    txb1.build({ useAllInputs: true })

    // to spend it, we must input:
    // [signature][pubkey][state]
    const txb2 = new TxBuilder()
    txb2.setFeePerKbNum(1)
    txb2.setDust(0)
    txb2.setChangeAddress(addr1)
    const txHashBuf1 = txb1.tx.hash()
    const txOutNum1 = 0
    const txOut1 = txb1.txOuts[0]
    const nSequence2 = undefined
    const inputScript1 = new Script().fromString(
      `
      0
      0
      ${state.length} 0x${state.toString('hex')}
      `
    )
    txb2.inputFromScript(txHashBuf1, txOutNum1, txOut1, inputScript1, nSequence2)
    const nHashType2 = Sig.SIGHASH_ALL | Sig.SIGHASH_FORKID
    txb2.addSigOperation(txHashBuf1, txOutNum1, 0, 'sig', addr1.toString(), nHashType2)
    txb2.addSigOperation(txHashBuf1, txOutNum1, 1, 'pubKey', addr1.toString())
    txb2.build({ useAllInputs: true })
    txb2.signWithKeyPairs([keyPair1])

    // TxVerifier.verify(txb2.tx, txb2.uTxOutMap).should.equal(true)

    const txVerifier = new TxVerifier(txb2.tx, txb2.uTxOutMap)
    const str = txVerifier.verifyStr()

    str.should.equal(false)
  })
})
