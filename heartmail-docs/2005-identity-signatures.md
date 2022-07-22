# Identity Signatures

## Dependencies

* [API Capabilities](./2001-api-capabilities.md)
* [Identity Key](./2003-identity-key.md)
* [Verify Identity Key](./2003-identity-key.md)
* [Bitcoin Signed Message (BSM)](../heartmail-lib/src/bsm.mjs)

## Introduction

Data can be signed and verified with the identity key of an email address.

## Signature algorithm

The signature algorithm used is the Bitcoin Signed Message (BSM) algorithm.

### Verification algorithm

The verification algorithm is the same as BSM, except that also the identity key
is verified to belong to the email address. In other words, in order for a
signature to be valid, BSM verification must return true *and* Verify Identity
Key must return true.

## References
- https://docs.moneybutton.com/docs/mb-signatures.html
- https://docs.moneybutton.com/docs/bsv/bsv-message.html
- https://github.com/Bitcoin/Bitcoin/pull/524
