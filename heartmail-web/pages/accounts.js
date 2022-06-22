import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import ContactCardSelector from '../components/ContactCardSelector'
import SelfTabs from '../components/SelfTabs'
import MoneyButtonNewAccount from '../components/MoneyButtonNewAccount'
import { withSessionSsr } from '../lib/session'

export const getServerSideProps = withSessionSsr(
  function getServerSideProps ({ req }) {
    const email = req.session?.email

    if (!email) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        email
      }
    }
  }
)

export default function AccountsPage () {
  return (
    <Layout title='Accounts' account={null}>
      <PageTitle>Accounts</PageTitle>
      <ContactCard avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <SelfTabs value={0} />
      <MoneyButtonNewAccount />
      <ContactCardSelector avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <ContactCardSelector avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
    </Layout>
  )
}
