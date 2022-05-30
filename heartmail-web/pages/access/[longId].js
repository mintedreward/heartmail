import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import AffiliateCard from '../../components/AffiliateCard'
import TextField from '@mui/material/TextField'
import { util } from 'heartmail-db'
import NotFoundPage from '../404'

export async function getServerSideProps (context) {
  const longId = context.query.longId
  const res = context.res
  const account = await util.getAccessKey(longId)
  if (account) {
    return {
      props: {
        account
      }
    }
  } else {
    res.statusCode = 404
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
      <NotFoundPage />
    )
  }

  const receiptId = props.account.longId
  const accessGrantedAt = new Date(props.account.accessGrantedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  const userEmail = props.account.mbEmail
  const heartmail = `${props.account.longId}@${process.env.NEXT_PUBLIC_DOMAIN}`

  return (
    <Layout title={`Early Access ${receiptId}`}>
      <PageTitle>Early Access</PageTitle>
      <p>
        This page grants access to HeartMail on {accessGrantedAt} to this email address:
      </p>
      <TextField id='outlined-basic' label='Email' disabled value={userEmail} sx={{ width: '100%' }} />
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
