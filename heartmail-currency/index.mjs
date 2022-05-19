'use strict'

export function prefix (amount = '$1.00') {
  amount = amount.replace(/\$/g, '')
  amount = `$${amount}`
  return amount
}

export function format (amount = '$1.00') {
  let [dollars, cents] = amount.split('.')

  dollars = dollars.replace(/[^0-9]/gi, '')
  if (dollars.length === 0) {
    dollars = '0'
  }

  cents = cents ? cents.replace(/[^0-9]/gi, '') : ''
  if (cents.length === 0) {
    cents = '00'
  } else if (cents.length === 1) {
    cents = `${cents}0`
  } else if (cents.length > 2) {
    cents = `${cents[0]}${cents[1]}`
  }

  amount = `$${dollars}.${cents}`
  return amount
}

export function getNumber (amount) {
  amount = format(amount)
  amount = amount.replace('$', '')
  return Number(amount)
}