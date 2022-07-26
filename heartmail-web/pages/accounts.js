import Layout from '../lib/components/Layout'
import PageTitle from '../lib/components/PageTitle'
import ContactCard from '../lib/components/ContactCard'
import ContactCardSelector from '../lib/components/ContactCardSelector'
import SelfTabs from '../lib/components/SelfTabs'
import MoneyButtonNewAccount from '../lib/components/MoneyButtonNewAccount'
import { withSessionSsr } from '../lib/session'
import { dbApi } from 'heartmail-db'
import { useRouter } from 'next/router'
import Client from '../lib/client'

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

  const affiliate = {
    hasAffiliate: true,
    id: account.id,
    mbPaymail: account.paymail
  }
  const contactFeeUsd = 1.00

  const handleSignIn = async (accountId) => {
    await Client.switchAccount(accountId)
    router.reload(window.location.pathname)
  }

  const handleNewAccount = async (payment) => {
    router.reload(window.location.pathname)
  }

  const contactCardSelectors = emailAccounts.map(emailAccount => {
    const signedIn = emailAccount.accountId === account.id
    return (
      <ContactCardSelector key={emailAccount.accountId} signedIn={signedIn} onSignIn={handleSignIn} avatar='/anonymous-avatar-288.jpg' name={emailAccount.accountName} heartmail={emailAccount.accountHeartmail} bio={emailAccount.accountBio} id={emailAccount.accountId} />
    )
  })

  return (
    <Layout title='Accounts' account={account}>
      <PageTitle>Accounts</PageTitle>
      <ContactCard name={account.name} heartmail={account.heartmail} bio={account.bio} />
      <SelfTabs value={0} />
      <MoneyButtonNewAccount affiliate={affiliate} contactFeeUsd={contactFeeUsd} onPayment={handleNewAccount} />
      {contactCardSelectors}
    </Layout>
  )
}
