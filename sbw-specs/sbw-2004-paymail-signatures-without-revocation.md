# SBW 2004: Paymail signatures without revocation

## Dependencies

* SBW 2001: Paymail
* SBW 2002: Paymail identity keys
* SBW 2003: Paymail verify public key owner

## Introduction

This spec should be the same as the existing paymail signatures spec. Basically,
it is a way to construct signatures with the identity key. It is also a way to
verify these signatures while also confirming the identity key of the paymail.

The flaw with this approach is that the key may change to due key rotation or
because the key was stolen. The best way to account for this is with logging the
keys on the blockchain and verifying that the key has not been revoked during
the time of the signatures. But that requires filter services, which introduce a
lot of complexity. So this version does not introduce that complexity. But after
creating filter services, we introduce an improved signature protocol that
includes the ability to revoke keys on the blockchain.