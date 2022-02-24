OpenSPV JS
==========

A full-stack scalable Bitcoin SPV wallet including the UI, API, and library for
businesses and consumers that runs on Linux (backend), web, iOS, Android, macOS
and Windows with support for billions of users.

## Software stack

This software stack is designed to bring the UI to every platform while running
on scalable cloud infrastructure. When paired with scalable algorithms, this
architecture scales to billions of users per node.

- Javascript / node.js: Javascript is the only language that runs on every
  platform and is the only candidate for the reference implementation of every
  protocol. Furthermore, because all slow components are either already
  implemented in C++ or can be in the form of a node.js module, there is no
  advantage in using any other programming language.
- next.js: A popular framework for creating the web front-end.
- React Native: A popular framework for creating the mobile front-end.
- Docker: The standard container tool.
- Kubernetes: The standard container management tool.
- Cassandra: The standard distributed database.

## Major Subprojects

OpenSPV is a large application consisting of many modules. The modules are
described below.

SPV and content modules:
- [ ] OpenSPV Web
- [x] OpenSPV Lib
- [x] OpenSPV Keyfile
- [ ] OpenSPV Paymail
- [ ] OpenSPV DB
- [ ] OpenSPV Kubernetes
- [ ] OpenSPV Node Client <= Node Server Interface
- [ ] OpenSPV Price Client <= Price Server Interface
- [ ] OpenSPV Crypto Workers
- [ ] OpenSPV Media Workers
- [ ] OpenSPV Web API
- [ ] OpenSPV Web Components
- [ ] OpenSPV Wallet Web
- [ ] OpenSPV Search Web
- [ ] OpenSPV Browser Web
- [ ] OpenSPV Mobile Components
- [ ] OpenSPV Wallet Mobile
- [ ] OpenSPV Search Mobile
- [ ] OpenSPV Browser Mobile

Miner modules:
- [ ] OpenSPV Node Server <= Node Client Interface
- [ ] OpenSPV Merkle Proofs
- [ ] OpenSPV Block Headers
- [ ] OpenSPV Tx Validator
- [ ] OpenSPV Tx Storage
- [ ] OpenSPV Filter

Exchange modules:
- [ ] OpenSPV Price Server <= Price Client Interface

