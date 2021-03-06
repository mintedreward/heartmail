/* global describe,it */
'use strict'
import { Address } from '../src/address'
import { Bn } from '../src/bn'
import { Hash } from '../src/hash'
import { KeyPair } from '../src/key-pair'
import { PrivKey } from '../src/priv-key'
import { Script } from '../src/script'
import { Sig } from '../src/sig'
import { TxBuilder } from '../src/tx-builder'
import { TxOut } from '../src/tx-out'
import { TxVerifier } from '../src/tx-verifier'
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

  it('should spend script template: Satoshi Iterator', () => {
    /**
     * The idea of the Satoshi Iterator is that it is possible to propagate
     * state across many transactions using the following ideas:
     *
     * - Push spending transaction into input and derive sighash from known
     *   private key and k value to enforce output script template
     * - Use SIGHASH_SINGLE | SIGHASH_ANYONECANPAY to enforce only one output
     *   and allow any other inputs
     * - Once sighash is derived, and spending tx is checked, we can also push
     *   the paying tx to the stack, confirm the hash matches the input
     *   txid/vout, grab the state from the input, and then make sure the new
     *   input is the same but plus one (state = state + 1) to iterate
     * - The value (amount of Bitcoin) stays the exact same from input -> output
     *   (1000 satoshis)
     * - The transaction must be funded, with fees, by other inputs
     *
     * This form of the iterator is designed to iterate forever.
     *
     * Input script pseudocode:
     *
     * [state] [paying-tx] [spending-tx] [pubkey] [sig]
     *
     * - state: a number starting with 0 and iterating without bound (0, 1, 2,
     *   3, 4, ...) from transaction to transaction forever
     * - paying-tx: the entire fully signed and valid paying transaction
     * - spending-tx: the spending transaction in a masked form. it must be the
     *   same form as that which is input into the sighash algorithm.
     *   essentially it consists of the input txid/vout and the output.
     * - pubkey: the pubkey corresponding to private key 1
     * - sig: the signature corresponding to private key 1, k value 1, and
     *   SIGHASH_SINGLE | SIGHASH_ANYONECANPAY
     *
     * Output script pseudocode:
     *
     * - Derive sighash of spending tx from sig
     * - Confirm spending-tx hashes to the sighash
     * - Extract input txid/vout (the txid/vout of the paying tx) from
     *   spending-tx
     * - Confirm hash of paying-tx is the same as the txid/vout
     * - Extract output from spending-tx
     * - Extract output from paying-tx
     * - Confirm output from spending-tx and paying-tx are the same
     * - If state is zero:
     *    - Extract input from paying tx and confirm input looks like p2pkh (two
     *      pushes and nothing else) because we have to start from somewhere
     * - Else:
     *    - Extract state from paying-tx and confirm the new state is the same
     *      but plus one (state = state + 1) ensuring iteration. It is the
     *      responsibility of the spender to put exactly the right state into
     *      the input or the tx is invalid.
     * - Return the new state
     *
     * How to derive the hash from the signature:
     *
     * z = hash
     * d = private key (set to 1 in this special case)
     * k = k value (set to 1 in this special case)
     *
     * A signature is the pair (r, s)
     *
     * From ECDSA, we know that:
     *
     * s = k^(-1) * (z + rd)
     *
     * Therefore,
     *
     * z = sk - rd
     *
     * We set:
     *
     * d = k = 1
     *
     * Therefore,
     *
     * z = s - r
     *
     * hash = z
     *
     * From time to time may be a small number and so we need to be sure to zero
     * pad it.
     */

    //  const inputScript = `
    //  ${state.length} 0x${state.toString('hex')}
    //  ${payingTx.length} 0x${payingTx.toString('hex')}
    //  ${spendingTx.length} 0x${spendingTx.toString('hex')}
    //  ${pubKey.length} 0x${pubKey.toString('hex')}
    //  ${sig.length} 0x${sig.toString('hex')}
    //  `

    //  const outputScript = `

    //  `
  })
})
