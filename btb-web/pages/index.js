import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BeTheBroadcast.com</title>
        <meta name="description" content="Own your social media." />
        <link rel="icon" href="/btb-avatar-light.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoheader}>
            <Image src="/btb.png" alt="BeTheBroadcast.com: Own your social media." width="393" height="41" />
        </div>

        <div className={styles.content}>
          <h1>Own Your Social Media</h1>
          <p>The MVP will launch in April. Please email your name and personal website to Ryan, Casey and Diddy to get the launch announcement and other updates.</p>
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
                    Cofounder &amp; CEO<br />
                    ryan@heartmail.com
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
                    Cofounder &amp; COO<br />
                    casey@heartmail.com
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cofoundersColumn}>
              <div className={styles.contactCard}>
                <div className={styles.contactCardRow}>
                  <div className={styles.contactCardImage}>
                    <Image className={styles.contactCardImageImage} src="/diddy.jpg" alt="Diddy Wheldon" width="100" height="100" />
                  </div>
                  <div className={styles.contactCardText}>
                    <div className={styles.contactCardName}>Diddy Wheldon</div>
                    Project Manager<br />
                    diddy@heartmail.com
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.cofoundersColumn}>
              <div className={styles.contactCard}>
                <div className={styles.contactCardRow}>
                  <div className={styles.contactCardImage}>
                    <Image className={styles.contactCardImageImage} src="/ruth.jpg" alt="Ruth Heasman" width="100" height="100" />
                  </div>
                  <div className={styles.contactCardText}>
                    <div className={styles.contactCardName}>Ruth Heasman</div>
                    Branding &amp; UI/UX<br />
                    ruth@heartmail.com
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
