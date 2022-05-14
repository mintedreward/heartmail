import * as React from 'react'
import MoneyButtonInfo from '../components/MoneyButtonInfo.js'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Layout from '../components/Layout.js'
import Link from '../components/Link.js'
import * as currency from 'heartmail-currency'

function CurrencyInput () {
  const [amount, setAmount] = React.useState('$1.00')
  const [hasFocus, setHasFocus] = React.useState(false)

  const handleChange = (event) => {
    const amount = event.target.value
    setAmount(currency.prefix(amount))
  }

  const handleBlur = (event) => {
    const amount = event.target.value
    setAmount(currency.format(amount))
    setHasFocus(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const amount = event.target.value
      setAmount(currency.format(amount))
      event.target.blur()
    }
  }

  const handleMouseUp = (event) => {
    if (!hasFocus) {
      event.target.select()
    }
    setHasFocus(true)
  }

  return (
    <TextField id='outlined-basic' label='Contact Fee' onChange={handleChange} onBlur={handleBlur} onMouseUp={handleMouseUp} onKeyPress={handleKeyPress} value={amount} variant='outlined' sx={{ width: '100%', marginBottom: '50px', '& .MuiOutlinedInput-input': { fontSize: 60, textAlign: 'center', fontWeight: 300 } }} />
  )
}

export default function Landing () {
  return (
    <Layout>
      <Typography variant='h2' component='h2' mt='50px' mb='50px' sx={{ textAlign: 'center' }}>
        Get paid
      </Typography>
      <CurrencyInput />
      <Typography variant='h2' component='h2' mb='50px' sx={{ textAlign: 'center' }}>
        per email
      </Typography>
      <p>
        HeartMail is email with a pay wall. Charge advertisers a contact fee to send you an email. Add your friends so they don&#8217;t have to pay.
      </p>
      <p>
        Random heartmails are free. Custom heartmails, such as [name]@heartmail.com, cost $1.00. You can have as many heartmails as you want and you can resell heartmails for any amount of money.
      </p>
      <p>
        HeartMail will launch June 15, 2022. You will be invited in the order you register. Join early to get privileged access to your custom heartmails.
      </p>
      <p>
        By buying early access, you agree to the <Link href='/terms'>Terms of Service</Link>.
      </p>
      <MoneyButtonInfo label='You need a referral.' />
    </Layout>
  )
}
