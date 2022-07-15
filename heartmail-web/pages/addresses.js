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
import { useRouter } from 'next/router'
import * as React from 'react'
import { withSessionSsr } from '../lib/session'
import { dbApi } from 'openspv-db'

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
  const [primary, setPrimary] = React.useState(props.defaultChecked)

  const handleChange = () => {
    setPrimary(true)
    props.onSetPrimary?.(address)
  }

  return (
    <Card sx={{ marginBottom: '16px', marginTop: '16px' }}>
      <Box sx={{ padding: '16px' }}>
        {address}
      </Box>
      <Divider sx={{ clear: 'both' }} />
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <FormGroup>
            <FormControlLabel control={<Switch checked={primary} onChange={handleChange} />} label='Primary' />
          </FormGroup>
        </Box>
      </Box>
    </Card>
  )
}

function HeartmailInput (props) {
  const defaultValue = `alias@${process.env.NEXT_PUBLIC_DOMAIN}`

  function propagateChange (heartmail = defaultValue) {
    props.onChange?.(heartmail)
  }

  const [heartmail, setHeartmail] = React.useState(defaultValue)
  const [hasFocus, setHasFocus] = React.useState(false)

  const normalizeHeartmail = (heartmail = '') => {
    let name = heartmail.split('@')[0]
    name = name.toLowerCase()
    name = name.replace(/[^A-Za-z0-9]/g, '')
    heartmail = `${name}@${process.env.NEXT_PUBLIC_DOMAIN}`
    return heartmail
  }

  const handleChange = (event) => {
    const heartmail = event.target.value
    setHeartmail(heartmail)
  }

  const handleBlur = (event) => {
    const heartmail = normalizeHeartmail(event.target.value)
    setHeartmail(heartmail)
    setHasFocus(false)
    propagateChange(heartmail)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const heartmail = normalizeHeartmail(event.target.value)
      setHeartmail(heartmail)
      event.target.blur()
    }
  }

  const handleMouseUp = (event) => {
    if (!hasFocus) {
      event.target.select()
    }
    setHasFocus(true)
  }

  return (
    <TextField onChange={handleChange} onBlur={handleBlur} onMouseUp={handleMouseUp} onKeyPress={handleKeyPress} id='outlined-basic' label='New Address' value={heartmail} variant='outlined' sx={{ width: '100%' }} />
  )
}

export default function AddressesPage (props) {
  const router = useRouter()
  const [heartmail, setHeartmail] = React.useState(`alias@${process.env.NEXT_PUBLIC_DOMAIN}`)
  const { account, accountHeartmails } = props

  const handleInputHeartmail = (heartmail) => {
    setHeartmail(heartmail)
  }

  const handleRegister = async () => {
    const res = await fetch('/api/register-mb-paymail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heartmail
      })
    })
    const status = res.status
    if (status === 200) {
      router.reload(window.location.pathname)
    }
  }

  const handleSetPrimary = async (heartmail) => {
    const res = await fetch('/api/set-primary-heartmail', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        heartmail
      })
    })
    const status = res.status
    if (status === 200) {
      router.reload(window.location.pathname)
    }
  }

  const addressCards = accountHeartmails.map(accountHeartmail => {
    return (<AddressCard key={accountHeartmail.heartmail} address={accountHeartmail.heartmail} onSetPrimary={handleSetPrimary} defaultChecked={accountHeartmail.heartmail === account.heartmail} />)
  })

  return (
    <Layout title='Addresses' account={account}>
      <PageTitle>Addresses</PageTitle>
      <ContactCard name={account.name} heartmail={account.heartmail} bio={account.bio} />
      <SelfTabs value={1} />
      <p>
        If you own alias@moneybutton.com you can register alias@{`${process.env.NEXT_PUBLIC_DOMAIN}`} for free for a limited time.
      </p>
      <HeartmailInput onChange={handleInputHeartmail} />
      <Box mt='8px' mb='16px' sx={{ textAlign: 'right' }}>
        <Button variant='contained' onClick={handleRegister}>Register</Button>
      </Box>
      {addressCards}
    </Layout>
  )
}
