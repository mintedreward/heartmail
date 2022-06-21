import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import MoneyButtonSignIn from '../components/MoneyButtonSignIn'
import { useRouter } from 'next/router'

export default function SignInPage () {
  const router = useRouter()

  async function signIn (payment) {
    const res = await fetch('/api/sign-in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ payment })
    })
    const email = await res.json()
    console.log(email)
    if (email) {
      router.push('/settings')
    }
  }

  return (
    <Layout title='Sign In' account={null}>
      <PageTitle>Sign In</PageTitle>
      <MoneyButtonSignIn onPayment={signIn} />
    </Layout>
  )
}
