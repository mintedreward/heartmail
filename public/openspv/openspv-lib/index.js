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
 * const Address = require('spv/src/address').
 */
'use strict'
if (!global._babelPolyfill) {
  require('babel-polyfill')
}
require('./src/config')

const OpenSPVLib = module.exports

OpenSPVLib.version = require('./package').version

// Main bitcoin library - bitcoin protocols, standards, cryptography, and
// utilities.
OpenSPVLib.Address = require('./src/address')
OpenSPVLib.Bip32 = require('./src/bip-32')
OpenSPVLib.Bip39 = require('./src/bip-39')
OpenSPVLib.Bn = require('./src/bn')
OpenSPVLib.Br = require('./src/br')
OpenSPVLib.Bsm = require('./src/bsm')
OpenSPVLib.Bw = require('./src/bw')
OpenSPVLib.Base58 = require('./src/base-58')
OpenSPVLib.Base58Check = require('./src/base-58-check')
OpenSPVLib.Block = require('./src/block')
OpenSPVLib.BlockHeader = require('./src/block-header')
OpenSPVLib.Constants = require('./src/constants')
OpenSPVLib.Ecdsa = require('./src/ecdsa')
OpenSPVLib.Hash = require('./src/hash')
OpenSPVLib.Interp = require('./src/interp')
OpenSPVLib.KeyPair = require('./src/key-pair')
OpenSPVLib.OpCode = require('./src/op-code')
OpenSPVLib.Point = require('./src/point')
OpenSPVLib.PrivKey = require('./src/priv-key')
OpenSPVLib.PubKey = require('./src/pub-key')
OpenSPVLib.Random = require('./src/random')
OpenSPVLib.Script = require('./src/script')
OpenSPVLib.Sig = require('./src/sig')
OpenSPVLib.Struct = require('./src/struct')
OpenSPVLib.Tx = require('./src/tx')
OpenSPVLib.TxBuilder = require('./src/tx-builder')
OpenSPVLib.TxIn = require('./src/tx-in')
OpenSPVLib.TxOut = require('./src/tx-out')
OpenSPVLib.TxOutMap = require('./src/tx-out-map')
OpenSPVLib.TxVerifier = require('./src/tx-verifier')
OpenSPVLib.VarInt = require('./src/var-int')
OpenSPVLib.Workers = require('./src/workers')
OpenSPVLib.WorkersResult = require('./src/workers-result')
OpenSPVLib.cmp = require('./src/cmp')

// Encryption tools. Some bitcoin standards use Aes encryption, so that's why
// these are available.
OpenSPVLib.Ach = require('./src/ach')
OpenSPVLib.Aes = require('./src/aes')
OpenSPVLib.Aescbc = require('./src/aescbc')
OpenSPVLib.Cbc = require('./src/cbc')
OpenSPVLib.Ecies = require('./src/ecies')

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
