import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ryan X. Charles</title>
        <meta name="description" content="The limits are all in your head." />
        <link rel="icon" href="/rxc-avatar-dark.png" />
      </Head>

      <main className={styles.main}>
        <span className={styles.logoheader}>
            <Image src="/rxc-header-light.png" alt="Coasian" width="300" height="200" />
        </span>
        <p>
          <a href="https://twitter.com/ryanxcharles" class="btn btn-default btn-sm"><i class="fa fa-twitter fa-fw"></i> <span class="network-name">Twitter</span></a>
          <a href="https://instagram.com/ryan_x_charles" class="btn btn-default btn-sm"><i class="fa fa-instagram fa-fw"></i> <span class="network-name">Instagram</span></a>
          <a href="https://medium.com/@ryanxcharles" class="btn btn-default btn-sm"><i class="fa fa-medium fa-fw"></i> <span class="network-name">Medium</span></a>
          <a href="https://github.com/ryanxcharles" class="btn btn-default btn-sm"><i class="fa fa-github fa-fw"></i> <span class="network-name">GitHub</span></a>
        </p>
        <p>
          <a href="https://www.youtube.com/user/ryanxcharles/" class="btn btn-default btn-sm"><i class="fa fa-youtube fa-fw"></i> <span class="network-name">YouTube</span></a>
          <a href="https://www.linkedin.com/in/ryanxcharles" class="btn btn-default btn-sm"><i class="fa fa-linkedin fa-fw"></i> <span class="network-name">LinkedIn</span></a>
          <a href="https://www.facebook.com/ryanxcharles" class="btn btn-default btn-sm"><i class="fa fa-facebook fa-fw"></i> <span class="network-name">Facebook</span></a>
          <a href="http://www.last.fm/user/ryancarnated" class="btn btn-default btn-sm"><i class="fa fa-lastfm fa-fw"></i> <span class="network-name">Last.fm</span></a>
        </p>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.ryanxcharles.com">
          <span className={styles.logofooter}>
            <Image src="/rxc-footer-dark.png" alt="Ryan X. Charles" width={375} height={50} />
          </span>
        </a>
      </footer>
    </div>
  )
}
