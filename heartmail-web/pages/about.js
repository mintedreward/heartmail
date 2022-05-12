import Layout from '../components/Layout.js'
import PageTitle from '../components/PageTitle.js'
import ContactCard from '../components/ContactCard.js'

export default function About () {
  return (
    <Layout title='About'>
      <PageTitle>About</PageTitle>
      <p>
        HeartMail was founded on January 1, 2022 by Casey N. Hamilton and Ryan X. Charles.
        Our mission is to enable people to own and monetize their content on social media.
        We work remotely all over the world, but we have our legal headquarters in the state of Texas.
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
    </Layout>
  )
}
