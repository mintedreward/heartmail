Dear [collaborator name],

We are pleased at your interest in the Social Bitcoin Web (SBW) and would like to invite you to join the first SBW collaboration meeting next Monday. We hope you will be able to attend :)

Please expect a calendar invite to the meeting to follow this email. If you do not receive it soon, check your spam folder.

Introduction

HeartMail is sponsoring the Social Bitcoin Web Collaboration (SBWC) which will produce a series of protocols and software that will integrate social features, including identity, into Bitcoin and the web.

The primary part of the effort will revolve around the production of full-stack scalable SPV wallets with OpenSPV as the reference implementation. This is useful to everyone in the ecosystem.

A secondary but still important part of the effort is to integrate content into the SPV wallets, for instance to send videos website-to-website and make payments for them with affiliate revenue. Although not everyone needs video, everyone does need the ability to create arbitrary contracts for information, which applies to every industry.

We are starting with the production of an authentication system because everyone needs this and because most other protocols depend on it.

An early version of the software will be able to sell itself using itself.

Collaboration principle

We will never introduce a central point of failure.

For this reason, we will not use any centralized tool such as Slack or GitHub.

We use email as the primary communication tool at first and will bootstrap all other tools, such as chat, on top of our own technology.

Organization structure

The SBWC involves many different businesses and individuals.

The organization will be operated around weekly meetings managed by HeartMail.

The first meeting will be on Monday at 8am PT. The second meeting will be the following Monday at 4pm PT. We will rotate the meeting time every week to make sure everyone in the collaboration can join at least once every two weeks.

Every meeting will start with an overview by HeartMail.

Businesses will be given 5 minutes to talk at every meeting.

Individuals will be given 1 minute to talk at every meeting.

Every meeting will conclude with questions and answers.

Every meeting will be 2 hours or less.

Because we never introduce a central point of failure, all collaboration members will have the contact information of all other collaboration members and are encouraged to set up meetings without HeartMail whenever appropriate.

Financial considerations

Everyone involved in the SBWC is either a part of a business or is an individual with the intention of creating a business.

The only thing we are producing for free are the protocols. Each protocol will be published publicly for free for anyone to re-implement.

It is a requirement that every protocol is not encumbered by patents.

Each collaboration member is encouraged to publish their own copy of the protocols so there is no one location for the protocols to be hosted.

The software we produce is not free.

HeartMail will sponsor the creation of OpenSPV, a full-stack Bitcoin SPV wallet based on javascript, node.js, Docker, Kubernetes, and Cassandra that runs on web, servers, mobile, and desktop.

OpenSPV is open within the collaboration, but closed without.

Any business or individual who wants to help build OpenSPV will agree to a license that makes the software available for any business purpose for free, except subject to certain conditions that give an advantage to the people who help build the software, such as delaying any public free version.

It is intended that all businesses in the SBWC will either help build and use OpenSPV directly or will create their own separate implementation of the same thing.

Therefore the OpenSPV Collaboration is a subset of the SBWC Collaboration.

Sharing software

GitHub is centralized, so we can’t use that, but git itself is decentralized, so we can use that.

HeartMail will provide a git server that collaboration members can pull from and push to.

Other collaboration members are invited to provide their own git server to host their own version of OpenSPV or of other SBW software.

Social rules and no bureaucracy

The SBW is a network that cannot be censored. No one can be prevented from using or extending the SBW.
However, HeartMail will only choose to work directly with businesses and individuals who are positive and productive. Anybody who do not embody our principles will be eliminated from contact lists, meetings, and software repositories.

Bureaucracy will be kept to a minimum. Anybody who disagrees with the decisions by HeartMail about who is allowed in the group can simply create their own overlapping group with different meetings, software, and contracts.

It is expected that there will be some individuals and businesses who are involved in the SBW but who do not interface directly with HeartMail. Any truly decentralized network is likely to have this property, unless it is a complete graph.

Protocol roadmap

An early version of the protocol roadmap was published to PowPing here:

https://powping.com/posts/ef72d7cb5e0ce6a7457dffc79f9c17e791cc50d18f049d5e89736c624d805a04

It has been agreed with several participating businesses that the first protocols we create will revolve around authentication.

All protocols will either extend paymail, the web, or Bitcoin (Script / L2).

The first protocol will let users from one domain to log into another. In other words, users as elas.digital will be able to log into heartmail.com, and users at heartmail.com will be able to log into elas.digital.

We will also design and implement protocols for tracking name and key registrations and revocations on the blockchain. The reason for this is to fix PKI such that signatures within a certain window are valid whereas 
We will not use xpubs for anything. All keys will be generated using very basic key additions. This is not an issue when you consider secure cloud storage is universally available to all users and the ability to recover funds from a single long-term key is an expensive edge case that we do not need to support at the start.

We will completely eliminate the use of passwords and mnemonics. Our authentication system will be more user-friendly than any existing system.

The way this works is that the user’s master key will be backed up to a server, e.g. heartmail.com. The key to decrypt this will be shared with one or more friends. The user can log in by retrieving the encrypted key from the server and the decryption key from at least one friend.

This protocol eliminates the need for password or mnemonic for log in while allowing the user to manage their own keys. This completely solves the key management issue in a manner compliant with the lightest regulations.
This protocol is called “Two Factor Friend” (2FF).

HeartMail has invented this patentable protocol and is sharing this for free to the ecosystem unpatented because it is better for all of us if this if it is freely available.

All of these protocols need to work together. Thus, the initial protocols are:

* Key generation
* Key logging and revocation
* Name logging and revocation
* Authentication (log in from one website into another)
* Two Factor Friend (2FF)

After this protocol suite is working, we can design and implement all other more advanced protocols, most of which depend on basic authentication.

These are not complex protocols, and they are all modular. Once the protocol outlines are available to all, and once people start voluntarily contributing modules, the full picture will be built very rapidly.

HeartMail is aiming to launch a video sharing app with integrated SPV wallet by April.

This will only be a few thousand lines of code total. The hard part is the collaboration between businesses to make this technology truly decentralized (the purpose of the SBWC).

Collaboration members

The list of collaborators includes:

- Babbage
- BriteVue
- CATN8
- Elas
- Exeter University
- HeartMail
- Hona
- MetaNet.ICU
- sCrypt
- Slictionary
- Smart Ledger
- Unisot
- Verso
- Women of BSV
- Xoken
- And 22 individuals

The contact list will be shared after the first meeting.