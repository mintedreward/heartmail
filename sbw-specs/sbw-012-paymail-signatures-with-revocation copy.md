SBW 12: Paymail signatures with revocation
==========================================

Dependencies
------------
* SBW 2: Paymail identity keys
* SBW 3: Paymail signatures
* SBW 7: Paymail key logging
* SBW 11: Filter for paymail key logging

Introduction
------------

In the original formulation, paymail signatures had the issue that the public
key could be revoked but you wouldn't necessarily know when checking the
signature. Either you ignore the revocation, in which case the signature may be
forged, or you enforce the revocation, but the signature may have been produced
before the key was revoked, making you think it is invalid when it is actually
valid.

These problems can be solved by logging the public keys and paymails to the
blockchain. After a key is logged, and before it is revoked, you have a time
window during which the signature is valid. So long as the signature also
includes the time or latest block during which it was created, and that
time/block is before the revocation, then the signatue is known to be valid.

A second issue is that you must look for revocation transactions which are
broadcast to the network. That means scanning all transactions, which may be a
lot. This problem is solved with the existence of standardized filter services
which offer up this feature as a service. Filter services scan all transactions
and offer up an API to access them.

Paymail signatures with revocation is this idea: Use the original formulation
for paymail signatures, except only regard a signature as valid if it uses a key
that was not revoked at the time the signature was produced.