import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'

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
    <Layout title='Sign in'>
      <PageTitle>Sign in</PageTitle>
      {beta
        ? (
          <p>Sign in is enabled.</p>
          )
        : (
          <p>Sign in is not enabled yet.</p>
          )}
    </Layout>
  )
}
