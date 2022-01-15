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
            <Image src="/heartmail-wide.png" alt="HeartMail: Own your social media." width="345" height="60" />
        </div>

        <div className={styles.content}>
          <h1>Software to Own Your Social Media</h1>
          <p>A new dawn is here. Thanks to Bitcoin, the foundation has been laid and honesty has been restored. The time has come to disrupt the world with a value network that enables the next wave of global commerce. Be the hero of your own story with agency on the Social Bitcoin Web.</p>
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
