import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Theory of Bitcoin</title>
        <meta name="description" content="Bitcoin is peer-to-peer electronic cash." />
        <link rel="icon" href="/tob-avatar-dark.png" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logoheader}>
            <Image src="/tob-header-light.png" alt="Coasian" width="400" height="200" />
        </span>
        <p>
          <a href="https://twitter.com/theoryofbitcoin" className="btn btn-default btn-sm"><i className="fa fa-twitter fa-fw"></i> <span className="network-name">Twitter</span></a>
          <a href="https://www.youtube.com/c/theoryofbitcoin/" className="btn btn-default btn-sm"><i className="fa fa-youtube fa-fw"></i> <span className="network-name">YouTube</span></a>
        </p>
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
