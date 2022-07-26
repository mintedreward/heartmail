import Layout from '../lib/components/Layout'
import PageTitle from '../lib/components/PageTitle'
import { withSessionSsr } from '../lib/session'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }) {
    const accountId = req.session?.accountId
    const email = req.session?.email

    if (!accountId || !email) {
      return {
        redirect: {
          permanent: false,
          destination: '/sign-in'
        }
      }
    }

    return {
      props: {
        client: null
      }
    }
  }
)

export default function ClientPage (props) {
  const { account } = props

  return (
    <Layout title='Client' account={account}>
      <PageTitle>Client</PageTitle>
    </Layout>
  )
}
