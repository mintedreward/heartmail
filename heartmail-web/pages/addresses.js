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
import { withSessionSsr } from '../lib/session'
import { dbApi } from 'heartmail-db'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }) {
    const accountId = req.session?.accountId
    const email = req.session?.email

    if (!accountId || !email) {
      return {
        redirect: {
          permanent: false,
          destination: '/sign-in'
        }
      }
    }

    const account = await dbApi.getAccount(accountId)
    const accountHeartmails = await dbApi.getAccountHeartmails(accountId)

    const accountJSON = account.toJSON()
    const accountHeartmailsJSON = accountHeartmails.map(accountHeartmail => accountHeartmail.toJSON())

    return {
      props: {
        account: accountJSON,
        email,
        accountHeartmails: accountHeartmailsJSON
      }
    }
  }
)

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

export default function AddressesPage (props) {
  const { account, accountHeartmails } = props

  const addressCards = accountHeartmails.map(accountHeartmail => {
    return (<AddressCard key={accountHeartmail.heartmail} address={accountHeartmail.heartmail} />)
  })

  return (
    <Layout title='Addresses' account={account}>
      <PageTitle>Addresses</PageTitle>
      <ContactCard name={account.name} heartmail={account.heartmail} bio={account.bio} />
      <SelfTabs value={1} />
      <p>
        You can register any [alias]@moneybutton.com you own for free for a limited time.
      </p>
      <TextField id='outlined-basic' label='New Address' defaultValue='[alias]@heartmail.com' variant='outlined' sx={{ width: '100%' }} />
      <Box mt='8px' mb='16px' sx={{ textAlign: 'right' }}>
        <Button variant='contained'>Register</Button>
      </Box>
      {addressCards}
    </Layout>
  )
}
