import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import MoneyButtonSignIn from '../components/MoneyButtonSignIn'

export function getServerSideProps (context) {
  const featureFlagMilestone3 = context.query.featureFlagMilestone3 === 'true'
  return {
    props: {
      featureFlagMilestone3
    }
  }
}

export default function SignInPage (props) {
  const featureFlagMilestone3 = props.featureFlagMilestone3
  return (
    <Layout title='Sign in' featureFlagMilestone3={featureFlagMilestone3}>
      <PageTitle>Sign in</PageTitle>
      {featureFlagMilestone3
        ? (
          <MoneyButtonSignIn />
          )
        : (
          <p>Sign in is not enabled yet.</p>
          )}
    </Layout>
  )
}
