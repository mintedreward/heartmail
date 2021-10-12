/**
 * OpenSPV
 * =======
 *
 * index.js is an example of how to build a bundle with OpenSPV. This
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

const OpenSPV = module.exports

OpenSPV.version = require('./package').version

// Main bitcoin library - bitcoin protocols, standards, cryptography, and
// utilities.
OpenSPV.Address = require('./src/address')
OpenSPV.Bip32 = require('./src/bip-32')
OpenSPV.Bip39 = require('./src/bip-39')
OpenSPV.Bn = require('./src/bn')
OpenSPV.Br = require('./src/br')
OpenSPV.Bsm = require('./src/bsm')
OpenSPV.Bw = require('./src/bw')
OpenSPV.Base58 = require('./src/base-58')
OpenSPV.Base58Check = require('./src/base-58-check')
OpenSPV.Block = require('./src/block')
OpenSPV.BlockHeader = require('./src/block-header')
OpenSPV.Constants = require('./src/constants')
OpenSPV.Ecdsa = require('./src/ecdsa')
OpenSPV.Hash = require('./src/hash')
OpenSPV.Interp = require('./src/interp')
OpenSPV.KeyPair = require('./src/key-pair')
OpenSPV.OpCode = require('./src/op-code')
OpenSPV.Point = require('./src/point')
OpenSPV.PrivKey = require('./src/priv-key')
OpenSPV.PubKey = require('./src/pub-key')
OpenSPV.Random = require('./src/random')
OpenSPV.Script = require('./src/script')
OpenSPV.Sig = require('./src/sig')
OpenSPV.Struct = require('./src/struct')
OpenSPV.Tx = require('./src/tx')
OpenSPV.TxBuilder = require('./src/tx-builder')
OpenSPV.TxIn = require('./src/tx-in')
OpenSPV.TxOut = require('./src/tx-out')
OpenSPV.TxOutMap = require('./src/tx-out-map')
OpenSPV.TxVerifier = require('./src/tx-verifier')
OpenSPV.VarInt = require('./src/var-int')
OpenSPV.Workers = require('./src/workers')
OpenSPV.WorkersResult = require('./src/workers-result')
OpenSPV.cmp = require('./src/cmp')

// Encryption tools. Some bitcoin standards use Aes encryption, so that's why
// these are available.
OpenSPV.Ach = require('./src/ach')
OpenSPV.Aes = require('./src/aes')
OpenSPV.Aescbc = require('./src/aescbc')
OpenSPV.Cbc = require('./src/cbc')
OpenSPV.Ecies = require('./src/ecies')

// Dependencies, subject to change.
OpenSPV.deps = {}
OpenSPV.deps.aes = require('aes')
OpenSPV.deps.bnjs = require('bn.js')
OpenSPV.deps.bs58 = require('bs58')
OpenSPV.deps.Buffer = Buffer
OpenSPV.deps.elliptic = require('bitcoin-elliptic')
OpenSPV.deps.hashjs = require('hash.js')
OpenSPV.deps.pbkdf2compat = require('pbkdf2-compat')

// Mainnet classes for your convenience (in case default is not what you want).
const Mainnet = {}
Object.keys(OpenSPV).forEach(function (key) {
  Mainnet[key] = OpenSPV[key].Mainnet
    ? OpenSPV[key].Mainnet
    : OpenSPV[key]
})

// Testnet classes for your convenience (in case default is not what you want).
const Testnet = {}
Object.keys(OpenSPV).forEach(function (key) {
  Testnet[key] = OpenSPV[key].Testnet
    ? OpenSPV[key].Testnet
    : OpenSPV[key]
})

OpenSPV.Mainnet = Mainnet
OpenSPV.Testnet = Testnet

OpenSPV.browser = process.browser
OpenSPV.env = process.env
