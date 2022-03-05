# OpenSPV

## Introduction

**The Social Bitcoin Web (SBW)** is:

- A set of protocols that bring identity and social features to Bitcoin and the
  web.

- A network with no central point of failure.

- A decentralized network.

**The Social Bitcoin Web Consortium (SBWC)** is:

- A group of businesses and invididuals who design and implement the protocols
  for the SBW.

**OpenSPV** is:

- The reference implementation of protocols for the Social Bitcoin Web (SBW) in
  javascript and other programming languages including go, rust, Swift, and
  Java.

- A full-stack scalable Bitcoin SPV wallet including the UI, API, and library
  for businesses and consumers that runs on Linux (backend), web, iOS, Android,
  macOS and Windows with support for billions of users.
  
- Intended to be integrated into proprietary software written by consortium
  members rather than sold as a standalone product.

- Everything that a business needs to build a Bitcoin application in all common
  programming languages.

- Open to consortium members and closed to outsiders.

## Principles

- Ho'oponopono
  - Ubuntu circle
  - Love your neighbor as you love yourself
  - Heart-centered communication

- Never introduce a central point of failure.

## License

OpenSPV is open to the SBWC and closed to outsiders. You should bundle OpenSPV
inside your application and distribute your application to your customers.

Do not distribute OpenSPV as an isolated project to your customers. Do not leak
any other information about the SBWC to the outside. Anyone who violates these
rules will be removed from the SBWC at the sole discretion of HeartMail Inc.

If you wish to add someone to the consortium, please contact Ryan X. Charles
&lt;ryan@heartmail.com&gt;.

## OpenSPV vs. Proprietary Software

It is intended that every business who is a part of the SBWC helps design and
implement the protocols for use within and outside of the consortium. OpenSPV
itself is not intended to be directly sold. Instead, each business is intended
to produce their own proprietary software which is sold or licensed and which
may include OpenSPV bundled inside.

For instance, HeartMail is a social media product that includes OpenSPV inside.

## Bitcoin Application Philosophy

Every application needs to access the Bitcoin network. Any fully-featured API
inevitably exposes all Bitcoin wallet features. Therefore, we put the entire
wallet inside the application. OpenSPV is not just an API. It is an embeddable
Bitcoin wallet for any Bitcoin application.

## Decentralization Philosophy

**The SBWC will never introduce a central point of failure.** This is the only
meaningful definition of "decentralized". OpenSPV is decentralized because it
does not introduce a central point of failure.

The SBWC eats our own dog food by building our own communication tools that
satisfy this principle. **We are starting with chat and video** so that not
only do we not need to introduce a central point of failure, but we identity
all existence central points of failure and eliminate them with time.

## SBWC Management

In order to keep bureaucracy to a minimum, the membership list of the SBWC is
managed at the sole discretion of HeartMail. Anyone who disagrees with the
management of HeartMail is encouraged to create their own separate consortium.
It is intended and expected that over time there will be multiple consortiums
with different agendas.

All consortium meetings are recorded and provided to all consortium members.
Like the protocols and software, the records are open to consortium members and
closed to outsiders.

## OpenSPV MVP

A description of the first fully-working version of OpenSPV.

The MVP is when a video can be posted to one website an shared to another using
Bitcoin for payments.

Key Properties
- The user has their keys but never needs to write them down.
- SPV transfers include input Merkle proofs and are validated.
- At least two production instances are running on two different businesses.
- Video is transfered from one domain name to another in exchange for payment
  in Bitcoin.

Alice
- Alice signs up to heartmail.com with no password or mnemonic via affiliate link
- Alice buys tokens with USD
- Alice posts a video

Bob
- Bob sees Alice's video at heartmail.com
- Bob presses "mirror" button to share Alice's video to bobswebsite.com
- Bob pays some amount in bitcoin to send the video to bobswebsite.com

Carol
- Carol sees Alice's video at bobswebsite.com
- Carol buys the video with bitcoin
- Most of the money goes to Alice. Some of the money goes to Bob.

## Protocol Roadmap

The protocols have been outlined in the sbw-specs directory in the repo. Please
consult that list of protocol specifications and the README in that directory
for more information.

## Managing Software

We use GitHub to manage the software. The main repo is located at
github.com/openspv/openspv. All code is located in a directory with the primary
programming language for those subprojects, for instance "js".

We also use GitHub to manage the protocol specifications. The protocol specs
are contained in the sbw-specs directory.

To change the protocols or software, issue a pull request. You can also create
issues for issues that need to be discussed.
