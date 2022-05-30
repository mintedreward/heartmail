import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import SelfTabs from '../components/SelfTabs'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

function AddressCard (props) {
  const address = props.address || 'name@example.com'
  return (
    <Card sx={{ marginBottom: '16px', marginTop: '16px' }}>
      <Box sx={{ padding: '16px' }}>
        {address}
      </Box>
      <Divider sx={{ clear: 'both' }} />
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <FormGroup>
            <FormControlLabel control={<Switch />} label='Primary' />
          </FormGroup>
        </Box>
      </Box>
    </Card>
  )
}

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
      <Box mt='8px' mb='16px' sx={{ textAlign: 'right' }}>
        <Button variant='contained'>Register</Button>
      </Box>
      <AddressCard address='casey@heartmail.com' />
      <AddressCard address='casey2@heartmail.com' />
      <AddressCard address='casey3@heartmail.com' />
      <AddressCard address='casey4@heartmail.com' />
    </Layout>
  )
}
