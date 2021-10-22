# Coasian

![Coasian](https://github.com/coasian/coasian/blob/master/design-assets/coasian-landscape-dark.png)

# Repo Overview

For now, everything is written in javascript except deployment shell scripts.
We use yarn workspaces to manage the projects. All projects are contained
inside the <code>js</code> folder whether they are open source or not.

## Open Source

All projects are published to npm (using yarn) and may be open source or not
depending on the license and whether they are publicly exposed. After
publishing to npm, all open source repos are copied from npm into the git
subtree in the <code>open-source</code> folder and pushed to GitHub.

We do not accept pull requests from the outside. We create all open-source
software ourselves and push to npm and GitHub.

# OpenSPV

The first major project is OpenSPV which includes a Bitcoin wallet with
identity features. It will have a white label form and will be re-used in most
other projects, such as HeartMail. After OpenSPV gets video, we can then shift
emphasis to HeartMail and other projects.

* [x] OpenSPV Library
* [ ] OpenSPV DB
* [ ] OpenSPV Web API
* [ ] OpenSPV IFrame API
* [ ] OpenSPV Web Components
* [ ] OpenSPV Web
* [ ] OpenSPV Mobile Components
* [ ] OpenSPV iOS
* [ ] OpenSPV Android
* [ ] OpenSPV Documentation
* [ ] OpenSPV Deployment
* [ ] OpenSPV White Label

Copyright (c) 2021 Coasian Inc. All rights reserved.
