/**
 * Coasian SPV
 * ===========
 *
 * index.js is an example of how to build a bundle with spv. This
 * bundle includes the entire srcrary, which uses the default configuration
 * (which is the same as Mainnet) and can be overridden. It also includes
 * Mainnet and Testnet configuration which are accessible even if you override
 * the defaults. It is not necessary to  use Yours Bitcoin this way, since you
 * probably do not use every component, and therefore do not need to include
 * every component into your project. You can simply directly require the
 * elements of the srcrary you need, and, if your project is browser-based,
 * browserify your project. For instance:
 * const Address = require('spv/src/address').
 */
'use strict'
if (!global._babelPolyfill) {
  require('babel-polyfill')
}
require('./src/config')

const spv = module.exports

spv.version = require('./package').version

// Main bitcoin srcrary - bitcoin protocols, standards, cryptography, and
// utilities.
spv.Address = require('./src/address')
spv.Bip32 = require('./src/bip-32')
spv.Bip39 = require('./src/bip-39')
spv.Bn = require('./src/bn')
spv.Br = require('./src/br')
spv.Bsm = require('./src/bsm')
spv.Bw = require('./src/bw')
spv.Base58 = require('./src/base-58')
spv.Base58Check = require('./src/base-58-check')
spv.Block = require('./src/block')
spv.BlockHeader = require('./src/block-header')
spv.Constants = require('./src/constants')
spv.Ecdsa = require('./src/ecdsa')
spv.Hash = require('./src/hash')
spv.Interp = require('./src/interp')
spv.KeyPair = require('./src/key-pair')
spv.OpCode = require('./src/op-code')
spv.Point = require('./src/point')
spv.PrivKey = require('./src/priv-key')
spv.PubKey = require('./src/pub-key')
spv.Random = require('./src/random')
spv.Script = require('./src/script')
spv.Sig = require('./src/sig')
spv.Struct = require('./src/struct')
spv.Tx = require('./src/tx')
spv.TxBuilder = require('./src/tx-builder')
spv.TxIn = require('./src/tx-in')
spv.TxOut = require('./src/tx-out')
spv.TxOutMap = require('./src/tx-out-map')
spv.TxVerifier = require('./src/tx-verifier')
spv.VarInt = require('./src/var-int')
spv.Workers = require('./src/workers')
spv.WorkersResult = require('./src/workers-result')
spv.cmp = require('./src/cmp')

// Encryption tools. Some bitcoin standards use Aes encryption, so that's why
// these are available.
spv.Ach = require('./src/ach')
spv.Aes = require('./src/aes')
spv.Aescbc = require('./src/aescbc')
spv.Cbc = require('./src/cbc')
spv.Ecies = require('./src/ecies')

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
