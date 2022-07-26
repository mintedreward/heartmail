# HeartMail

<img src='./logo-heartmail.png' alt='HeartMail' width='800'>

## Introduction

HeartMail is a full stack open source Simplified Payment Verification (SPV)
wallet with Digital Rights Management (DRM) for content.

The software is MIT-licensed but the brand is a trademark of HeartMail Inc.
Please use our software, but please do not use our brand. Use your own brand and
make it a real business.

HeartMail is based on open protocols. The vision for HeartMail is that many
independent businesses use the same protocols to manage identity, payments, and
content, so that the global economy can expand onto the internet. Making the
software open source is a practical way to give detailed information about the
protocols to developers. You can use our software or reimplement the protocols
yourself.

HeartMail leads the Social Bitcoin Web Consortium (SBWC) which is a group of
individuals and businesses building the vision together.

HeartMail uses stamps because everyone already knows that's how you pay for
mail. Stamps is the real Bitcoin.

## API Documentation

- [API Documentation](https://github.com/heartmail/heartmail/blob/master/heartmail-docs/README.md)

## Milestone 4: SPV

Details

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

## Architecture

- App: A single horizontally scalable web app
- DB: Cassandra-compatible Amazon Keyspaces
- Deployment: Docker + Kubernetes
- Load balancer: AWS

## Redirects: www and HTTPS

Our redirect policy is:

- ```{domain.tld}``` redirects to ```www.{domain.tld}```
- ```http://{domain.tld}}``` redirects to ```https://{domain.tld}```

This works by:

- AWS instances ({```{domain.tld}```}-redirect) are used to add www
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
