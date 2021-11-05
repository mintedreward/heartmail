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
