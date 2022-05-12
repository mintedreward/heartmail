import Layout from '../components/Layout.js'
import PageTitle from '../components/PageTitle.js'

export default function Landing () {
  return (
    <Layout title='Privacy Policy'>
      <PageTitle>Privacy Policy</PageTitle>
      <p>We do not sell your data to third parties without your permission.</p>
      <p>We use cookies and local storage to track user sessions inside HeartMail. We may use cookies and local storage to track user sessions across the internet with your permission.</p>
      <p>You have the right to delete your data at any time.</p>
    </Layout>
  )
}
