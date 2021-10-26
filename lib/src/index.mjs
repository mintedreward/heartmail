/**
 * OpenSPV
 * =======
 *
 * entry.js is the entry point for a the js bundlers.
 * Webpack and microbundlers, both start use this file as
 * the entry point to bundle the entire library.
 */
import aes from 'aes'
import bnjs from 'bn.js'
import bs58 from 'bs58'
import elliptic from 'bitcoin-elliptic'
import hashjs from 'hash.js'
import pbkdf2 from 'pbkdf2'

// Dependencies, subject to change.
const deps = {
  aes,
  bnjs,
  bs58,
  elliptic,
  hashjs,
  pbkdf2
}

export { deps }

// Main bitcoin library - bitcoin protocols, standards, cryptography, and
// utilities.
export * from './address.mjs'
export * from './bip-32.mjs'
export * from './bip-39.mjs'
export * from './bip-39-words.mjs'
export * from './bn.mjs'
export * from './br.mjs'
export * from './bsm.mjs'
export * from './bw.mjs'
export * from './base-58.mjs'
export * from './base-58-check.mjs'
export * from './block.mjs'
export * from './block-header.mjs'
export * from './constants.mjs'
export * from './ecdsa.mjs'
export * from './hash.mjs'
export * from './interp.mjs'
export * from './key-pair.mjs'
export * from './op-code.mjs'
export * from './point.mjs'
export * from './priv-key.mjs'
export * from './pub-key.mjs'
export * from './random.mjs'
export * from './script.mjs'
export * from './sig.mjs'
export * from './struct.mjs'
export * from './tx.mjs'
export * from './tx-builder.mjs'
export * from './tx-in.mjs'
export * from './tx-out.mjs'
export * from './tx-out-map.mjs'
export * from './tx-verifier.mjs'
export * from './var-int.mjs'
export * from './workers.mjs'
export * from './workers-result.mjs'
export * from './cmp.mjs'

// Encryption tools. Some bitcoin standards use Aes encryption, so that's why
// these are available.
export * from './ach.mjs'
export * from './aes.mjs'
export * from './aescbc.mjs'
export * from './cbc.mjs'
export * from './ecies.mjs'
