import MoneyButtonNewAccount from '../components/MoneyButtonNewAccount'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout'
import Link from '../components/Link'
import CurrencyInput from '../components/CurrencyInput'
import { dbApi } from 'heartmail-db'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  const state = {}
  state.affiliate = props.affiliate
  state.contactFeeUsd = 1.00

  async function handlePayment (payment) {
    state.payment = payment
    await getAccess(state)
  }

  const handleChange = (contactFeeUsd) => {
    state.contactFeeUsd = contactFeeUsd
  }

  async function getAccess (state) {
    const res = await fetch('/api/buy-early', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        affiliate: state.affiliate,
        contactFeeUsd: state.contactFeeUsd,
        payment: state.payment
      })
    })
    const id = await res.json()
    router.push(`/access/${id}`)
  }

  return (
    <Layout showAccount={false}>
      <Typography variant='h2' component='h2' mt='48px' mb='48px' sx={{ textAlign: 'center', fontWeight: '400' }}>
        Get paid
      </Typography>
      <CurrencyInput onChange={handleChange} />
      <Typography variant='h2' component='h2' mb='48px' sx={{ textAlign: 'center', fontWeight: '400' }}>
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
      <MoneyButtonNewAccount affiliate={props.affiliate} onPayment={handlePayment} />
    </Layout>
  )
}
