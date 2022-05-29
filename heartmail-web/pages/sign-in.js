import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import MoneyButtonSignIn from '../components/MoneyButtonSignIn'

export function getServerSideProps (context) {
  const beta = context.query.beta === 'true'
  return {
    props: {
      beta
    }
  }
}

export default function SignInPage (props) {
  const beta = props.beta
  return (
    <Layout title='Sign in' beta={beta}>
      <PageTitle>Sign in</PageTitle>
      {beta
        ? (
          <MoneyButtonSignIn />
          )
        : (
          <p>Sign in is not enabled yet.</p>
          )}
    </Layout>
  )
}
