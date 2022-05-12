import Layout from '../components/Layout.js'
import PageTitle from '../components/PageTitle.js'
import ContactCard from '../components/ContactCard.js'

export default function Landing() {
  return (
    <Layout title='About'>
      <PageTitle>About</PageTitle>
      <p>
        HeartMail was founded on January 1, 2022 by Casey N. Hamilton and Ryan X. Charles to solve the social media problem.
        We are headquartered in the state of Texas, but work remotely all over the world.
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
