/* global describe,it */
'use strict'
import { Address } from '../lib/address'
import { Bn } from '../lib/bn'
import { Hash } from '../lib/hash'
import { KeyPair } from '../lib/key-pair'
import { PrivKey } from '../lib/priv-key'
import { Script } from '../lib/script'
import { Sig } from '../lib/sig'
import { TxBuilder } from '../lib/tx-builder'
import { TxOut } from '../lib/tx-out'
import { TxVerifier } from '../lib/tx-verifier'
import should from 'should'
/*
@CSW I am learning Forth. The way to define a function in Forth is something
like this:

: travelingsalesman [code]

This feature is not built into Bitcoin Script. 

However, one could imagine creating a fully-featured Forth interpreter than
compiles down to not just an individual script inside an input/output, but that
compiles down to a transaction DAG that is negotiated between multiple parties.

This is the Forth overlay network. It is very similar to Forth, except multiple
different parties can access the shared state rather than just one party. Each
party has their own keys.

In the Forth overlay network we can define functions. The way to reference a
function is by transaction ID and output number (txid/vout). The high-level
Forth interpreter can let you define the function and then create the txid/vout
that you can then use. The function is a script inside an output. Running the
function would look like this:

5 5 + travelingsalesman

The “+” would compiled directly to OP_ADD in Bitcoin Script. The
travelingsalesman function call however would have to do something different.
The input in this case would be 10 (equal to 5 + 5) into the travelingsalesman
function. So what we would need to do is take that value and put it into an
input in another transaction that spends the output containing the
travelingsalesman function.

The way this can work is that when a script ends, the return stack is used as
the input to the next script. The Forth interpreter takes the result of 5 5 +
and uses that as the input to the travelingsalesman function.

Thus, running this script actually involves at least two outputs. One for 5 5 +
and one for travelingsalesman.

We can do loops by iterating the sequence number of an input, or unrolling into
a single script. Any computation can be performed.

The difference with Bitcoin is that there is cash inside.

Suppose I am willing to pay 5 BSV to have the travelingsalesman function run.
Then I specify that like this:

5: travelingsalesman [code]

This is new syntax for Forth. Forth doesn't have cash, so I am suggesting the
way to fund code is to prefix it with the quantity of Bitcoin you are funding
the code with.

This uses one's existing UTXOs to create a new transaction with 5 BSV in an output
and the travelingsalesman function in the output. Anyone on the Forth overlay
network can see that there is a bounty for running some code called
"travelingsalesman". What is means to run the function is to find an input that
makes spending it valid.

Someone who is good at running part of travelingsalesman, but not all, can
create a transaction with dependencies. The input is travelingsalesman, with
two outputs specifing two subproblems, subproblem1 and subproblem2. If someone
solves both of those, then all three transactions become valid and everyone gets
their money.

          C1
A -> B ->
          C2

The output of A is travelingsalesman. The outputs of B are subproblems which
are solved by C1 and C2.

When solutions to C1 and C2 are found, the return values from those from those
are placed into the input for B, which solves A (travelingsalesman).

Thus, in this example, three different people collaborate to solve the
travelingsalesman problem posed by a fourth person.

Am I on the right track here? I can continue to brainstorm how to bring in
arbitrary computation & contracts using these additional features of Bitcoin:

* SIGHASH flags to constrain inputs/outputs and allow multiple parties to be
  involved
* OP_CODESEPARATOR to choose what parts of an output are enforced
* nLocktime to prevent a transaction from being published until some future date
* ANYONECANPAY to do the reverse of a bounty - pay me and I will run this code

-------------------------



*/

describe('Tx Experiments', function () {
  it('should exist', function () {
    should.exist(TxBuilder)
  })

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
