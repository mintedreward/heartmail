# OpenSPV

## OpenSPV Subprojects

RNW = React Native Web / Expo

Private:
* [x] OpenSPV Web (Landing Page)
* [ ] OpenSPV Wallet RNW
* [ ] OpenSPV Mail RNW

Public (protocols shared with XAPI):
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
* [ ] OpenSPV RNW Components
* [ ] OpenSPV OEM Wallet RNW
* [ ] OpenSPV OEM Mail RNW

Public (TeraNode):
* [ ] HeartMiner Node Server <= OpenSPV Interface
* [ ] HeartMiner Merkle Proofs - already
* [ ] HeartMiner Block Headers
* [ ] HeartMiner Tx Validator
* [ ] HeartMiner Tx Storage
* [ ] HeartMiner Filter - teranode from june

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