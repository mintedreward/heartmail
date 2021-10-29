# Coasian

![Coasian](https://github.com/coasian/coasian/blob/master/private/design-assets/coasian-landscape-dark.png)

# Repo Overview

Everything is written in javascript except deployment shell scripts. We use
yarn workspaces to manage the projects. All private (closed course) projects
are contained in the <code>private</code> folder and all public (open source)
projects are contained inside the <code>public</code> folder.

If we ever need to write something in a language other than javascript, we will
still use yarn workspaces and npm packages to manage the project. Javascript
and related tools wrap all projects. Javascript is always the first language
and any other language is a form of optimization.

## Packages

All projects are published to npm (using yarn) and may be open source or not
depending on the license and whether they are publicly exposed. All projects
begin life as private and may become public when a license is chosen and
published publicly.

## Deployments

All containers are published to Docker Hub. At this time, we use the AWS
interface and shell scripts to manage deployments. However, it is planned to
switch from shell scripts to Kubernetes. The goal is for the infrastructure to
be deployable on AWS, Google Cloud, or Azure. Each app should be decentralized
across cloud providers.

## Domain names

Domain names are distributed across:

* AWS
* Namecheap
* Uniregistry
* Godaddy
* NameBright

# OpenSPV

The first major project is OpenSPV which includes a Bitcoin wallet with identity
features. It will have a white label (OEM) form and will be re-used in most
other projects, such as HeartMail. After OpenSPV gets video, we can then shift
emphasis to HeartMail and other projects.

## OpenSPV Subprojects

Private:
* [x] OpenSPV Web (Landing Page)
* [ ] OpenSPV Wallet Web
* [ ] OpenSPV Wallet iOS
* [ ] OpenSPV Wallet Android
* [ ] OpenSPV Browser Web (Documentation Marketplace)
* [ ] OpenSPV Browser iOS (Documentation Marketplace)
* [ ] OpenSPV Browser Android (Documentation Marketplace)

Public:
* [x] OpenSPV Lib
* [x] OpenSPV Keyfile
* [ ] OpenSPV Paymail
* [ ] OpenSPV DB
* [ ] OpenSPV Kubernetes
* [ ] OpenSPV Node Client <= HeartMiner Interface
* [ ] OpenSPV Price Client <= HeartX Interface
* [ ] OpenSPV Crypto Workers
* [ ] OpenSPV Wallet Web API
* [ ] OpenSPV IFrame API
* [ ] OpenSPV Web Components
* [ ] OpenSPV Mobile Components
* [ ] OpenSPV OEM Wallet Web
* [ ] OpenSPV OEM Wallet iOS
* [ ] OpenSPV OEM Wallet Android
* [ ] OpenSPV Media Workers
* [ ] OpenSPV Browser Web API
* [ ] OpenSPV OEM Browser Web
* [ ] OpenSPV OEM Browser iOS
* [ ] OpenSPV OEM Browser Android
* [ ] OpenSPV Alert Key

Public:
* [ ] HeartMiner Node Server <= OpenSPV Interface
* [ ] HeartMiner Merkle Proofs
* [ ] HeartMiner Block Headers
* [ ] HeartMiner Tx Validator
* [ ] HeartMiner Tx Storage

Private:
* [ ] HeartX Price Server <= OpenSPV Interface
* [ ] HeartX USD
* [ ] HeartX Trade

Private:
* [ ] HeartMail AI
* [ ] HeartMail HeartSign
* [ ] HeartMail Transcription
* [ ] HeartMail Wallet Web
* [ ] HeartMail Wallet iOS
* [ ] HeartMail Wallet Android
* [ ] HeartMail Browser Web (Mainstream Social Media)
* [ ] HeartMail Browser iOS (Mainstream Social Media)
* [ ] HeartMail Browser Android (Mainstream Social Media)

# OpenSPV MVP

* The user has their keys but never needs to write them down.
* SPV transfers include input merkle proofs and are validated.
* HeartMiner provides Merkle proofs and block headers.
* HeartX provides price.

Alice
* Ryan visits wallet.openspv.com
* Ryan logs in with the genesis account (public key built into the env vars)
* Ryan funds account from Handcash
* Ryan invites Alice to be 2FF
* Alice visits wallet.openspv.com
* Alice joins and becomes 2FF with Ryan
* Alice receives 2FF gift of $5.00 from Ryan automatically during signup

Bob
* Ryan visits wallet.heartmail.com
* Ryan logs in with the genesis account (public key built into the env vars)
* Ryan funds account from Handcash
* Ryan invites Bob to be 2FF
* Bob visits wallet.heartmail.com
* Bob joins and becomes 2FF with Ryan
* Bob receives 2FF gift of $5.00 from Ryan automatically during signup

Alice <-> Bob
* Alice makes a payment of $5.00 to Bob
* SPV transfer: alice@openspv.com -> bob@heartmail.com
* Bob makes a payment of $5.00 to Alice
* SPV transfer: bob@heartmail.com -> alice@openspv.com

# IP protection

* Patent: Paymail authentication
* Patent: iframe API
* Patent: Two Factor Friend
* Trademark: OpenSPV
* Trademark: HeartMail
* Trademark: HeartX
* Trademark: HeartMiner
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
* HeartMiner: Paid block explorer. Free tx viewing under 50kb, paid over.
* HeartMiner: Paid merkle proofs. Free tx proofs under 50kb, paid over.
* HeartMiner: Free tx validation.
* HeartMiner: Bitcoin mining.
* Coasetodian: Custodian of financial assets.
* Coasian Bank: HeartUSD.
* Coasian Search: Market search. Search auction market with pay walls inside.
* Coasian KYC: Verify identity of people and corporations.
* Coasian Headlines: See what's hot and buy it (Twitter+PayWall+Affiliates)
* Coasian Computer: Pay for solutions to problems.
* Anarchoscience: Science crowdfunding.
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

# Central Points of Failure

All central points of failure should be eliminated over time, including
ourselves. We do not want the failure of one part of the system to create
cascading failures. Any part should be able to be removed and the system should
keep functioning.

* Domain names (AWS)
* Cloud (AWS)
* Email (Google)
* Docker Registry (Docker Hub)
* NPM Registry (NPM)
* Ryan X. Charles

Copyright (c) 2021 Coasian Inc. All rights reserved.
