import MoneyButtonBuyEarly from '../components/MoneyButtonBuyEarly'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout'
import Link from '../components/Link'
import CurrencyInput from '../components/CurrencyInput'
import { util } from 'heartmail-db'
import { useRouter } from 'next/router'

export async function getServerSideProps (context) {
  const affiliateEmail = context.query.a
  const affiliate = await util.getAffiliate(affiliateEmail)
  if (affiliate) {
    return {
      props: {
        affiliate
      }
    }
  } else {
    return {
      props: {
        affiliate: false
      }
    }
  }
}

export default function HomePage (props) {
  const router = useRouter()

  const state = {}
  state.affiliate = props.affiliate
  state.contactFeeAmountUsd = 1.00

  async function handlePayment (payment) {
    state.payment = payment
    // const accessId = await getAccess(state)
    await getAccess(state)
  }

  const handleChange = (contactFeeAmountUsd) => {
    state.contactFeeAmountUsd = contactFeeAmountUsd
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
        contactFeeAmountUsd: state.contactFeeAmountUsd,
        payment: state.payment
      })
    })
    const longId = await res.json()
    router.push(`/access/${longId}`)
  }

  return (
    <Layout>
      <Typography variant='h2' component='h2' mt='50px' mb='50px' sx={{ textAlign: 'center' }}>
        Get paid
      </Typography>
      <CurrencyInput onChange={handleChange} />
      <Typography variant='h2' component='h2' mb='50px' sx={{ textAlign: 'center' }}>
        per email
      </Typography>
      <p>
        HeartMail is email with a pay wall. Charge advertisers a contact fee to send you an email. Add your friends so they don&#8217;t have to pay.
      </p>
      <p>
        Random HeartMail addresses are free. Custom heartmails, such as [name]@heartmail.com, cost $1.00. You can have as many heartmails as you want and you can resell heartmails for any amount of money.
      </p>
      <p>
        HeartMail will launch June 20, 2022. You will be invited in the order you register. Join early to get privileged access to your custom heartmails.
      </p>
      <p>
        By buying early access, you agree to the <Link href='/terms'>Terms of Service</Link>.
      </p>
      <MoneyButtonBuyEarly affiliate={props.affiliate} onPayment={handlePayment} />
    </Layout>
  )
}
