import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HeartMail</title>
        <meta name="description" content="Love your colleagues as yourself." />
        <link rel="icon" href="/heartmail-avatar-dark.png" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logoheader}>
            <Image src="/heartmail-header-light.png" alt="HeartMail" width="440" height="160" />
        </span>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.coasian.com">
          <span className={styles.logofooter}>
            <Image src="/coasian-footer-dark.png" alt="Coasian" width={180} height={50} />
          </span>
        </a>
      </footer>
    </div>
  )
}
