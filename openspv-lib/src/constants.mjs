/**
 * Constants
 * =========
 */
'use strict'

const Constants = {}

Constants.Mainnet = {
  MaxSize: 0x02000000, // MAX_SIZE
  Port: 8333,
  Address: {
    pubKeyHash: 0x00,
    payToScriptHash: 0x05
  },
  Bip32: {
    pubKey: 0x0488b21e,
    privKey: 0x0488ade4
  },
  Block: {
    maxNBits: 0x1d00ffff,
    magicNum: 0xe3e1f3e8
  },
  Msg: {
    magicNum: 0xe3e1f3e8,
    versionBytesNum: 70015 // as of Bitcoin SV v1.0.5
  },
  PrivKey: {
    versionByteNum: 0x80
  },
  TxBuilder: {
    dust: 546, // number of satoshis that an output can't be less than
    feePerKbNum: 0.000005e8
  }
}

Constants.Default = Object.assign({}, Constants.Mainnet)

export { Constants }
