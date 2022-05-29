import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import SelfTabs from '../components/SelfTabs'

export default function SettingsPage () {
  return (
    <Layout title='Settings'>
      <PageTitle>Settings</PageTitle>
      <ContactCard avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <SelfTabs value={2} />
    </Layout>
  )
}
