import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import MoneyButtonSignIn from '../components/MoneyButtonSignIn'
import MoneyButtonNewAccount from '../components/MoneyButtonNewAccount'
import Link from '../components/Link'

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
