SBW 2013: Email2 signatures with revocation
==========================================

Dependencies
------------
* SBW 2002: Email2 identity keys
* SBW 2004: Email2 signatures
* SBW 2008: Email2 key logging
* SBW 2012: Filter for email2 key logging

Introduction
------------

In the original formulation, email2 signatures had the issue that the public
key could be revoked but you wouldn't necessarily know when checking the
signature. Either you ignore the revocation, in which case the signature may be
forged, or you enforce the revocation, but the signature may have been produced
before the key was revoked, making you think it is invalid when it is actually
valid.

These problems can be solved by logging the public keys and email2s to the
blockchain. After a key is logged, and before it is revoked, you have a time
window during which the signature is valid. So long as the signature also
includes the time or latest block during which it was created, and that
time/block is before the revocation, then the signatue is known to be valid.

A second issue is that you must look for revocation transactions which are
broadcast to the network. That means scanning all transactions, which may be a
lot. This problem is solved with the existence of standardized filter services
which offer up this feature as a service. Filter services scan all transactions
and offer up an API to access them.

Email2 signatures with revocation is this idea: Use the original formulation
for email2 signatures, except only regard a signature as valid if it uses a key
that was not revoked at the time the signature was produced.