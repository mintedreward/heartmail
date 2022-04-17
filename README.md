# HeartMail

<img src='./btb-3d.png' alt='BeTheBroadcast' width='200'>

HeartMail master repo.

Includes subprojects:

* BeTheBroadcast.com: SamCart competitor (second: YouTube).
* LinkBSV.com: LinkTree competitor.
* HeartMail.com: Gmail competitor.
* OpenSPV.com: Paypal competitor.

## Mottos

**BeTheBroadcast**: Own your social media.

**LinkBSV**: Monetize your links.

**HeartMail**: Heart-to-heart electronic mail.

**OpenSPV**: Heart-to-heart electronic cash.

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
