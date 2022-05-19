import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import AffiliateCard from '../../components/AffiliateCard'
import TextField from '@mui/material/TextField'
import { util } from 'heartmail-db'
import * as hdate from 'human-date'

export async function getServerSideProps (context) {
  const longId = context.query.longId
  const account = await util.getAccount(longId)
  if (account) {
    return {
      props: {
        account
      }
    }
  } else {
    return {
      props: {
        account: false
      }
    }
  }
}

export default function AccessPage (props) {
  if (!props.account) {
    return (
      <Layout title='Not found'>
        <PageTitle>Not found</PageTitle>
      </Layout>
    )
  }

  const receiptId = props.account.longId
  const accessGrantedAt = hdate.relativeTime(props.account.accessGrantedAt)
  const userEmail = props.account.mbEmail
  const heartmail = `${props.account.longId}@${process.env.NEXT_PUBLIC_DOMAIN}`
  const affiliateHeartmail = props.account.affiliateLongId ? `${props.account.affiliateLongId}@${process.env.NEXT_PUBLIC_DOMAIN}` : ''
  return (
    <Layout title={`Early Access ${receiptId}`}>
      <PageTitle>Early Access</PageTitle>
      <p>
        This page grants access to HeartMail in {accessGrantedAt} to this email address:
      </p>
      <TextField id='outlined-basic' label='Email' disabled value={userEmail} sx={{ width: '100%' }} />
      <p>
        You can bookmark this page.
      </p>
      <p>
        Earn at least $2.00 per referral with your affiliate link:
      </p>
      <AffiliateCard heartmail={heartmail} />
      {affiliateHeartmail ? (<p>Your affiliate is {affiliateHeartmail}</p>) : (<p />)}
    </Layout>
  )
}
