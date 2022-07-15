import MoneyButtonNewAccount from '../components/MoneyButtonNewAccount'
import MoneyButtonSignIn from '../components/MoneyButtonSignIn'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout'
import Link from '../components/Link'
import CurrencyInput from '../components/CurrencyInput'
import { dbApi } from 'openspv-db'
import * as React from 'react'

export async function getServerSideProps (context) {
  const affiliateEmail = context.query.a
  const affiliate = await dbApi.getAffiliate(affiliateEmail)
  return {
    props: {
      affiliate
    }
  }
}

export default function HomePage (props) {
  const [contactFeeUsd, setContactFeeUsd] = React.useState(1.00)
  const affiliate = props.affiliate

  const handleChange = (contactFeeUsd) => {
    setContactFeeUsd(contactFeeUsd)
  }

  return (
    <Layout>
      <Typography variant='h2' component='h2' mt='48px' mb='48px' sx={{ textAlign: 'center', fontWeight: '300' }}>
        Get paid
      </Typography>
      <CurrencyInput onChange={handleChange} sx={{ width: '100%', marginBottom: '48px', '& .MuiOutlinedInput-input': { fontSize: 60, textAlign: 'center', fontWeight: '300' } }} />
      <Typography variant='h2' component='h2' mb='48px' sx={{ textAlign: 'center', fontWeight: '300' }}>
        per email
      </Typography>
      <p>
        HeartMail is email with a pay wall. Charge advertisers a contact fee to send you an email. Add your friends so they don&#8217;t have to pay.
      </p>
      <p>
        Random HeartMail addresses are free. Custom heartmails, such as [name]@heartmail.com, cost $1.00. You can have as many heartmails as you want and you can resell heartmails for any amount of money.
      </p>
      <p>
        HeartMail is under development. Join now to register your custom heartmails for free before general sales begin.
      </p>
      <p>
        By buying an account, you agree to the <Link href='/terms'>Terms of Service</Link> and the <Link href='/privacy'>Privacy Policy</Link>.
      </p>
      <MoneyButtonNewAccount affiliate={affiliate} contactFeeUsd={contactFeeUsd} />
      <p>
        Already have an account?
      </p>
      <MoneyButtonSignIn />
    </Layout>
  )
}
