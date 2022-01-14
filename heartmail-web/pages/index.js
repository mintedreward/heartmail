import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HeartMail</title>
        <meta name="description" content="Own your social media." />
        <link rel="icon" href="/heartmail-avatar-dark.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoheader}>
            <Image src="/heartmail-wide.png" alt="HeartMail: Own your social media." width="460" height="80" />
        </div>

        <div className={styles.cofounders}>
          <div className={styles.cofoundersRow}>
            <div className={styles.cofoundersColumn}>
              <div className={styles.contactCard}>
                <div className={styles.contactCardRow}>
                  <div className={styles.contactCardImage}>
                    <Image className={styles.contactCardImageImage} src="/ryan.jpg" alt="Ryan X. Charles" width="100" height="100" />
                  </div>
                  <div className={styles.contactCardText}>
                    <div className={styles.contactCardName}>Ryan X. Charles</div>
                    Cofounder &amp; CEO of HeartMail<br />
                    ryan@ryanxcharles.com<br />
                    ryanxcharles.com
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cofoundersColumn}>
              <div className={styles.contactCard}>
                <div className={styles.contactCardRow}>
                  <div className={styles.contactCardImage}>
                    <Image className={styles.contactCardImageImage} src="/casey.jpg" alt="Casey N. Hamilton" width="100" height="100" />
                  </div>
                  <div className={styles.contactCardText}>
                    <div className={styles.contactCardName}>Casey N. Hamilton</div>
                    Cofounder &amp; COO of HeartMail<br />
                    casey@caseynhamilton.com<br />
                    caseynhamilton.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
