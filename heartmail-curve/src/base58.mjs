import Bn from './bn.mjs'

export default class Base58 extends Bn {
  static alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

  static maxBase = this.alphabet.length

  static alphabetMap = this.getAlphabetMap()

  toString () {
    return this.toBase(58)
  }

  fromString (str) {
    return this.fromBase(str, 58)
  }

  static fromString (str) {
    return new this().fromString(str)
  }
}