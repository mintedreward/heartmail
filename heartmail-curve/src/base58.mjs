import Bn from './bn.mjs'

const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const alphabetMap = Bn.getAlphabetMap()

export default class Base58 extends Bn {
  toString () {
    return this.toBase(58, alphabet)
  }

  fromString (str) {
    return this.fromBase(str, 58, alphabetMap)
  }

  static fromString (str) {
    return new this().fromString(str)
  }
}