import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import ContactCardSelector from '../components/ContactCardSelector'
import SelfTabs from '../components/SelfTabs'
import MoneyButtonNewAccount from '../components/MoneyButtonNewAccount'

export default function AccountsPage () {
  return (
    <Layout title='Accounts' account={{}}>
      <PageTitle>Accounts</PageTitle>
      <ContactCard avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <SelfTabs value={0} />
      <MoneyButtonNewAccount />
      <ContactCardSelector avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <ContactCardSelector avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
    </Layout>
  )
}
