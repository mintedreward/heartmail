/**
 * Coasian SPV
 * ===========
 *
 * index.js is an example of how to build a bundle with spv. This
 * bundle includes the entire library, which uses the default configuration
 * (which is the same as Mainnet) and can be overridden. It also includes
 * Mainnet and Testnet configuration which are accessible even if you override
 * the defaults. It is not necessary to  use Yours Bitcoin this way, since you
 * probably do not use every component, and therefore do not need to include
 * every component into your project. You can simply directly require the
 * elements of the library you need, and, if your project is browser-based,
 * browserify your project. For instance:
 * const Address = require('spv/lib/address').
 */
'use strict'
if (!global._babelPolyfill) {
  require('babel-polyfill')
}
require('./lib/config')

const spv = module.exports

spv.version = require('./package').version

// Main bitcoin library - bitcoin protocols, standards, cryptography, and
// utilities.
spv.Address = require('./lib/address')
spv.Bip32 = require('./lib/bip-32')
spv.Bip39 = require('./lib/bip-39')
spv.Bn = require('./lib/bn')
spv.Br = require('./lib/br')
spv.Bsm = require('./lib/bsm')
spv.Bw = require('./lib/bw')
spv.Base58 = require('./lib/base-58')
spv.Base58Check = require('./lib/base-58-check')
spv.Block = require('./lib/block')
spv.BlockHeader = require('./lib/block-header')
spv.Constants = require('./lib/constants')
spv.Ecdsa = require('./lib/ecdsa')
spv.Hash = require('./lib/hash')
spv.Interp = require('./lib/interp')
spv.KeyPair = require('./lib/key-pair')
spv.OpCode = require('./lib/op-code')
spv.Point = require('./lib/point')
spv.PrivKey = require('./lib/priv-key')
spv.PubKey = require('./lib/pub-key')
spv.Random = require('./lib/random')
spv.Script = require('./lib/script')
spv.Sig = require('./lib/sig')
spv.Struct = require('./lib/struct')
spv.Tx = require('./lib/tx')
spv.TxBuilder = require('./lib/tx-builder')
spv.TxIn = require('./lib/tx-in')
spv.TxOut = require('./lib/tx-out')
spv.TxOutMap = require('./lib/tx-out-map')
spv.TxVerifier = require('./lib/tx-verifier')
spv.VarInt = require('./lib/var-int')
spv.Workers = require('./lib/workers')
spv.WorkersResult = require('./lib/workers-result')
spv.cmp = require('./lib/cmp')

// Encryption tools. Some bitcoin standards use Aes encryption, so that's why
// these are available.
spv.Ach = require('./lib/ach')
spv.Aes = require('./lib/aes')
spv.Aescbc = require('./lib/aescbc')
spv.Cbc = require('./lib/cbc')
spv.Ecies = require('./lib/ecies')

// Dependencies, subject to change.
spv.deps = {}
spv.deps.aes = require('aes')
spv.deps.bnjs = require('bn.js')
spv.deps.bs58 = require('bs58')
spv.deps.Buffer = Buffer
spv.deps.elliptic = require('bitcoin-elliptic')
spv.deps.hashjs = require('hash.js')
spv.deps.pbkdf2compat = require('pbkdf2-compat')

// Mainnet classes for your convenience (in case default is not what you want).
const Mainnet = {}
Object.keys(spv).forEach(function (key) {
  Mainnet[key] = spv[key].Mainnet
    ? spv[key].Mainnet
    : spv[key]
})

// Testnet classes for your convenience (in case default is not what you want).
const Testnet = {}
Object.keys(spv).forEach(function (key) {
  Testnet[key] = spv[key].Testnet
    ? spv[key].Testnet
    : spv[key]
})

spv.Mainnet = Mainnet
spv.Testnet = Testnet

spv.browser = process.browser
spv.env = process.env
