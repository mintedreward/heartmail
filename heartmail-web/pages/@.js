import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import AffiliateCard from '../components/AffiliateCard'
import TextField from '@mui/material/TextField'

export default function AccountPage () {
  const receiptId = '1234512345'
  const accessGrantedDate = 'June 16, 2022 at 6:25 PM CDT'
  const userEmail = 'name@example.com'
  const heartmail = `1234512345@${process.env.NEXT_PUBLIC_DOMAIN}`
  return (
    <Layout title={`Account Key ${receiptId}`}>
      <PageTitle>Account Key</PageTitle>
      <p>
        This page grants access to HeartMail on  {accessGrantedDate} to this email address:
      </p>
      <TextField id='outlined-basic' label='External Email' disabled value={userEmail} sx={{ width: '100%' }} />
      <p>
        You can bookmark this page.
      </p>
      <p>
        Earn at least $2.00 per referral with your affiliate link:
      </p>
      <AffiliateCard heartmail={heartmail} />
    </Layout>
  )
}
