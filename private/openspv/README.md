# OpenSPV

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