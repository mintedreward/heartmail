import Layout from '../lib/components/Layout'
import PageTitle from '../lib/components/PageTitle'
import MoneyButtonSignIn from '../lib/components/MoneyButtonSignIn'
import MoneyButtonNewAccount from '../lib/components/MoneyButtonNewAccount'
import Link from '../lib/components/Link'

export default function SignInPage () {
  return (
    <Layout title='Sign In'>
      <PageTitle>Sign In</PageTitle>
      <MoneyButtonSignIn />
      <p>Don&#8217;t have an account yet? By buying an account, you agree to the <Link href='/terms'>Terms of Service</Link> and the <Link href='/privacy'>Privacy Policy</Link>.</p>
      <MoneyButtonNewAccount />
    </Layout>
  )
}
