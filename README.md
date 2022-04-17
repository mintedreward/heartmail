# HeartMail

<img src='./btb-3d.png' alt='BeTheBroadcast' width='200'>

HeartMail master repo.

## HeartMail product description

- [x] Money Button tipping button
- [ ] Sign in / log in with email
- [ ] Front-page: [input box]@heartmail.com
- [ ] Pre-register Casey's, Ryan's, Diddy's, Ruth's MB paymails
- [ ] Register Money Button (MB) paymails for free
- [ ] Email forwarding
- [ ] Register paymails for $1.00
- [ ] Transfer paymails for $1.00 (no % fee)
- [ ] Sell paymails for $1.00 (no % fee)
- [ ] Paymail market (view paymails for sale)
- [ ] Auction market (enable ask/bid)

Later:
- [ ] Bitcoin SPV wallet to replace MB
- [ ] Full email support
- [ ] Video mail support

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
* Email (Google)
* Docker Registry (Docker Hub)
* NPM Registry (NPM)

Copyright (c) 2022 HeartMail Inc. All rights reserved.
