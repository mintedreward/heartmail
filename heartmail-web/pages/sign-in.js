import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import MoneyButtonSignIn from '../components/MoneyButtonSignIn'

export default function SignInPage () {
  return (
    <Layout title='Sign in' account={null}>
      <PageTitle>Sign in</PageTitle>
      <MoneyButtonSignIn />
    </Layout>
  )
}
