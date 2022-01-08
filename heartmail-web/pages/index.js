import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HeartMail</title>
        <meta name="description" content="Own your own social media." />
        <link rel="icon" href="/heartmail-avatar-dark.png" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logoheader}>
            <Image src="/heartmail-header-light.png" alt="HeartMail: Own your own social media." width="440" height="160" />
        </span>
      </main>
    </div>
  )
}
