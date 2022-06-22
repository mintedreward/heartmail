import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import ContactCardSelector from '../components/ContactCardSelector'
import SelfTabs from '../components/SelfTabs'
import MoneyButtonNewAccount from '../components/MoneyButtonNewAccount'
import { withSessionSsr } from '../lib/session'
import dbApi from 'heartmail-db/db-api/db-api'

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }) {
    const accountId = req.session?.accountId
    const email = req.session?.email

    if (!accountId || !email) {
      return {
        notFound: true
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

export default function AccountsPage (props) {
  const { account } = props
  return (
    <Layout title='Accounts' account={null}>
      <PageTitle>Accounts</PageTitle>
      <ContactCard name={account.name} heartmail={account.heartmail} bio={account.bio} />
      <SelfTabs value={0} />
      <MoneyButtonNewAccount />
      <ContactCardSelector avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <ContactCardSelector avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
    </Layout>
  )
}
