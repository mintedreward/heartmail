# HeartMail

<img src='./heartmail-landscape.png' alt='HeartMail' width='800'>

## Milestones

- [x] Milestone 1: Tipping Button
- [x] Milestone 2: Early Access
- [ ] Milestone 3: Money Button Paymails

### Milestone 3: Money Button Paymails

Pages and functions:
- [x] Sign in / Sign out
- [x] Accounts page
- [x] Addresses page
- [x] Settings page

Accounts:
- [x] Create account on front-page signs in the account
- [x] Create account on accounts page signs in the account
- [x] Redirect access key page to to sign in page if not signed in
- [x] NavBar avatar: goes to settings page (if signed in) or sign in page (if not signed in)
- [x] NavBar avatar also works on home, about, terms, privacy
- [x] Deploy to production

Heartmails:
- [x] Heartmail structs
- [x] Heartmail database models
- [x] Creating new account should write heartmails to DB ([accountId]@heartmail.com)
- [x] Migrate production (create tables)
- [x] Fill existing account heartmails to DB
- [x] Turn on PITR for new production tables
- [x] UI to view account heartmails
- [x] Register new heartmails with MB
  - [x] Confirm heartmail is not already registered
  - [x] Get pubKey for mbUserId
  - [x] Get pubKey for paymail
  - [x] If pubKeys are the same, grant the heartmail
- [x] Enable switching primary heartmail
- [ ] Fix affiliate system to use custom heartmails
- [ ] Give better error message for unavailable heartmail
- [ ] Update page without refresh when new heartmail is registered
- [ ] Update page without refresh when primary heartmail is changed
- [ ] Fill from HeartMail emails: ryan, casey, diddy, ruth, lacy, markus, heartmail
- [ ] Automatically switch primary heartmail if it is the first custom one
- [ ] Automatically insert MB heartmails (primary paymail, mbUserId paymail) at new account
- [ ] Fill MB heartmails (primary paymail, mbUserId) for existing accounts
- [ ] Deploy to production

Avatars:
- [ ] Display custom avatar
- [ ] Fill existing MB avatars to DB
- [ ] Enable avatar upload
- [ ] Deploy to production

### Milestone 4 Wishlist

- [ ] Spinners for new account
- [ ] Spinner for sign in
- [ ] Implement .toFrontEnd() for database structs and put in front-end
- [ ] Encrypt private keys in the database
- [ ] Handle sign-in failures for non-accounts
- [ ] Put API fetch methods into front-end client folder
- [ ] Add test infrastructure for the front-end

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
* Database (AWS)
* Send email (AWS)
* Receive email (AWS)
* Full email service (Google)
* Docker Registry (Docker Hub)

## Repo Overview

Everything is written in javascript except deployment shell scripts. We use
yarn workspaces to manage the projects.

If we ever need to write something in a language other than javascript, we will
still use yarn workspaces and npm packages to manage the project. Javascript
and related tools wrap all projects. Javascript is always the first language
and any other language is a form of optimization.

## Packages

All projects begin life as private and may become public when a license is
chosen and published publicly.

## Deployments

All containers are published to Docker Hub. At this time, we use the AWS
interface and shell scripts to manage deployments. However, it is planned to
switch from shell scripts to Kubernetes. The goal is for the infrastructure to
be deployable on AWS, Google Cloud, or Azure. Each app should be decentralized
across cloud providers.

## Major Subprojects

SPV and content modules:
* [x] HeartMail Web
* [x] HeartMail Lib
* [x] HeartMail Keyfile
* [ ] HeartMail Email2
* [ ] HeartMail DB
* [ ] HeartMail Kubernetes
* [ ] HeartMail Node Client <= Node Server Interface
* [ ] HeartMail Price Client <= Price Server Interface
* [ ] HeartMail Crypto Workers
* [ ] HeartMail Wallet Web API
* [ ] HeartMail IFrame API
* [ ] HeartMail Media Workers
* [ ] HeartMail Web API
* [ ] HeartMail Components
* [ ] HeartMail Wallet Web
* [ ] HeartMail Search Web
* [ ] HeartMail Browser Web

Miner modules:
* [ ] HeartMiner Node Server <= Node Client Interface
* [ ] HeartMiner Merkle Proofs
* [ ] HeartMiner Block Headers
* [ ] HeartMiner Tx Validator
* [ ] HeartMiner Tx Storage
* [ ] HeartMiner Filter

Exchange modules:
* [ ] HeartX Price Server <= Price Client Interface
* [ ] HeartX Custodian => Custodian
* [ ] HeartX Account => Bank
* [ ] HeartX Trade Web

Private:
* [ ] CoaseBank Savings <= HeartX
* [ ] CoaseBank Loans
* [ ] CoaseBank Wire => HeartX Trade

Private:
* [ ] Coasetodian <= HeartX Cold Storage

Private:
* [ ] HeartMail HeartSign
* [ ] HeartMail Transcription
* [ ] HeartMail Wallet Expo
* [ ] HeartMail Front-Page Expo

Private:
* [ ] HeartBayes (AI / ML)

## OpenSPV MVP

Key Properties
* The user has their keys but never needs to write them down.
* SPV transfers include input merkle proofs and are validated.
* HeartMiner provides Merkle proofs and block headers.
* HeartX provides price.

Ryan
* Ryan generates a key by hand for ryan@ryanxcharles.com
* Ryan sends funds from Handcash to ryan@ryanxcharles.com
* Ryan signs up for ryan@heartmail.com
* Ryan uses ryan@ryanxcharles.com to invite ryan@heartmail.com to be 2FF
* Ryan sends $5.00 p2p from ryan@ryanxcharles.com -> ryan@heartmail.com

Alice
* Ryan logs into ryan@heartmail.com
* Ryan invites Alice to be 2FF through email at alice@example.com
* Ryan funds Alice with $5.00
* Alice clicks link to create alice@heartmail.com
* Alice joins and becomes 2FF with Ryan
* Alice receives 2FF gift of $5.00 from Ryan automatically during signup

Invites
* Ryan sends $5.00 each to 100 first users

## OpenSPV Key Manager

* passwords
* ssh keys
* env vars
* API tokens

## Domain names

Domain names are distributed across:

* AWS
* Namecheap
* Uniregistry
* Godaddy
* NameBright

## IP protection

* Patent: Email2 authentication
* Patent: iframe API
* Patent: Two Factor Friend
* Trademark: OpenSPV
* Trademark: HeartMail
* Trademark: HeartX
* Trademark: HeartMiner
* Trademark: CoaseBank
* Trademark: Two Factor Friend
* Trademark: Coasian

## Businesses

* Ryan X. Charles: License content created by RXC.
* Coasian: Create and license patents. Truth.
* Coasian: Create and operate subsidiaries. Love.
* Coasian: Create and license trademarks and brands. Beauty.
* OpenSPV: Non-SPV transfers cost 3%. SPV transfers are fee.
* OpenSPV: Email2 sales, trades, & auctions.
* OpenSPV: Documentation sales & marketplace.
* OpenSPV: Bug bounty marketplace.
* OpenSPV: WaaS for businesses.
* OpenSPV: Paid video mail hosting, processing, transmission.
* OpenSPV: Paid ad placement for search results, front page, categories.
* Two Factor Friend: It's like a dating app, but for infosec. BFF+2FA=2FF.
* HeartMail: Email2 sales, trades, & auctions.
* HeartMail: Paid video mail hosting, processing, transmission.
* HeartMail: Paid ad placement for search results, front page, categories.
* HeartMail: Mainstream video sales & marketplace.
* HeartX: Real asset exchange.
* CoaseBank: HeartUSD.
* Coasetodian: Custodian of financial assets.
* HeartMiner: Paid block explorer. Free tx viewing under 50kb, paid over.
* HeartMiner: Paid merkle proofs. Free tx proofs under 50kb, paid over.
* HeartMiner: Free tx validation.
* HeartMiner: Bitcoin mining.
* Coasian Search: Market search. Search auction market with pay walls inside.
* Coasian KYC: Verify identity of people and corporations.
* Coasian Headlines: See what's hot and buy it (Twitter+PayWall+Affiliates)
* Coasian Computer: Pay for solutions to problems.
* Coasian Analytics: View analytics data for your apps.
* Coasian Key Manager: Manage passwords and other keys.
* Coasian Ads: Display ads to target demographics.
* Anarchoscience: Science crowdfunding.
* It is Bit: Sell research articles ($5 for each paper).
* It is Bit: Sell educational material.
* It is Bit: Information theory education marketplace.
* Planck Times: Physics journal.
* Contract.IO: Contract signing & execution. One person, many companies.
* SF Liberals: Economics education marketplace.
* Golden Gate Gym: Virtue signal dating app.
* Astrohacker: Spaceships.
* The Megabits: Band.
* Theory of Bitcoin: Educational material on Bitcoin.
* The Dream that Lasted Forever: Movies and video games.

## Principles

* All protocols are open-source and open-protocol.
* If someone dies, everything should keep working.
* Everything should feel right.

## Software stack

This software stack is designed to bring the UI to every platform while running
on scalable cloud infrastructure. When paired with scalable algorithms, this
architecture scales to billions of users per node.

- Javascript / node.js: Javascript is the only language that runs on every
  platform and is the only candidate for the reference implementation of every
  protocol. Furthermore, because all slow components are either already
  implemented in C++ or can be in the form of a node.js module, there is no
  advantage in using any other programming language.
- next.js: A popular framework for creating the web front-end.
- React Native: A popular framework for creating the mobile front-end.
- Docker: The standard container tool.
- Kubernetes: The standard container management tool.
- Cassandra: The standard distributed database.

## Yarn Workspaces

[Yarn Workspaces](https://semaphoreci.com/blog/javascript-monorepos-yarn-workspaces) are used for cross-module dependencies. 

From this directory, you can run the following commands:

    $ yarn workspaces list
    $ yarn workspace email2 lint
    $ yarn workspaces foreach lint
    $ yarn workspaces foreach test

To reference a module from another module:

    import { Email2 } from 'stamp-email2'

Copyright (c) 2022 HeartMail Inc. All rights reserved.
