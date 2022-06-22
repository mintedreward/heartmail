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
import dbApi from 'heartmail-db/db-api/db-api'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }) {
    const accountId = req.session?.accountId
    const email = req.session?.email

    if (!accountId || !email) {
      return {
        notFound: true
      }
    }

    const account = await dbApi.getAccount(accountId)
    const accountJSON = account.toJSON()

    return {
      props: {
        account: accountJSON,
        email
      }
    }
  }
)

export default function SettingsPage (props) {
  const { account, email } = props
  return (
    <Layout title='Settings' account={null}>
      <PageTitle>Settings</PageTitle>
      <ContactCard avatar='/casey.jpg' name={account.name} heartmail={account.heartmail} bio={account.bio} />
      <SelfTabs value={2} />
      <Card variant='outlined' sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', marginTop: '8px', marginBottom: '8px', borderColor: 'action.disabled' }}>
        <Avatar src='/casey.jpg' sx={{ width: 96, height: 96 }} />
      </Card>
      <TextField id='name' label='Name' defaultValue={account.name} variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='bio' label='Bio' defaultValue={account.bio} variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='contactFeeAmountUsd' label='Contact Fee' defaultValue='$1.00' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='mbEmail' disabled label='External Email' defaultValue={account.email} variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='mbPaymail' disabled label='External Paymail' defaultValue={account.paymail} variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='mbUserId' disabled label='Authentication Email' defaultValue={email} variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <AffiliateCard heartmail={account.heartmail} />
      <Box sx={{ textAlign: 'right', marginTop: '16px', marginBottom: '16px' }}>
        <Button disabled variant='text' ml='16px'>Delete account</Button>
        <Box sx={{ display: 'inline-block', width: '8px' }} />
        <SignOut />
      </Box>
    </Layout>
  )
}
