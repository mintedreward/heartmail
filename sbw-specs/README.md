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

### SPV Milestone

1. Paymail
2. Paymail identity keys
3. Paymail signatures (without revocation)
4. Paymail authentication (without revocation)
5. Two Factor Friend (2FF)
6. Two Factor Friend (2FF) service
7. Paymail key logging and revocation data structures
8. Script template labels
9. Filter service API
10. Filter service paymail extension
11. Filter for paymail key logging and revocation
12. Paymail signatures (with revocation)
13. Paymail authentication (with revocation)
14. Paymail invoices and P2P payments
15. Merkle proof data structure
16. Transaction ancestry data structure
17. Merkle proof service
18. SPV payments
19. Paid Merkle proof service

### Media milestone

- Media types: Video, images, text, software, ...
- Media authorship attestation
- Media basic rights (sell, resell)
- Paymail media transfer

### DHT milestone

...

### Legal contract milestone

...