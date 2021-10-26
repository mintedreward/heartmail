# Coasian

![Coasian](https://github.com/coasian/coasian/blob/master/design-assets/coasian-landscape-dark.png)

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

The first major project is OpenSPV which includes a Bitcoin wallet with
identity features. It will have a white label form and will be re-used in most
other projects, such as HeartMail. After OpenSPV gets video, we can then shift
emphasis to HeartMail and other projects.

## OpenSPV Subprojects

* [x] OpenSPV Library
* [ ] OpenSPV DB
* [ ] OpenSPV Web API
* [ ] OpenSPV IFrame API
* [ ] OpenSPV Web Components
* [ ] OpenSPV Web
* [ ] OpenSPV Mobile Components
* [ ] OpenSPV iOS
* [ ] OpenSPV Android
* [ ] OpenSPV Documentation Marketplace
* [ ] OpenSPV Deployment
* [ ] OpenSPV White Label

# OpenSPV MVP

* Alice visits wallet.openspv.com
* Alice gets a paymail with a key
* Key is generated on the server and shared with Alice ("shared key")
* Alice can use that key, or: Alice can generate a new key which is not shared
  with the server ("sovereign key"). Alice can choose to rely on the sovereign
  key instead of the shared key as her primary key.
* Bob can visit wallet.heartmail.com and generates a paymail with a key
* Bob generates a new sovereign key
* Alice can send a payment p2p to Bob with Merkle proofs (genuine SPV)

# Social Bitcoin Web Standards

* Key File
* Two Factor Friend
* Paymail Authentication
* Paymail Permissions
* Paymail Payments

# Businesses

All software is open source and open protocol. I own my content and brands.

* Coasian: Build and manage subsidiaries that leverage truth, love, and beauty
  to solve every problem.
* OpenSPV: Paymail sales
* OpenSPV: Paymail trades & auctions
* OpenSPV: Documentation sales
* OpenSPV: Documentation marketplace
* Ad Doodle: Paid ad placement for search results ("Better than Google")
* Planck Times: Citizen journalism. Customized source of news.
* Contract.IO: One person. Many companies. (Legal contract management)
* Two Factor Friend: It's like a dating app, but for computer security.

# Principles

* Every app is a browser.
* If someone dies, everything should keep working.
* Everything should feel right.

# Central Points of Failure

All central points of failure should be eliminated over time, including
ourselves. We do not one part of the system to create cascading failures. Any
part should be able to be removed and the system should keep functioning.

* Domain names
* Cloud (AWS)
* Email
* RXC

Copyright (c) 2021 Coasian Inc. All rights reserved.
