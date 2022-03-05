import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>OpenSPV</title>
        <meta name="description" content="Truth, Love & Beauty" />
        <link rel="icon" href="/openspv-avatar-dark.png" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logoheader}>
            <Image src="/openspv-header-light.png" alt="OpenSPV" width="400" height="133" />
        </span>
      </main>
    </div>
  )
}
