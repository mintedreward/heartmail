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
import CurrencyInput from '../components/CurrencyInput'
import { withSessionSsr } from '../lib/session'
import { dbApi } from 'openspv-db'
import * as React from 'react'

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
    const accountJSON = account.toJSON()

    return {
      props: {
        account: accountJSON,
        email
      }
    }
  }
)

function AccountTextInput (props) {
  const id = props.id
  const label = props.label
  const defaultValue = props.defaultValue
  const maxLength = props.maxLength || 40

  const handleChange = (event) => {
    if (event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength)
    }
  }

  const handleBlur = (event) => {
    props.onSave?.(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.target.blur()
    }
  }

  return (
    <TextField onChange={handleChange} onBlur={handleBlur} onKeyPress={handleKeyPress} id={id} label={label} defaultValue={defaultValue} variant='outlined' sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />
  )
}

export default function SettingsPage (props) {
  const { account, email } = props

  const [name, setName] = React.useState(account.name)
  const [bio, setBio] = React.useState(account.bio)

  async function updateAccountProfileSettings (account) {
    const res = await fetch('/api/update-account', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account
      })
    })
    const id = await res.json()
    return id
  }

  const handleNameSave = async (name) => {
    await updateAccountProfileSettings({
      id: account.id,
      name
    })
    setName(name)
  }

  const handleBioSave = async (bio) => {
    await updateAccountProfileSettings({
      id: account.id,
      bio
    })
    setBio(bio)
  }

  const handleContactFeeSave = async (contactFeeUsd) => {
    await updateAccountProfileSettings({
      id: account.id,
      contactFeeUsd
    })
  }

  return (
    <Layout title='Settings' account={account}>
      <PageTitle>Settings</PageTitle>
      <ContactCard name={name} heartmail={account.heartmail} bio={bio} />
      <SelfTabs value={2} />

      <Card variant='outlined' sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', marginTop: '8px', marginBottom: '8px', borderColor: 'action.disabled' }}>
        <Avatar src='/anonymous-avatar-288.jpg' sx={{ width: 96, height: 96 }} />
      </Card>

      <AccountTextInput onSave={handleNameSave} id='name' label='Name' defaultValue={name} maxLength={40} />

      <AccountTextInput onSave={handleBioSave} id='bio' label='Bio' defaultValue={bio} maxLength={40} />

      <CurrencyInput onSave={handleContactFeeSave} defaultValue={account.contactFeeUsd} sx={{ width: '100%', marginTop: '8px', marginBottom: '8px' }} />

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
