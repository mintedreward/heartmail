import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>LinkBSV</title>
        <meta name="description" content="Monetize your links" />
        <link rel="icon" href="/linkbsv-avatar-light.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoheader}>
            <Image src="/linkbsv.png" alt="LinkBSV: Monetize your links." width="500" height="125" />
        </div>

        <div className={styles.content}>
          <h1>Monetize Your Links</h1>
          <p>LinkBSV is being upgraded to new infrastructure. The MVP will launch in April.</p>
        </div>
      </main>
    </div>
  )
}
