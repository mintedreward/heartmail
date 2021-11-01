# OpenSPV

## OpenSPV Subprojects

RNW = React Native Web / Expo

Private:
* [x] OpenSPV Web (Landing Page)
* [ ] OpenSPV Wallet RNW
* [ ] OpenSPV Mail RNW

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
* [ ] OpenSPV Media Workers
* [ ] OpenSPV Mail Web API
* [ ] OpenSPV RNW Components
* [ ] OpenSPV OEM Wallet RNW
* [ ] OpenSPV OEM Mail RNW

Public:
* [ ] HeartMiner Node Server <= OpenSPV Interface
* [ ] HeartMiner Merkle Proofs
* [ ] HeartMiner Block Headers
* [ ] HeartMiner Tx Validator
* [ ] HeartMiner Tx Storage
* [ ] HeartMiner Filter

Private:
* [ ] HeartX Price Server <= OpenSPV Interface
* [ ] HeartX USD
* [ ] HeartX Trade

Private:
* [ ] HeartMail AI
* [ ] HeartMail HeartSign
* [ ] HeartMail Transcription
* [ ] HeartMail Wallet RNW
* [ ] HeartMail RNW (Mainstream Social Media)

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

# OpenSPV Key Manager

* passwords
* ssh keys
* env vars
* API tokens

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
