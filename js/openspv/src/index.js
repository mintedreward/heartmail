/**
 * OpenSPV
 * ===========
 *
 * entry.js is the entry point for a the js bundlers.
 * Webpack and microbundlers, both start use this file as
 * the entry point to bundle the entire srcrary.
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

// version string.
export { version } from '../package.json'

// Main bitcoin srcrary - bitcoin protocols, standards, cryptography, and
// utilities.
export * from './address'
export * from './bip-32'
export * from './bip-39'
export * from './bip-39-words'
export * from './bn'
export * from './br'
export * from './bsm'
export * from './bw'
export * from './base-58'
export * from './base-58-check'
export * from './block'
export * from './block-header'
export * from './constants'
export * from './ecdsa'
export * from './hash'
export * from './interp'
export * from './key-pair'
export * from './op-code'
export * from './point'
export * from './priv-key'
export * from './pub-key'
export * from './random'
export * from './script'
export * from './sig'
export * from './struct'
export * from './tx'
export * from './tx-builder'
export * from './tx-in'
export * from './tx-out'
export * from './tx-out-map'
export * from './tx-verifier'
export * from './var-int'
export * from './workers'
export * from './workers-result'
export * from './cmp'

// Encryption tools. Some bitcoin standards use Aes encryption, so that's why
// these are available.
export * from './ach'
export * from './aes'
export * from './aescbc'
export * from './cbc'
export * from './ecies'
