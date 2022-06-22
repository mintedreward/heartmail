import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'

export default function NotFoundPage () {
  return (
    <Layout title='Not found' showAccount={false}>
      <PageTitle>Not found</PageTitle>
      <p style={{ textAlign: 'center' }}>
        The page you have asked for could not be found.
      </p>
    </Layout>
  )
}
