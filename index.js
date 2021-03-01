/**
 * coasianspv
 * ===
 *
 * index.js is an example of how to build a bundle with coasianspv. This
 * bundle includes the entire library, which uses the default configuration
 * (which is the same as Mainnet) and can be overridden. It also includes
 * Mainnet and Testnet configuration which are accessible even if you override
 * the defaults. It is not necessary to  use Yours Bitcoin this way, since you
 * probably do not use every component, and therefore do not need to include
 * every component into your project. You can simply directly require the
 * elements of the library you need, and, if your project is browser-based,
 * browserify your project. For instance:
 * const Address = require('coasianspv/lib/address').
 */
'use strict'
if (!global._babelPolyfill) {
  require('babel-polyfill')
}
require('./lib/config')

const coasianspv = module.exports

coasianspv.version = require('./package').version

// Main bitcoin library - bitcoin protocols, standards, cryptography, and
// utilities.
coasianspv.Address = require('./lib/address')
coasianspv.Bip32 = require('./lib/bip-32')
coasianspv.Bip39 = require('./lib/bip-39')
coasianspv.Bn = require('./lib/bn')
coasianspv.Br = require('./lib/br')
coasianspv.Bsm = require('./lib/bsm')
coasianspv.Bw = require('./lib/bw')
coasianspv.Base58 = require('./lib/base-58')
coasianspv.Base58Check = require('./lib/base-58-check')
coasianspv.Block = require('./lib/block')
coasianspv.BlockHeader = require('./lib/block-header')
coasianspv.Constants = require('./lib/constants')
coasianspv.Ecdsa = require('./lib/ecdsa')
coasianspv.Hash = require('./lib/hash')
coasianspv.Interp = require('./lib/interp')
coasianspv.KeyPair = require('./lib/key-pair')
coasianspv.OpCode = require('./lib/op-code')
coasianspv.Point = require('./lib/point')
coasianspv.PrivKey = require('./lib/priv-key')
coasianspv.PubKey = require('./lib/pub-key')
coasianspv.Random = require('./lib/random')
coasianspv.Script = require('./lib/script')
coasianspv.Sig = require('./lib/sig')
coasianspv.Struct = require('./lib/struct')
coasianspv.Tx = require('./lib/tx')
coasianspv.TxBuilder = require('./lib/tx-builder')
coasianspv.TxIn = require('./lib/tx-in')
coasianspv.TxOut = require('./lib/tx-out')
coasianspv.TxOutMap = require('./lib/tx-out-map')
coasianspv.TxVerifier = require('./lib/tx-verifier')
coasianspv.VarInt = require('./lib/var-int')
coasianspv.Workers = require('./lib/workers')
coasianspv.WorkersResult = require('./lib/workers-result')
coasianspv.cmp = require('./lib/cmp')

// Encryption tools. Some bitcoin standards use Aes encryption, so that's why
// these are available.
coasianspv.Ach = require('./lib/ach')
coasianspv.Aes = require('./lib/aes')
coasianspv.Aescbc = require('./lib/aescbc')
coasianspv.Cbc = require('./lib/cbc')
coasianspv.Ecies = require('./lib/ecies')

// Dependencies, subject to change.
coasianspv.deps = {}
coasianspv.deps.aes = require('aes')
coasianspv.deps.bnjs = require('bn.js')
coasianspv.deps.bs58 = require('bs58')
coasianspv.deps.Buffer = Buffer
coasianspv.deps.elliptic = require('bitcoin-elliptic')
coasianspv.deps.hashjs = require('hash.js')
coasianspv.deps.pbkdf2compat = require('pbkdf2-compat')

// Mainnet classes for your convenience (in case default is not what you want).
const Mainnet = {}
Object.keys(coasianspv).forEach(function (key) {
  Mainnet[key] = coasianspv[key].Mainnet
    ? coasianspv[key].Mainnet
    : coasianspv[key]
})

// Testnet classes for your convenience (in case default is not what you want).
const Testnet = {}
Object.keys(coasianspv).forEach(function (key) {
  Testnet[key] = coasianspv[key].Testnet
    ? coasianspv[key].Testnet
    : coasianspv[key]
})

coasianspv.Mainnet = Mainnet
coasianspv.Testnet = Testnet

coasianspv.browser = process.browser
coasianspv.env = process.env
