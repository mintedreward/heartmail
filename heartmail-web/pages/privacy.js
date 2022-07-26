import Layout from '../lib/components/Layout'
import PageTitle from '../lib/components/PageTitle'

export default function PrivacyPage () {
  return (
    <Layout title='Privacy Policy'>
      <PageTitle>Privacy Policy</PageTitle>
      <p>
        We do not sell your data to third parties without your permission.
      </p>
      <p>
        We may use cookies and local storage to track your sessions inside HeartMail.
        We may use cookies and local storage to track your sessions across the internet with your permission.
      </p>
      <p>
        You have the right to delete your data at any time.
        If you choose to delete your data, you must first transfer your assets to other users, or your assets may become irrecoverable.
      </p>
    </Layout>
  )
}
