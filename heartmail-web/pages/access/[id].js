import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import AffiliateCard from '../../components/AffiliateCard'
import TextField from '@mui/material/TextField'
import { dbApi } from 'heartmail-db'
import NotFoundPage from '../404'

export async function getServerSideProps (context) {
  const id = context.query.id
  const res = context.res
  const mbAccount = await dbApi.getMbAccount(id)

  if (mbAccount) {
    return {
      props: {
        mbAccount: mbAccount.toJSON()
      }
    }
  } else {
    res.statusCode = 404
    return {
      props: {
        mbAccount: null
      }
    }
  }
}

export default function AccessPage (props) {
  if (!props.mbAccount) {
    return (
      <NotFoundPage />
    )
  }

  const receiptId = props.mbAccount.id
  const accessGrantedAt = new Date(props.mbAccount.accessGrantedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  const userEmail = props.mbAccount.mbEmail
  const heartmail = `${props.mbAccount.id}@${process.env.NEXT_PUBLIC_DOMAIN}`

  return (
    <Layout title={`Access Key: ${receiptId}`}>
      <PageTitle>Access Key</PageTitle>
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
