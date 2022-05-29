import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import MoneyButtonTip from '../components/MoneyButtonTip'

export default function AboutPage () {
  return (
    <Layout title='Accounts'>
      <PageTitle>Accounts</PageTitle>
      <ContactCard avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO' />
    </Layout>
  )
}
