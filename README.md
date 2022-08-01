# HeartMail

<img src='./logo-heartmail.png' alt='HeartMail' width='800'>

## Introduction

The Internet Postal System (IPS) is a way to own and monetize your
communications without depending on any one particular third party. HeartMail
leads the development of the IPS. HeartMail itself is a node on the IPS.

The software is MIT-licensed but the HeartMail brand is a trademark of HeartMail
Inc. Please use our software, but please do not use our brand. Use your own
brand and make it a real business.

## API Documentation

- [API Documentation](https://github.com/heartmail/heartmail/blob/master/heartmail-docs/README.md)

## Milestone 4: SPV

Details

* [ ] Link to Social
* [ ] Amazon Container Registry
* [ ] Amazon Managed Kubernetes
* [ ] Encrypt account key
* [x] Payments specification (Money Button compatibility)
* [ ] Client page
* [ ] Create wallet
* [ ] Generate invoice
* [ ] Generate payment terms

Overview

* [ ] Email authentication
* [ ] Send / receive / get / sell: block headers & merkle proofs
* [ ] LiteClient compatibility
* [ ] Money Button compatibility
* [ ] Invoices UI
* [ ] Kubernetes

## Inbox Client / API

Inbox client:
- Create new wallet
- Get balance of wallet
- Get active wallet
- Get wallets
- Get invoices/receipts of wallet
- Get txIns/txOuts of wallet
- Send payment

## Inbox Keys

Security Principle: Keys should always be at the boundary of the network so as
to minimize the value of attacking any one point. Put another way, keys should
be distributed in a split fashion across the nodes of the network and only
assembled when and where they are needed. In the case of signing a Bitcoin
transaction, the keys should be assembled on the signing device when needed and
at no other time.

For the HeartMail, the output key is assembled on the client and never on the
server to decrease the incentive to attack the server. The key is only assembled
at the time it is needed on the client's device to spend an output and at no
other time.

Key management is on a per wallet basis:

- Server output key = Random key
- Client master key = Random key
- Output key (assembled on client) = Client master key + Server output key

The client master private key is only ever held on the client, but the client
master public key is sent to the server so the server can compute outputs (but
not spend them).

## Inbox DB

- One user. Many accounts.
- One account. Many wallets. One primary wallet (the most recent one).
- Invoice <-> Receipt. The receipt may not exist.
- Invoice <-> Payment Terms. The payment terms may not exist.
- Payment Terms <-> Payment. The payment may not exist.
- One payment. Many transactions. Many outputs per transaction.
- Payment <-> Receipt.

Queries:
- Fetching "user transaction history" is actually fetching the history of
  receipts, including both received (meaning money is subtracted) and given
  (meaning money is added). For unsolicited payments, we generated an
  "unsolicited payment" invoice.
- Building a payment is actually building multiple transactions and requires
  fetching unspent outputs and signing them. The unspent outputs are gathered
  from oldest to newest (and thus most likely to be confirmed).
- When an unspent output is gathered, we attempt a Lightweight Transaction (LWT)
  by writing it to the spent output table. If this fails, then the output must
  have already been spent. We gather more unspent outputs to make the payment
  until we either succeed or fail to make the payment.
- Computing balance is not trivial. Each wallet has a balance. There is an
  unconfirmed balance and a confirmed balance. Unconfirmed balance is updated at
  every spend or receive. Confirmed balance is updated at view time of the
  balance if there is a new block.
- Merkle proofs are stored with the transactions. Merkle proofs are updated upon
  view if there is a new block.

## Architecture

- App: A single horizontally scalable web app
- DB: Cassandra-compatible Amazon Keyspaces
- Deployment: Docker + Kubernetes
- Load balancer: AWS

## Redirects: www and HTTPS

Our redirect policy is:

- ```[domain]``` redirects to ```www.[domain]```
- ```http://[domain]``` redirects to ```https://[domain]```

This works by:

- AWS instances (```[domain]```-redirect) are used to add www
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
* Software (GitHub/NPM)

Copyright (c) 2022 HeartMail Inc. All rights reserved.
