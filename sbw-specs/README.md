Social Bitcoin Web (SBW) Protocol Specifications
================================================

All protocol draft and final specifications are in this directory in the form of
a markdown file.

Ordering
--------

All specs are numbered starting with 1. If SBW X depends on SBW Y, then X > Y.
e.g., SBW 10 can use SBW 1 - SBW 9 as a dependency.

Protocol specifications that depend on each other should either be merged into
one spec or broken up into a hierarchy to follow the above rule.

In other words, the specs form a directed acyclic graph.

Standard information
--------------------

Specs should always include:
- Number
- Name
- Status (Draft or Final)
- Authors
- Dependencies
- Full text of the specification

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

- Paymail
- Paymail identity keys
- Paymail signatures (without revocation)
- Paymail authentication (without revocation)
- Two Factor Friend (2FF)
- Two Factor Friend (2FF) service
- Paymail key logging and revocation data structures
- Filter service API
- Filter service paymail extension
- Filter: Paymail key logging and revocation
- Paymail signatures (with revocation)
- Paymail authentication (with revocation)
- Paymail invoices and P2P payments
- Merkle proof data structure
- Transaction ancestry data structure
- Merkle proof service
- SPV payments

...protocol milestone: SPV...

- Media types: Video, images, text, software, ...
- Media authorship attestation
- Media basic rights (sell, resell)
- Paymail media transfer

...protocol milestone: purchase media....