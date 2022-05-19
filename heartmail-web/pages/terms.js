import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'

export default function TermsPage () {
  return (
    <Layout title='Terms of Service'>
      <PageTitle>Terms of Service</PageTitle>
      <p>You are a user of HeartMail. We are HeartMail Inc.</p>
      <p>You are the custodian of your money, not us.</p>
      <p>You are responsible for paying your taxes, not us.</p>
      <p>
        You must not use HeartMail to publish obscene content.
        If you do, we have the right to delete your accounts, which may cause your assets to become irrecoverable.
      </p>
      <p>
        If you give people an affiliate link and they create a paying account then you are an affiliate.
        Affiliates earn 20% of HeartMail&#8217;s revenue for that account.
        Affiliates must continue to help the users they onboard to use HeartMail or we have the right to terminate the affiliate relationship.
      </p>
      <p>
        We have the right to update the Terms of Service at any time.
        We may ask you to agree to the updated Terms of Service.
        You may be prohibited from using HeartMail until you agree.
      </p>
    </Layout>
  )
}
