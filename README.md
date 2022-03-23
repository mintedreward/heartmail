# BeTheBroadcast.com

<img src='./btb-3d.png' alt='BeTheBroadcast' width='200'>

BeTheBroadcast (BTB) master repo.

Includes subprojects:

* BeTheBroadcast.com
* LinkBSV
* HeartMail

# Redirects: www and HTTPS

Our redirect policy is:

- [name].com redirects to www.[name].com
- http://[name].com redirects to https://[name].com

This works by:

- AWS instances ([name]-redirect) are used to add www
- An AWS load balancer rewrites http traffic to https

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

Copyright (c) 2022 HeartMail Inc. All rights reserved.
