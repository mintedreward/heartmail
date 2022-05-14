import MoneyButtonBuyEarly from '../components/MoneyButtonBuyEarly.js'
import Typography from '@mui/material/Typography'
import Layout from '../components/Layout.js'
import Link from '../components/Link.js'
import CurrencyInput from '../components/CurrencyInput.js'

export async function getServerSideProps(context) {
  const affiliateHeartmail = context.query.a

  let affiliatePaymail = ''

  if (affiliateHeartmail === 'self') {
    affiliatePaymail = 'heartmail@moneybutton.com'
  } else if (affiliateHeartmail) {
    // get affiliatePaymail from DB
  }

  return {
    props: {
      affiliatePaymail
    }
  }
}

export default function Home (props) {
  const affiliatePaymail = props.affiliatePaymail

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
      <MoneyButtonBuyEarly affiliatePaymail={affiliatePaymail} />
    </Layout>
  )
}
