import { Bip39 } from './bip-39.mjs'
import { wordList } from './bip-39-en-wordlist.mjs'

class Bip39En extends Bip39 {
  constructor (mnemonic, seed) {
    super(mnemonic, seed, wordList)
  }
}

export { Bip39En }
