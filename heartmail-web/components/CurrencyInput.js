import * as React from 'react'
import * as currency from 'openspv-currency'
import TextField from '@mui/material/TextField'

export default function CurrencyInput (props) {
  const sx = props.sx
  const defaultValue = props.defaultValue ? currency.format(`${props.defaultValue}`) : undefined || '$1.00'

  function propagateChange (amount = defaultValue) {
    amount = currency.getNumber(amount)
    props.onChange?.(amount)
  }

  const [amount, setAmount] = React.useState(defaultValue)
  const [hasFocus, setHasFocus] = React.useState(false)

  const handleChange = (event) => {
    const amount = event.target.value
    setAmount(currency.prefix(amount))
    propagateChange(amount)
  }

  const handleBlur = (event) => {
    const amount = event.target.value
    setAmount(currency.format(amount))
    setHasFocus(false)
    propagateChange(amount)
    props.onSave?.(currency.getNumber(amount))
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const amount = event.target.value
      setAmount(currency.format(amount))
      event.target.blur()
      propagateChange(amount)
    }
  }

  const handleMouseUp = (event) => {
    if (!hasFocus) {
      event.target.select()
    }
    setHasFocus(true)
    propagateChange(amount)
  }

  return (
    <TextField id='outlined-basic' label='Contact Fee' onChange={handleChange} onBlur={handleBlur} onMouseUp={handleMouseUp} onKeyPress={handleKeyPress} value={amount} variant='outlined' sx={sx} />
  )
}
