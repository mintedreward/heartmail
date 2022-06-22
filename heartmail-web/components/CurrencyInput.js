import * as React from 'react'
import * as currency from 'heartmail-currency'
import TextField from '@mui/material/TextField'

export default function CurrencyInput (props) {
  const onChange = props.onChange || function () {}

  function propagateChange (amount = '$1.00') {
    amount = currency.getNumber(amount)
    onChange(amount)
  }

  const [amount, setAmount] = React.useState('$1.00')
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
    <TextField id='outlined-basic' label='Contact Fee' onChange={handleChange} onBlur={handleBlur} onMouseUp={handleMouseUp} onKeyPress={handleKeyPress} value={amount} variant='outlined' sx={{ width: '100%', marginBottom: '48px', '& .MuiOutlinedInput-input': { fontSize: 60, textAlign: 'center', fontWeight: '300' } }} />
  )
}
