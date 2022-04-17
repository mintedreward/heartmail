import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MoneyButton from '@moneybutton/react-money-button'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HeartMail</title>
        <meta name="description" content="Own your social media." />
        <link rel="icon" href="/heartmail-avatar-light.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoheader}>
            <Image src="/heartmail.png" alt="HeartMail: Own your social media." width="254" height="50" />
        </div>
        <MoneyButton
          to='heartmail@moneybutton.com'
          amount='1'
          currency='USD'
          label='Like'
        />
      </main>
    </div>
  )
}
