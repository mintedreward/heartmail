# HeartMail

<img src='./heartmail-landscape.png' alt='HeartMail' width='800'>

## Database

Keys
id | address | pubkey | privkey | type ("account") | created_date

Accounts
key_id | access_granted_date | external_email | external_paymail | affiliate_key_id | contact_fee_amount_usd

ExternalEmails
email | verified_date

ExternalPaymails
paymail | verified_date

MbInvoices
key_id | mb_client_identifier | mb_button_id | mb_button_data | mb_amount_usd | mb_to_heartmail_paymail | mb_to_heartmail_amount | mb_to_heartmail_currency | mb_to_affiliate_paymail | mb_to_affiliate_amount | mb_to_affiliate_currency | mb_user_email | mb_user_email_verified | mb_user_paymail | mb_user_id | mb_txid | mb_payment_id | mb_payment

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

# Repo Overview

Everything is written in javascript except deployment shell scripts. We use
yarn workspaces to manage the projects. All private (closed course) projects
are contained in the <code>private</code> folder and all public (open source)
projects are contained inside the <code>public</code> folder.

If we ever need to write something in a language other than javascript, we will
still use yarn workspaces and npm packages to manage the project. Javascript
and related tools wrap all projects. Javascript is always the first language
and any other language is a form of optimization.

# Packages

All projects are published to npm (using yarn) and may be open source or not
depending on the license and whether they are publicly exposed. All projects
begin life as private and may become public when a license is chosen and
published publicly.

# Deployments

All containers are published to Docker Hub. At this time, we use the AWS
interface and shell scripts to manage deployments. However, it is planned to
switch from shell scripts to Kubernetes. The goal is for the infrastructure to
be deployable on AWS, Google Cloud, or Azure. Each app should be decentralized
across cloud providers.

# Major Subprojects

Expo is a front-end tool to create a front-end that works across Web, iPhone,
Android. It is based on react-native and react-native-web. It looks like the
best tool to get going for the front-end, and it is possible that it will
continue to work forever. At least for the wallet.

SPV and content modules:
* [x] HeartMail Web
* [x] HeartMail Lib
* [x] HeartMail Keyfile
* [ ] HeartMail Paymail
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

# OpenSPV

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

# Domain names

Domain names are distributed across:

* AWS
* Namecheap
* Uniregistry
* Godaddy
* NameBright

# IP protection

* Patent: Paymail authentication
* Patent: iframe API
* Patent: Two Factor Friend
* Trademark: OpenSPV
* Trademark: HeartMail
* Trademark: HeartX
* Trademark: HeartMiner
* Trademark: CoaseBank
* Trademark: Two Factor Friend
* Trademark: Coasian

# Businesses

* Ryan X. Charles: License content created by RXC.
* Coasian: Create and license patents. Truth.
* Coasian: Create and operate subsidiaries. Love.
* Coasian: Create and license trademarks and brands. Beauty.
* OpenSPV: Non-SPV transfers cost 3%. SPV transfers are fee.
* OpenSPV: Paymail sales, trades, & auctions.
* OpenSPV: Documentation sales & marketplace.
* OpenSPV: Bug bounty marketplace.
* OpenSPV: WaaS for businesses.
* OpenSPV: Paid video mail hosting, processing, transmission.
* OpenSPV: Paid ad placement for search results, front page, categories.
* Two Factor Friend: It's like a dating app, but for infosec. BFF+2FA=2FF.
* HeartMail: Paymail sales, trades, & auctions.
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

# Principles

* All protocols are open-source and open-protocol.
* Every app is a browser.
* If someone dies, everything should keep working.
* Everything should feel right.

OpenSPV JS
==========

A full-stack scalable Bitcoin SPV wallet including the UI, API, and library for
businesses and consumers that runs on Linux (backend), web, iOS, Android, macOS
and Windows with support for billions of users.

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

## Major Subprojects

OpenSPV is a large application consisting of many modules. The modules are
described below.

SPV and content modules:

- [ ] OpenSPV Web
- [x] OpenSPV Lib
- [x] OpenSPV Keyfile
- [ ] OpenSPV Paymail
- [ ] OpenSPV DB
- [ ] OpenSPV Kubernetes
- [ ] OpenSPV Node Client <= Node Server Interface
- [ ] OpenSPV Price Client <= Price Server Interface
- [ ] OpenSPV Crypto Workers
- [ ] OpenSPV Media Workers
- [ ] OpenSPV Web API
- [ ] OpenSPV Web Components
- [ ] OpenSPV Wallet Web
- [ ] OpenSPV Search Web
- [ ] OpenSPV Browser Web
- [ ] OpenSPV Mobile Components
- [ ] OpenSPV Wallet Mobile
- [ ] OpenSPV Search Mobile
- [ ] OpenSPV Browser Mobile

Miner modules:
- [ ] OpenSPV Node Server <= Node Client Interface
- [ ] OpenSPV Merkle Proofs
- [ ] OpenSPV Block Headers
- [ ] OpenSPV Tx Validator
- [ ] OpenSPV Tx Storage
- [ ] OpenSPV Filter

Exchange modules:
- [ ] OpenSPV Price Server <= Price Client Interface

## Yarn Workspaces

[Yarn Workspaces](https://semaphoreci.com/blog/javascript-monorepos-yarn-workspaces) are used for cross-module dependencies. 

From this directory, you can run the following commands:

    $ yarn workspaces list
    $ yarn workspace paymail lint
    $ yarn workspaces foreach lint
    $ yarn workspaces foreach test

To reference a module from another module:

    import { Paymail } from '@openspv/paymail'

Copyright (c) 2022 HeartMail Inc. All rights reserved.
