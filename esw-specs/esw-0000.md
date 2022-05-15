Email Stamps Web (ESW) Protocol Specifications
==============================================

All protocol draft and final specifications are in this directory in the form of
a markdown file.

Ordering
--------

All specs are numbered starting with 1. If ESW X depends on ESW Y, then X > Y.
e.g., ESW 10 can use ESW 1 - ESW 9 as a dependency.

Protocol specifications that depend on each other should either be merged into
one spec or broken up into a hierarchy to follow the above rule.

In other words, the specs form a directed acyclic graph.

Standard information
--------------------

Specs should always include:
- Number
- Name
- Status (Draft or Deployed)
- Authors
- Dependencies
- Full text of the specification
- Tests
- Implementation

Protocol lifecycle
------------------

A protocol always has a status of either:

- **Draft**: Work-in-progress.
- **Final**: Deployed across two consortium members.

A protocol specification is always draft to begin with and becomes final later.

A specification is not final until the OpenSPV implementation of the
specification is finished and deployed publicly on the web by at least two
consortium members.

Once a protocol specification is final, it cannot be changed except in trivial
ways.

Early Protocols
---------------

### Stamps Milestone

* Script
* Input / Output
* Transactions
* SV = Stamps Verification
* SPV = Simplified Postage Verification

### Mailbox Milestone

* Key Alias
* Email2
* Email2 identity keys
* Email2 verify public key owner
* Email2 signatures (without revocation)
* Email2 authentication (without revocation)
* Two Factor Friend (2FF)
* Two Factor Friend (2FF) service
* Email2 key logging and revocation data structures
* Script template labels
* Filter service API
* Filter service Email2 extension
* Filter for Email2 key logging and revocation
* Email2 signatures (with revocation)
* Email2 authentication (with revocation)
* Email2 invoices and P2P payments
* Merkle proof data structure
* Transaction ancestry data structure
* Merkle proof service
* SPV payments
* Paid Merkle proof service

### Media milestone

* Media types: Video, images, text, software, ...
* Media authorship attestation
* Media basic rights (sell, resell)
* Email2 media transfer

### DHT milestone

...

### Legal contract milestone

...