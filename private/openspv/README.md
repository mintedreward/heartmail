# OpenSPV

## OpenSPV Subprojects

Expo is a front-end tool to create a front-end that works across Web, iPhone,
Android. It is based on react-native and react-native-web. It looks like the
best tool to get going for the front-end, and it is possible that it will
continue to work forever. At least for the wallet.

Private:
* [x] OpenSPV Web
* [x] HeartX Web
* [ ] HeartMiner Web
* [ ] CoaseBank Web
* [ ] Coasetodian Web
* [ ] CoaseML Web
* [ ] OpenSPV Wallet Expo
* [ ] OpenSPV Mail Expo

Public:
* [x] OpenSPV Lib
* [x] OpenSPV Keyfile
* [ ] OpenSPV Paymail
* [ ] OpenSPV DB
* [ ] OpenSPV Kubernetes
* [ ] OpenSPV Node Client <= TeraNode Interface
* [ ] OpenSPV Price Client <= HeartX Interface
* [ ] OpenSPV Crypto Workers
* [ ] OpenSPV Wallet Web API
* [ ] OpenSPV IFrame API
* [ ] OpenSPV Media Workers
* [ ] OpenSPV Mail Web API
* [ ] OpenSPV Expo Components
* [ ] OpenSPV OEM Wallet Expo
* [ ] OpenSPV OEM Mail Expo

Public:
* [ ] HeartMiner Node Server <= OpenSPV Interface
* [ ] HeartMiner Merkle Proofs
* [ ] HeartMiner Block Headers
* [ ] HeartMiner Tx Validator
* [ ] HeartMiner Tx Storage
* [ ] HeartMiner Filter

Private:
* [ ] HeartX Price Server <= OpenSPV Interface
* [ ] HeartX Custodian => Coasetodian
* [ ] HeartX Account => CoaseBank
* [ ] HeartX Trade
* [ ] HeartX Wallet Expo

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

## OpenSPV Key Manager

* passwords
* ssh keys
* env vars
* API tokens

Copyright (c) 2021 Coasian Inc. All rights reserved.