# HeartMail

<img src='./heartmail-landscape.png' alt='BeTheBroadcast' width='200'>

HeartMail master repo.

## HeartMail MVP 2: Early Access

- [ ] next.js app framework with all pages and components
- [ ] Cassandra database (Amazon Keyspaces) with user system, affiliate system,
  invoices, and receipts
- [ ] API
- [ ] Web page preview with image and text description for Facebook and other
  social media applications
- [ ] Email receipt
- [ ] Kubernetes infrastructure

## HeartMail Email MVP description

Our first product will be an email forwarding service hosted at heartmail.com.

The primary features will be:

- An ability to register new heartmails (a.k.a. emails, a.k.a. paymails) and have them forward to your personal email. For instance, casey@bethebroadcast.com can register casey@heartmail.com and have emails sent to casey@heartmail.com forwarded to casey@bethebroadcast.com. Forwarded emails contain 💌 in the subject instead of "Fwd: ".

- Micropayments pay wall to block spam. $X fee set by user where user can set up a spam wall so that you must pay the fee to get added to the whitelist so that your emails make it through. HeartMail Inc. takes 20% of the spam wall.

- Users can register new heartmails for $1.00 each. Each one automatically forwards to their email.

- Users can transfer their heartmails to another user for $1.00.

- Users can set their heartmails for sale for a price. When another user tries to register that name, instead of paying $1.00, they have to pay whatever fee is set by the owner. This is exactly how the Money Button paymail market works. We charge 20% fee when a heartmail is purchased in this way (because the user is using the HeartMail market).

- Because the heartmails are also email, you can contact the owner of a heartmail by emailing them at the heartmail. For instance, to contact the owner of casey@heartmail.com, one must simply email casey@heartmail.com. By making a custom deal, note that the user can avoid the 20% fee. The 20% only happens if a user purchased the paymail when it is for sale rather than making a custom deal and transferring it.

- There is marketplace where you can view all heartmails that are for sale. If you choose to list your heartmail on the marketplace, HeartMail Inc. takes 20%.

- There is an affiliate system whereby users earn 20% of HeartMail Inc. revenue by referring paying users. For instance, if user@heartmail.com sends a new user to heartmail.com/?a=user@heartmail.com , and the new user purchases the paymail newuser@heartmail.com , then 20% of HeartMail’s revenue (20 cents) goes to user@heartmail.com .

The secondary features will be:

- There is a feature to let Money Button users register their primary paymail for free if it is not already taken by someone else. For instance, if user@moneybutton.com swipes the button to register their primary paymail, and user@heartmail.com is not already taken, then they get user@heartmail.com for a fee of $0.00.

- Allocate existing paymails: LinkBSV names, Diddy, Ruth, Casey, Ryan

## HeartMail Email MVP 

- [x] Money Button tipping button
- [ ] Sign in / log in with email
- [ ] Front-page: [input box]@heartmail.com
- [ ] Pre-register Casey's, Ryan's, Diddy's, Ruth's MB paymails
- [ ] Register Money Button (MB) paymails for free
- [ ] Email forwarding
- [ ] Micropayments pay wall for email forwarding
- [ ] Register paymails for $1.00
- [ ] Transfer paymails for $1.00 (no % fee)
- [ ] Sell paymails for $1.00 (205 fee)
- [ ] Affiliate system: 20% lifetime revenue to affiliate
- [ ] Paymail market (view paymails for sale)

Later:
- [ ] Partial fiat currency support through Stripe
- [ ] Bitcoin SPV wallet to replace MB - "Love Button"
- [ ] Complete fiat currency support through a third party exchange
- [ ] Complete fiat currency support through our own exchange
- [ ] Auction market (enable ask/bid)
- [ ] Full email support
- [ ] Video mail support
- [ ] Video publishing support
- [ ] Full social media features (images, articles, comments, ...)

## Redirects: www and HTTPS

Our redirect policy is:

- [name].com redirects to www.[name].com
- http://[name].com redirects to https://[name].com

This works by:

- AWS instances ([name]-redirect) are used to add www
- An AWS load balancer rewrites http traffic to https

## Central Points of Failure

All central points of failure should be eliminated over time, including
ourselves. We do not want the failure of one part of the system to create
cascading failures. Any part should be able to be removed and the system should
keep functioning.

* Domain names (AWS)
* Cloud (AWS)
* Email (Google)
* Docker Registry (Docker Hub)
* NPM Registry (NPM)

Copyright (c) 2022 HeartMail Inc. All rights reserved.
