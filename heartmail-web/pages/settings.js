import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import SelfTabs from '../components/SelfTabs'
import TextField from '@mui/material/TextField'
import AffiliateCard from '../components/AffiliateCard'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import SignOut from '../components/SignOut'
import { withSessionSsr } from '../lib/session'

export const getServerSideProps = withSessionSsr(
  function getServerSideProps ({ req }) {
    const email = req.session?.email

    if (!email) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        email
      }
    }
  }
)

export default function SettingsPage () {
  return (
    <Layout title='Settings' account={null}>
      <PageTitle>Settings</PageTitle>
      <ContactCard avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <SelfTabs value={2} />
      <Card variant='outlined' sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', marginTop: '8px', marginBottom: '8px', borderColor: 'action.disabled' }}>
        <Avatar src='/casey.jpg' sx={{ width: 96, height: 96 }} />
      </Card>
      <TextField id='name' label='Name' defaultValue='Casey N. Hamilton' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='bio' label='Bio' defaultValue='Cofounder & COO of HeartMail' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='contactFeeAmountUsd' label='Contact Fee' defaultValue='$1.00' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='mbEmail' disabled label='External Email' defaultValue='casey@bethebroadcast.com' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='mbPaymail' disabled label='External Paymail' defaultValue='bethebroadcast@moneybutton.com' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='mbUserId' disabled label='Money Button User ID' defaultValue='12345' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <AffiliateCard heartmail='casey@heartmail.com' />
      <Box sx={{ textAlign: 'right', marginTop: '16px', marginBottom: '16px' }}>
        <Button disabled variant='text' ml='16px'>Delete account</Button>
        <Box sx={{ display: 'inline-block', width: '8px' }} />
        <SignOut />
      </Box>
    </Layout>
  )
}
