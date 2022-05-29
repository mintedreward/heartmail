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

export default function SettingsPage () {
  return (
    <Layout title='Settings' account={null}>
      <PageTitle>Settings</PageTitle>
      <ContactCard avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <SelfTabs value={2} />
      <Card variant='outlined' sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px', marginTop: '8px', marginBottom: '8px', borderColor: 'action.disabled' }}>
        <Avatar src='/casey.jpg' sx={{ width: 100, height: 100 }} />
      </Card>
      <TextField id='name' label='Name' defaultValue='Casey N. Hamilton' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='bio' label='Bio' defaultValue='Cofounder & COO of HeartMail' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='contactFee' label='Contact Fee' defaultValue='$1.00' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <TextField id='emailAddress' disabled label='Email Address' defaultValue='casey@bethebroadcast.com' variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
      <AffiliateCard heartmail='casey@heartmail.com' />
      <Box sx={{ textAlign: 'right', marginTop: '16px', marginBottom: '16px' }}>
        <Button disabled variant='text' ml='16px'>Delete account</Button>
        <Box sx={{ display: 'inline-block', width: '8px' }} />
        <Button variant='contained'>Sign out</Button>
      </Box>
    </Layout>
  )
}
