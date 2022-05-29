import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import SelfTabs from '../components/SelfTabs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function AddressesPage () {
  return (
    <Layout title='Addresses' account={null}>
      <PageTitle>Addresses</PageTitle>
      <ContactCard avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <SelfTabs value={1} />
      <p>
        You can register any [alias]@moneybutton.com you own for free for a limited time.
      </p>
      <TextField id='outlined-basic' label='New Address' defaultValue='[alias]@heartmail.com' variant='outlined' sx={{ width: '100%' }} />
      <Box mt='10px' sx={{ textAlign: 'right' }}>
        <Button variant='contained'>Register</Button>
      </Box>
    </Layout>
  )
}
