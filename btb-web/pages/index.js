import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

function Title () {
  return (
    <div className={styles.logoheader}>
      <Image src="/btb.png" alt="BeTheBroadcast.com: Own your social media." width="393" height="41" />
    </div>
  )
}

function Motto () {
  return (
    <div className={styles.content}>
      <h1>Own Your Social Media</h1>
      <p>The MVP will launch in April. Please email your name and personal website to Ryan, Casey and Diddy to get the launch announcement and other updates.</p>
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
        <title>BeTheBroadcast.com</title>
        <meta name="description" content="Own your social media." />
        <link rel="icon" href="/btb-avatar-light.png" />
      </Head>

      <main className={styles.main}>

        <Title />

        <Motto />

        <Team />

      </main>
    </div>
  )
}
