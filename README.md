# HeartMail

HeartMail is an implementation of the Social Bitcoin Web.

# Repo Overview

Everything is written in javascript except deployment shell scripts. We use
yarn workspaces to manage the projects.

# Major Subprojects

SPV and content modules:
* [x] OpenSPV Web
* [x] OpenSPV Lib
* [x] OpenSPV Keyfile
* [ ] OpenSPV Paymail
* [ ] OpenSPV DB
* [ ] OpenSPV Kubernetes
* [ ] OpenSPV Node Client <= Node Server Interface
* [ ] OpenSPV Price Client <= Price Server Interface
* [ ] OpenSPV Crypto Workers
* [ ] OpenSPV Wallet Web API
* [ ] OpenSPV IFrame API
* [ ] OpenSPV Media Workers
* [ ] OpenSPV Web API
* [ ] OpenSPV Components
* [ ] OpenSPV Wallet Web
* [ ] OpenSPV Search Web
* [ ] OpenSPV Browser Web

Miner modules:
* [ ] OpenSPV Node Server <= Node Client Interface
* [ ] OpenSPV Merkle Proofs
* [ ] OpenSPV Block Headers
* [ ] OpenSPV Tx Validator
* [ ] OpenSPV Tx Storage
* [ ] OpenSPV Filter

Exchange modules:
* [ ] OpenSPV Price Server <= Price Client Interface
* [ ] OpenSPV Custodian => Custodian
* [ ] OpenSPV Account => Bank
* [ ] OpenSPV Trade Web

# HeartMail SPV

## HeartMail SPV MVP

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
* Expo Build Infrastructure and Credentials

Copyright (c) 2022 HeartMail Inc. All rights reserved.