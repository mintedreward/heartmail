/**
 * Random Number Generator
 * =======================
 */

import randomBytes from 'randombytes'

class Random {}

Random.getRandomBuffer = function (size) {
  return randomBytes(size)
}

export { Random }
