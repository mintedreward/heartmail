import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import ContactCardSelector from '../components/ContactCardSelector'
import SelfTabs from '../components/SelfTabs'
import MoneyButtonNewAccount from '../components/MoneyButtonNewAccount'
import { withSessionSsr } from '../lib/session'
import dbApi from 'heartmail-db/db-api/db-api'
import { useRouter } from 'next/router'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }) {
    const accountId = req.session?.accountId
    const email = req.session?.email

    if (!accountId || !email) {
      return {
        notFound: true
      }
    }

    const { account, emailAccounts } = await dbApi.getAccountsFromEmail(email)
    const accountJSON = account.toJSON()
    const emailAccountsJSON = emailAccounts.map(emailAccount => emailAccount.toJSON())

    return {
      props: {
        account: accountJSON,
        emailAccounts: emailAccountsJSON
      }
    }
  }
)

export default function AccountsPage (props) {
  const router = useRouter()
  const { account, emailAccounts } = props

  const handleNewAccount = async (payment) => {
    const affiliate = {
      hasAffiliate: true,
      id: account.id,
      mbPaymail: account.externalPaymail
    }
    const contactFeeUsd = 1.00
    const res = await fetch('/api/buy-account', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        affiliate,
        contactFeeUsd,
        payment
      })
    })
    const status = await res.status
    // console.log(status)
    if (status === 200) {
      router.reload(window.location.pathname)
    }
  }

  const handleSignIn = async (id) => {
    await fetch('/api/switch-account', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountId: id })
    })
    router.reload(window.location.pathname)
  }

  const contactCardSelectors = emailAccounts.map(emailAccount => {
    const signedIn = emailAccount.accountId === account.id
    return (
      <ContactCardSelector signedIn={signedIn} onSignIn={handleSignIn} key={emailAccount.accountId} avatar='/anonymous-avatar-288.jpg' name={emailAccount.accountName} heartmail={emailAccount.accountHeartmail} bio={emailAccount.accountBio} id={emailAccount.accountId} />
    )
  })

  return (
    <Layout title='Accounts' account={null}>
      <PageTitle>Accounts</PageTitle>
      <ContactCard name={account.name} heartmail={account.heartmail} bio={account.bio} />
      <SelfTabs value={0} />
      <MoneyButtonNewAccount onPayment={handleNewAccount} />
      {contactCardSelectors}
    </Layout>
  )
}
