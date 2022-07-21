# HeartMail

<img src='./logo-heartmail.png' alt='HeartMail' width='800'>

### Milestone 4: Invoices

HeartMail:

- [ ] User can log in with email address
- [ ] User can set password to encrypt Bitcoin wallet with client-side key management
- [ ] Payment can be sent P2P HeartMail <-> LiteClient with Merkle proofs
- [ ] Deposits, withdrawals, transfers (Bitcoin = Stamps)

Wishlist:

- [x] Add new account button to sign in page
- [ ] Put affiliate heartmail in localStorage
- [ ] Spinners for new account
- [ ] Spinner for sign in
- [ ] Implement .toFrontEnd() for database structs and put in front-end
- [ ] Encrypt private keys in the database
- [ ] Handle sign-in failures for non-accounts
- [ ] Put API fetch methods into front-end client folder
- [ ] Add test infrastructure for the front-end

Improve custom heartmails:
- [ ] Give better error message for unavailable heartmail
- [ ] Update page without refresh when new heartmail is registered
- [ ] Update page without refresh when primary heartmail is changed
- [ ] Fill from HeartMail emails: ryan, casey, diddy, ruth, lacy, markus, heartmail
- [ ] Automatically switch primary heartmail if it is the first custom one
- [ ] Automatically insert MB heartmails (primary paymail, mbUserId paymail) at new account
- [ ] Fill MB heartmails (primary paymail, mbUserId) for existing accounts

Avatars:
- [ ] Display custom avatar
- [ ] Fill existing MB avatars to DB
- [ ] Enable avatar upload
- [ ] Deploy to production
- [ ] Profile page
- [ ] Protocol: extension to paymail profile

Later:
- [ ] Dark mode
- [ ] New accounts should have anonymous name if not the first account

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
* [x] HeartMail Paymail
- [x] HeartMail Docker
* [x] HeartMail DB
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

Products:
* [x] HeartMail Web

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

## HeartMail MVP

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

## HeartMail Key Manager

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
* Trademark: HeartMail
* Trademark: HeartMail
* Trademark: HeartX
* Trademark: HeartMiner
* Trademark: CoaseBank
* Trademark: Two Factor Friend
* Trademark: Coasian

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

## Businesses

* Ryan X. Charles: License content created by RXC.
* HeartMail: Non-SPV transfers cost 3%. SPV transfers are fee.
* HeartMail: Email2 sales, trades, & auctions.
* HeartMail: Documentation sales & marketplace.
* HeartMail: Bug bounty marketplace.
* HeartMail: WaaS for businesses.
* HeartMail: Paid video mail hosting, processing, transmission.
* HeartMail: Paid ad placement for search results, front page, categories.
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

Copyright (c) 2022 HeartMail Inc. All rights reserved.
