import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import ContactCard from '../components/ContactCard'
import MoneyButtonTip from '../components/MoneyButtonTip'

export default function AboutPage () {
  return (
    <Layout title='About'>
      <PageTitle>About</PageTitle>
      <p>
        HeartMail was founded on January 1, 2022.
        Our mission is to enable people to own and monetize their data.
      </p>
      <p>
        HeartMail Inc.<br />
        1321 Upland Dr.<br />
        Houston, TX 77043<br />
        USA
      </p>
      <ContactCard avatar='/ryan.jpg' name='Ryan X. Charles' heartmail='ryan@heartmail.com' bio='Cofounder & CEO of HeartMail' />
      <ContactCard avatar='/casey.jpg' name='Casey N. Hamilton' heartmail='casey@heartmail.com' bio='Cofounder & COO of HeartMail' />
      <ContactCard avatar='/diddy.jpg' name='Diddy Wheldon' heartmail='diddy@heartmail.com' bio='Project Manager of HeartMail' />
      <MoneyButtonTip />
    </Layout>
  )
}
