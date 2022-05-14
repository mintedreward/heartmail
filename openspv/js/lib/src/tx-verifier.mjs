/**
 * Transaction Verifier
 * ====================
 */
'use strict'

import { Bn } from './bn.mjs'
import { Block } from './block.mjs'
import { Interp } from './interp.mjs'
import { Struct } from './struct.mjs'
import { Tx } from './tx.mjs'

class TxVerifier extends Struct {
  constructor (tx, txOutMap, errStr, interp) {
    super({ tx, txOutMap, errStr, interp })
  }

  /**
     * Verifies that the transaction is valid both by performing basic checks, such
     * as ensuring that no two inputs are the same, as well as by verifying every
     * script. The two checks are checkStr, which is analagous to bitcoind's
     * CheckTransaction, and verifyStr, which runs the script interpreter.
     *
     * This does NOT check that any possible claimed fees are accurate; checking
     * that the fees are accurate requires checking that the input transactions are
     * valid, which is not performed by this test. That check is done with the
     * normal verify function.
     */
  verify (flags = Interp.SCRIPT_ENABLE_SIGHASH_FORKID) {
    return !this.checkStr() && !this.verifyStr(flags)
  }

  /**
     * Convenience method to verify a transaction.
     */
  static verify (tx, txOutMap, flags) {
    return new TxVerifier(tx, txOutMap).verify(flags)
  }

  /**
     * Check that a transaction passes basic sanity tests. If not, return a string
     * describing the error. This function contains the same logic as
     * CheckTransaction in bitcoin core.
     */
  checkStr () {
    // Basic checks that don't depend on any context
    if (this.tx.txIns.length === 0 || this.tx.txInsVi.toNumber() === 0) {
      this.errStr = 'transaction txIns empty'
      return this.errStr
    }
    if (this.tx.txOuts.length === 0 || this.tx.txOutsVi.toNumber() === 0) {
      this.errStr = 'transaction txOuts empty'
      return this.errStr
    }

    // Size limits
    if (this.tx.toBuffer().length > Block.MAX_BLOCK_SIZE) {
      this.errStr = 'transaction over the maximum block size'
      return this.errStr
    }

    // Check for negative or overflow output values
    let valueoutbn = new Bn(0)
    for (let i = 0; i < this.tx.txOuts.length; i++) {
      const txOut = this.tx.txOuts[i]
      if (txOut.valueBn.lt(0)) {
        this.errStr = 'transaction txOut ' + i + ' negative'
        return this.errStr
      }
      if (txOut.valueBn.gt(Tx.MAX_MONEY)) {
        this.errStr = 'transaction txOut ' + i + ' greater than MAX_MONEY'
        return this.errStr
      }
      valueoutbn = valueoutbn.add(txOut.valueBn)
      if (valueoutbn.gt(Tx.MAX_MONEY)) {
        this.errStr =
            'transaction txOut ' + i + ' total output greater than MAX_MONEY'
        return this.errStr
      }
    }

    // Check for duplicate inputs
    const txInmap = {}
    for (let i = 0; i < this.tx.txIns.length; i++) {
      const txIn = this.tx.txIns[i]
      const inputid = txIn.txHashBuf.toString('hex') + ':' + txIn.txOutNum
      if (txInmap[inputid] !== undefined) {
        this.errStr = 'transaction input ' + i + ' duplicate input'
        return this.errStr
      }
      txInmap[inputid] = true
    }

    if (this.tx.isCoinbase()) {
      const buf = this.tx.txIns[0].script.toBuffer()
      if (buf.length < 2 || buf.length > 100) {
        this.errStr = 'coinbase trasaction script size invalid'
        return this.errStr
      }
    } else {
      for (let i = 0; i < this.tx.txIns.length; i++) {
        if (this.tx.txIns[i].hasNullInput()) {
          this.errStr = 'transaction input ' + i + ' has null input'
          return this.errStr
        }
      }
    }
    return false
  }

  /**
     * verify the transaction inputs by running the script interpreter. Returns a
     * string of the script interpreter is invalid, otherwise returns false.
     */
  verifyStr (flags = Interp.SCRIPT_ENABLE_SIGHASH_FORKID) {
    for (let i = 0; i < this.tx.txIns.length; i++) {
      if (!this.verifyNIn(i, flags)) {
        this.errStr = 'input ' + i + ' failed script verify'
        return this.errStr
      }
    }
    return false
  }

  /**
     * Verify a particular input by running the script interpreter. Returns true if
     * the input is valid, false otherwise.
     */
  verifyNIn (nIn, flags) {
    const txIn = this.tx.txIns[nIn]
    const scriptSig = txIn.script
    const txOut = this.txOutMap.get(txIn.txHashBuf, txIn.txOutNum)
    if (!txOut) {
      console.log('output ' + txIn.txOutNum + ' not found')
      return false
    }
    const scriptPubKey = txOut.script
    const valueBn = txOut.valueBn
    this.interp = new Interp()
    const verified = this.interp.verify(
      scriptSig,
      scriptPubKey,
      this.tx,
      nIn,
      flags,
      valueBn
    )
    return verified
  }

  getDebugObject () {
    return {
      errStr: this.errStr,
      interpFailure: this.interp ? this.interp.getDebugObject() : undefined
    }
  }

  getDebugString () {
    return JSON.stringify(this.getDebugObject(), null, 2)
  }
}

export { TxVerifier }
