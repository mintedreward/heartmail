Stamps Web (SW) Protocol Specifications
=======================================

All protocol draft and final specifications are in this directory in the form of
a markdown file.

Ordering
--------

All specs are numbered starting with 1. If SW X depends on SW Y, then X > Y.
e.g., SW 10 can use SW 1 - SW 9 as a dependency.

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

### SV Milestone

SV = Stamps Verification

1. Email2
2. Email2 identity keys
3. Email2 verify public key owner
4. Email2 signatures (without revocation)
5. Email2 authentication (without revocation)
6. Two Factor Friend (2FF)
7. Two Factor Friend (2FF) service
8. Email2 key logging and revocation data structures
9. Script template labels
10. Filter service API
11. Filter service Email2 extension
12. Filter for Email2 key logging and revocation
13. Email2 signatures (with revocation)
14. Email2 authentication (with revocation)
15. Email2 invoices and P2P payments
16. Merkle proof data structure
17. Transaction ancestry data structure
18. Merkle proof service
19. SPV payments
20. Paid Merkle proof service

### Media milestone

- Media types: Video, images, text, software, ...
- Media authorship attestation
- Media basic rights (sell, resell)
- Email2 media transfer

### DHT milestone

...

### Legal contract milestone

...