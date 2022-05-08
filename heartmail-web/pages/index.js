import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MoneyButton from '@moneybutton/react-money-button'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>HeartMail</title>
        <meta name="description" content="Love your neighbor as you love yourself." />
        <link rel="icon" href="/heartmail-avatar-light.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoheader}>
            <Image src="/heartmail.png" alt="HeartMail: Love your neighbor as you love yourself." width="350" height="60" />
        </div>
        <br /><br />
        <div style={{width: 300, height: 70}}>
          <div style={{width: 280, height: 50, padding: 0, margin: 10, backgroundColor: '#f6f6f6', borderRadius: 25}}>
            <MoneyButton
              to='heartmail@moneybutton.com'
              amount='1'
              currency='USD'
              label='Tip'
            />
          </div>
        </div>
      </main>
    </div>
  )
}
