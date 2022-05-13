import Layout from '../components/Layout.js'
import PageTitle from '../components/PageTitle.js'
import AffiliateCard from '../components/AffiliateCard.js'

export default function Receipt () {
  const receiptId = '1234512345'
  const paymentAmount = '$10.00'
  const accessGrantedDate = 'June 16, 2022'
  const userEmail = 'name@example.com'
  const heartmail = `1234512345@${process.env.NEXT_PUBLIC_DOMAIN}`
  return (
    <Layout title={`Receipt ${receiptId}`}>
      <PageTitle>Receipt</PageTitle>
      <p>
        You have purchased early access to HeartMail for {paymentAmount}.
        Your access will be granted on {accessGrantedDate}.
      </p>
      <p>
        You will receive an email at this address when your access is granted:
      </p>
      <p>
        {userEmail}
      </p>
      <p>
        This web page is your receipt.
        You can bookmark this page.
      </p>
      <p>
        Earn at least $2.00 per referral with your affiliate link:
      </p>
      <AffiliateCard heartmail={heartmail} />
    </Layout>
  )
}
