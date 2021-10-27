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
* [ ] OpenSPV Kubernetes
* [ ] OpenSPV Crypto Workers
* [ ] OpenSPV DB
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

# OpenSPV MVP

* Alice visits spv.openspv.com
* Alice gets a paymail with a key
* Key is generated on the server and shared with Alice ("shared key")
* Alice can use that key, or: Alice can generate a new key which is not shared
  with the server ("sovereign key"). Alice can choose to rely on the sovereign
  key instead of the shared key as her primary key.
* Bob can visit spv.heartmail.com and generates a paymail with a key
* Bob generates a new sovereign key
* Alice can send a payment p2p to Bob with Merkle proofs (genuine SPV)

# Businesses

* Ryan X. Charles: License content created by RXC.
* Coasian: Create and license patents. Truth.
* Coasian: Create and operate subsidiaries. Love.
* Coasian: Create and license trademarks and brands. Beauty.
* OpenSPV: Paymail sales, trades, & auctions.
* OpenSPV: Documentation sales & marketplace.
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
* MerkleMarket: Paid merkle proofs. Free tx proofs under 50kb, paid over.
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
