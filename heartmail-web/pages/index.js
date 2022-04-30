import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MB from '../components/mb.js'

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
        <Team />
        <br /><br />
        <MB />
      </main>
    </div>
  )
}
