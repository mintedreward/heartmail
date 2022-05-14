Dear Sovereign Individual,

You are receiving this email because you are interested in the Social Bitcoin Web (SBW) or HeartMail.

Google, Facebook and the other major companies in Silicon Valley have gone off the rails and are deleting true, life-saving information under the label “misinformation” in a tactic straight out of 1984.

Even worse, they are de-platforming truth sayers completely leaving them without their entire audience and distorting the global conversation dramatically.

Millions of people have died as a consequence. It is a catastrophe.

I have left California because I find this culture to be deplorable. I will not move back until Google and Facebook are bankrupt.

There is a very straightforward solution. We need to get people owning their own domain names with a website and email.

These technologies have existed since the 1990s and are far more robust against censorship than the centralized social networks.

Stop using Google, Facebook and the others completely. Get your own domain name, website, and email going today.
Anyone can do this using off-the-shelf services. You do not need any new technology.

What we need to do next is get standard protocols for sharing and paying for content website-to-website such as video, images, articles, and software.

It needs to be possible to creators to post content on their own website that can be shared and replicated globally while enforcing the licensing conditions of the creator and delivering revenue to them.

Websites and email are good, but there is something missing. The missing piece is a protocol for money with no central point of failure.

Bitcoin completely solves this problem. We need to add in Bitcoin to websites and email.

(Please note that BTC is not Bitcoin - BTC is a massive pyramid scheme created by criminals. Stay away. If you have money on Coinbase, you have been scammed.)

The unification of social networks, Bitcoin, and the web is called the Social Bitcoin Web (SBW).

I have been working on these protocols for many years, but I can’t do this by myself.

The nature of a decentralized network requires as many sovereign individuals to completely understand and control their own node in the network as possible.

The more people we have designing and implementing interoperable protocols, the better.

If I am the only one, there is no network. If there are hundreds of us, we are extremely strong. If there are millions of us, we cannot be stopped.

How you can help right now

The most important thing is that you own your own domain name and get a website with email going right away.

Your website should be something like this: yourname.tld with yourname@yourname.tld as your email address.
The Domain Name System (DNS) is extremely robust against censorship. The web and email cannot be censored so long as DNS itself is secure. DNS itself does have some issues, but those issues can be resolved over time without needing to purchase a new domain name. We are going to fix DNS, not disrupt it.

After you get this going, the next most important thing is to establish links between other sovereign individuals. Exactly the way we did in the 1990s and early 2000s. Simply create a link from your website to other websites. Those websites should link back to you. Two-way links are the “friends” in the Social Bitcoin Web.

You can see I have done this myself at my personal website ryanxcharles.com. You can see the friends page where I have links to other people.

After that, this is where things start getting more complicated. We need get SPV wallets integrated into websites.

Two years ago I published this article giving an overview of all the protocols that need to exist to get SPV working:

“Standardize SPV and Tokens for Five Billion Daily Active Users”

https://powping.com/posts/ef72d7cb5e0ce6a7457dffc79f9c17e791cc50d18f049d5e89736c624d805a04

We need to design and implement all of these protocols.

What needs to exist is something like Money Button except in the form of a suite of protocols and software that can be plugged into any website.

SPV is piece of the puzzle, but the other piece is social media content.

We need protocols for identity, authentication, permissions upon which protocols for video, images, articles, and software are based. Users will sign the content they upload with their paymail.

At the end of the day, what we will have is several implementations of something resembling Facebook that anyone can run on their own domain name. Each instance of this software, a node in the SBW, will be interoperable with all others. You can click buttons to add friends, share content, and pay people. With each person having their own domain name (or at least a paymail at someone else’s domain name).

Note that domain name ownership is not a requirement. User can just be users. Those users do not need to purchase a domain name. It is simply better for the creator if they do own their own domain name as it creates much greater resistance to censorship.

HeartMail

HeartMail is a new company I am cofounding with Casey Hamilton. The company will operate a node on the SBW at heartmail.com. Anybody can sign up and use the service for free. We will take a portion of the payments on the website. We will also sell the software itself so that it can be forked onto other websites. We will provide all of the technology that anyone can use to fully own and operate their own website with email and payments 
built-in.

Our intention is that we will not be the only business doing this. HeartMail is a type of CMS like Wordpress, but with a stronger emphasis on interoperability and payments. Any other CMS can adopt the same protocols and be interoperable with each other. There should be many, many implementations of the SBW protocols if our network is to be truly resistant to censorship.

Towards an MVP

I am working on an MVP for HeartMail that will have the following features:

* The ability for users to sign up and get an email address and paymail

* The users will be able to post content such as video

* The content can be shared website to website by making a payment in USD or Bitcoin (assuming the destination website supports the SBW)

* The software itself can be purchased and hosted for a fee so that anyone can boot up a new node on the SBW without writing all the software from scratch

This MVP proves the concept of the SBW, but will leave a lot of features left to be implemented. I believe in iteration. The software will be updated weekly until it matches the experience users demand and expect from mainstream social media products (minus the censorship and plus more monetization options).

The first protocols

I am working with several bright developers who are creating their own implementations of the SBW. I am hoping to work with as many productive, helpful people as possible to get this going urgently.

Before we worry about all the advanced SPV and content features, we need to start iterating interoperable prototypes of the most foundational protocols.

The first protocol needs to be some kind of authentication protocol. That is to say, “log in with paymail”. Many other protocols will depend on this one, so it makes sense to start here.

The way this needs to work is as follows. First of all, when a user creates a new paymail, the paymail and key need to be logged on chain.

When the name or key is transferred or revoked, that also needs to be logged on chain.

The reason for this is to make signatures provably valid for a certain time window. If a name or key changes hands, then that date can be recorded and signatures can be known to be invalid past that date.

The blockchain solves this problem. It was not possible to do name or key revocation correctly until Bitcoin. But now we can. So we need to do this correctly to have a secure foundation.

There need to be standard protocols for:

* How to log the key registration to the blockchain

* How to revoke the key registration on the blockchain

* How to log the name registration to the blockchain

* How to transfer the name registration on the blockchain

Besides this, we also need some way for users with a paymail domain at one domain to log into another domain.

The way this will work is like this: The user visits a new website. They wish to log in. The website asks for their paymail. They type in their paymail. Because the paymail has a domain, a query is issued which finds a login redirect URL. The user authenticates to the new website, e.g. gives permission to share the name, avatar, paymail, and possibly other permissions. The user is redirected back to the website with a token in the URL that gives authorization to the website to log them in. I call this “paymail authentication”.

So a fifth protocol we need is:

* Paymail authentication

Note that paymails are not just for individuals. They are for groups as well.

After we get authentication going, this means user@heartmail.com can log into yourwebsite.com and user@yourwebsite.com can log into heartmail.com.

This is a foundational piece that nearly everything else depends on.

In order to share some content from heartmail.com to yourwebsite.com or vice versa, you need to authenticate first.

I am aiming to get these basic pieces working in three weeks.

If you want to help build paymail authentication and the name/key logging protocols, please respond to this email with your intention to help.

The more people who help, the better. We can get paymail authentication going very rapidly. After that, we can iterate our protocols and software and build the full SBW.

Everyone who helps will have their own copy of the software at launch.

A rough timeline

We need to do these things:

1. Paymail authentication

2. Uploading a video

3. SPV wallet

4. Invoices (charge a certain amount for something)

5. File transfer (with first supported file type being video)

6. Share video website-to-website with bitcoin for postage

7. Be able to purchase and run the software to spool up another node

This is the MVP which I intend to finish by April.

If many people help get this going, we will have a fully censorship-resistant network to compete with YouTube by April.

Each node is a competitive UI to the network.

If you want to help build this network, please respond to this email and convey your intention. Any type of help is appreciated. You do not need to be an engineer. There are 82 people on this list. I don’t want to mass email people who aren’t helping, so I may stop sending emails to people who are non-responsive.
Thank you and take care :relaxed:
