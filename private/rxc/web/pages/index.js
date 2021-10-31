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
        <h1>Introducing the Social Bitcoin Web</h1>

        <p>The <b>Social Bitcoin Web (SBW)</b> is a set of protocol extensions to Paymail, Bitcoin, and the Web that connects real-world identity (private by default, of course) to electronic cash payments over the internet. This makes it possible to have a true market of information. The economics-first model fixes many issues, most especially the subversive misallocation of attention caused by the overreliance on ad-funded media (social and traditional). We will fix the attention issue first. Then we will fix every other issue.</p>

        <p>We’re going to build the Social Bitcoin Web together publicly on social media. Big Tech companies like Meta (Facebook, Instagram, WhatsApp), Twitter, and so on, will be able to follow along and pivot their business models over time. But our network will have many opportunities to outcompete them if we can move faster than they do.</p>

        <p>Step 1. <b>Buy a domain name for yourself</b>. Your domain name should have a TLD corresponding to your country. If you live in Spain, your domain name should be [yourname].es, for instance.</p>

        <p>Step 2. <b>Host a personal web page on your domain name that you fully control and that serves as the entry point to your public persona</b>. You don’t have to share everything about your private life. Just share the information you want. Take pride in your personal web page. This is your new profile (not your Instagram).</p>

        <p>You should be able to get these things going in one day. If you’re busy, no more than one week. Remember you can iterate. The first version doesn’t have to be perfect. You can make it better tomorrow.</p>

        <p>My domain name is <a href="https://www.ryanxcharles.com/">ryanxcharles.com</a>. Bookmark my web page. You’ll notice this message is replicated across my web page, Twitter, Instagram, Facebook, Medium, and LinkedIn. Please share a link to your web page in the comments to this message on social media. I will link the ones I like from my web page. This is the beginning.</p>

        <p>
          <a href="https://twitter.com/ryanxcharles" className="btn btn-default btn-sm"><i className="fa fa-twitter fa-fw"></i> <span className="network-name">Twitter</span></a> |
          <a href="https://instagram.com/ryan_x_charles" className="btn btn-default btn-sm"><i className="fa fa-instagram fa-fw"></i> <span className="network-name">Instagram</span></a> |
          <a href="https://medium.com/@ryanxcharles" className="btn btn-default btn-sm"><i className="fa fa-medium fa-fw"></i> <span className="network-name">Medium</span></a> |
          <a href="https://github.com/ryanxcharles" className="btn btn-default btn-sm"><i className="fa fa-github fa-fw"></i> <span className="network-name">GitHub</span></a> |
          <a href="https://www.youtube.com/user/ryanxcharles/" className="btn btn-default btn-sm"><i className="fa fa-youtube fa-fw"></i> <span className="network-name">YouTube</span></a> |
          <a href="https://www.linkedin.com/in/ryanxcharles" className="btn btn-default btn-sm"><i className="fa fa-linkedin fa-fw"></i> <span className="network-name">LinkedIn</span></a> |
          <a href="https://www.facebook.com/ryanxcharles" className="btn btn-default btn-sm"><i className="fa fa-facebook fa-fw"></i> <span className="network-name">Facebook</span></a> |
          <a href="http://www.last.fm/user/ryancarnated" className="btn btn-default btn-sm"><i className="fa fa-lastfm fa-fw"></i> <span className="network-name">Last.fm</span></a>
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
