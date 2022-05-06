import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'
import MB from '../components/mb.js'

export default function Landing() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HeartMail</title>
        <meta name="description" content="Get paid per email." />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoheader}>
            <Image src="/heartmail.png" alt="HeartMail: Get paid per email." width="350" height="60" />
        </div>
        <br /><br />
        <MB />
      </main>
    </div>
  )
}
