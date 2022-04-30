import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MoneyButton from '@moneybutton/react-money-button'

function MB () {
  return (
    <div style={{width: 300, height: 70}}>
      <div style={{width: 290, height: 60, padding: 5, margin: 5, backgroundColor: '#66ace2', borderRadius: 30}}>
        <MoneyButton
          to='heartmail@moneybutton.com'
          amount='1'
          currency='USD'
          label='Early Access'
          onPayment={(payment) => {console.log(payment); console.log(payment.amountUsd, payment.id, payment.userId, payment.senderPaymail, payment.user.email, payment.user.emailVerified)}}
        />
      </div>
    </div>
  )
}

function TeamMember ({name, email, title, avatar}) {
  return (
    <div className={styles.teamColumn}>
      <div className={styles.contactCard}>
        <div className={styles.contactCardRow}>
          <div className={styles.contactCardImage}>
            <Image className={styles.contactCardImageImage} src={avatar} alt={name} width="100" height="100" />
          </div>
          <div className={styles.contactCardText}>
            <div className={styles.contactCardName}>{name}</div>
            {title}<br />
            {email}
          </div>
        </div>
      </div>
    </div>
  )
}

function Team () {
  return (
    <div className={styles.team}>
      <div className={styles.teamRow}>
        <TeamMember name={'Ryan X. Charles'} email={'ryan@heartmail.com'} title={'Cofounder & CEO'} avatar={'/ryan.jpg'} />
        <TeamMember name={'Casey N. Hamilton'} email={'casey@heartmail.com'} title={'Cofounder & COO'} avatar={'/casey.jpg'} />
        <TeamMember name={'Diddy Wheldon'} email={'diddy@heartmail.com'} title={'Project Manager'} avatar={'/diddy.jpg'} />
        <TeamMember name={'Ruth Heasman'} email={'ruth@heartmail.com'} title={'Design & UI/UX'} avatar={'/ruth.jpg'} />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HeartMail</title>
        <meta name="description" content="Love your neighbor as you love yourself." />
        <link rel="icon" href="/heartmail-avatar-light.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoheader}>
            <Image src="/heartmail.png" alt="HeartMail: Love your neighbor as you love yourself." width="350" height="60" />
        </div>
        <br /><br />
        <MB />
        <br /><br />
        <Team />
      </main>
    </div>
  )
}
