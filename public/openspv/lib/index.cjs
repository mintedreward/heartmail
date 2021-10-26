/**
 * OpenSPV
 * =======
 *
 * index.js is an example of how to build a bundle with OpenSPVLib. This
 * bundle includes the entire library, which uses the default configuration
 * (which is the same as Mainnet) and can be overridden. It also includes
 * Mainnet and Testnet configuration which are accessible even if you override
 * the defaults. It is not necessary to  use Yours Bitcoin this way, since you
 * probably do not use every component, and therefore do not need to include
 * every component into your project. You can simply directly require the
 * elements of the library you need, and, if your project is browser-based,
 * browserify your project. For instance:
 * const Address = require('@openspv/lib/src/address.mjs').
 */
'use strict'
if (!global._babelPolyfill) {
  require('babel-polyfill')
}
require('./src/config.mjs')

const OpenSPVLib = module.exports

OpenSPVLib.version = require('./package').version

// Main bitcoin library - bitcoin protocols, standards, cryptography, and
// utilities.
OpenSPVLib.Address = require('./src/address.mjs')
OpenSPVLib.Bip32 = require('./src/bip-32.mjs')
OpenSPVLib.Bip39 = require('./src/bip-39.mjs')
OpenSPVLib.Bn = require('./src/bn.mjs')
OpenSPVLib.Br = require('./src/br.mjs')
OpenSPVLib.Bsm = require('./src/bsm.mjs')
OpenSPVLib.Bw = require('./src/bw.mjs')
OpenSPVLib.Base58 = require('./src/base-58.mjs')
OpenSPVLib.Base58Check = require('./src/base-58-check.mjs')
OpenSPVLib.Block = require('./src/block.mjs')
OpenSPVLib.BlockHeader = require('./src/block-header.mjs')
OpenSPVLib.Constants = require('./src/constants.mjs')
OpenSPVLib.Ecdsa = require('./src/ecdsa.mjs')
OpenSPVLib.Hash = require('./src/hash.mjs')
OpenSPVLib.HashCache = require('./src/hash-cache.mjs')
OpenSPVLib.Interp = require('./src/interp.mjs')
OpenSPVLib.Inv = require('./src/inv.mjs')
OpenSPVLib.KeyPair = require('./src/key-pair.mjs')
OpenSPVLib.Merkle = require('./src/merkle.mjs')
OpenSPVLib.Msg = require('./src/msg.mjs')
OpenSPVLib.OpCode = require('./src/op-code.mjs')
OpenSPVLib.Point = require('./src/point.mjs')
OpenSPVLib.PrivKey = require('./src/priv-key.mjs')
OpenSPVLib.PubKey = require('./src/pub-key.mjs')
OpenSPVLib.Random = require('./src/random.mjs')
OpenSPVLib.Script = require('./src/script.mjs')
OpenSPVLib.Sig = require('./src/sig.mjs')
OpenSPVLib.SigOperations = require('./src/sig-operations.mjs')
OpenSPVLib.Struct = require('./src/struct.mjs')
OpenSPVLib.Tx = require('./src/tx.mjs')
OpenSPVLib.TxBuilder = require('./src/tx-builder.mjs')
OpenSPVLib.TxIn = require('./src/tx-in.mjs')
OpenSPVLib.TxOut = require('./src/tx-out.mjs')
OpenSPVLib.TxOutMap = require('./src/tx-out-map.mjs')
OpenSPVLib.TxVerifier = require('./src/tx-verifier.mjs')
OpenSPVLib.VarInt = require('./src/var-int.mjs')
OpenSPVLib.Version = require('./src/version.mjs')
OpenSPVLib.Workers = require('./src/workers.mjs')
OpenSPVLib.WorkersResult = require('./src/workers-result.mjs')
OpenSPVLib.cmp = require('./src/cmp.mjs')

// Encryption tools. Some bitcoin standards use Aes encryption, so that's why
// these are available.
OpenSPVLib.Ach = require('./src/ach.mjs')
OpenSPVLib.Aes = require('./src/aes.mjs')
OpenSPVLib.Aescbc = require('./src/aescbc.mjs')
OpenSPVLib.Cbc = require('./src/cbc.mjs')
OpenSPVLib.Ecies = require('./src/ecies.mjs')

// Dependencies, subject to change.
OpenSPVLib.deps = {}
OpenSPVLib.deps.aes = require('aes')
OpenSPVLib.deps.bnjs = require('bn.js')
OpenSPVLib.deps.bs58 = require('bs58')
OpenSPVLib.deps.Buffer = Buffer
OpenSPVLib.deps.elliptic = require('bitcoin-elliptic')
OpenSPVLib.deps.hashjs = require('hash.js')
OpenSPVLib.deps.pbkdf2compat = require('pbkdf2-compat')

// Mainnet classes for your convenience (in case default is not what you want).
const Mainnet = {}
Object.keys(OpenSPVLib).forEach(function (key) {
  Mainnet[key] = OpenSPVLib[key].Mainnet
    ? OpenSPVLib[key].Mainnet
    : OpenSPVLib[key]
})

// Testnet classes for your convenience (in case default is not what you want).
const Testnet = {}
Object.keys(OpenSPVLib).forEach(function (key) {
  Testnet[key] = OpenSPVLib[key].Testnet
    ? OpenSPVLib[key].Testnet
    : OpenSPVLib[key]
})

OpenSPVLib.Mainnet = Mainnet
OpenSPVLib.Testnet = Testnet

OpenSPVLib.browser = process.browser
OpenSPVLib.env = process.env
