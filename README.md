# Coasian

![Coasian](https://github.com/coasian/coasian/blob/master/design-assets/coasian-landscape-dark.png)

# Repo Overview

For now, everything is written in javascript except deployment shell scripts.
We use yarn workspaces to manage the projects. All projects are contained
inside the <code>js</code> folder whether they are open source or not.

## Open Source

All projects are published to npm (using yarn) and may be open source or not
depending on the license and whether they are publicly exposed.

All open source repos are copied into the git subtree in the
<code>open-source</code> folder and pushed to GitHub. For now there is only one
open-source project which is OpenSPV.

We do not accept pull requests from the outside. We create all open-source
software ourselves and push to npm and GitHub.

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

# Business Models

All software is open source and open protocol. I own my content and brands.

* OpenSPV: Paymail sales
* OpenSPV: Paymail trades & auctions
* OpenSPV: Documentation sales
* OpenSPV: Documentation marketplace
* Ad Doodle: Paid ad placement for search results ("Better than Google")
* Planck Times: Citizen journalism. My customized source of news.

Copyright (c) 2021 Coasian Inc. All rights reserved.
