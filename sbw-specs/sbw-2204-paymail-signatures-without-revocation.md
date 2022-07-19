# SBW 2004: Email2 signatures without revocation

## Dependencies

* SBW 2001: Email2
* SBW 2002: Email2 identity keys
* SBW 2003: Email2 verify public key owner

## Introduction

The idea of a email2 signature is as follows:

- To each email2 is associated an identity public key.
- The private key corresponding to the public key, plus a message, can produce a signature.
- The signature can be verified against the public key.
- The public key can be verified against the email2.

### Signature algorithm

Consider the message to be signed.

Find the length of the magic string "Stamps Signed Message:\n"

Write a Stamps variable integer for the length of the magic string.

Write the magic string.

Write the Stamps variable integer for the length of the message.

Write the message.

The new message is the message we sign using the Stamps digital signature algorithm.

The private key used should be the private key corresponding to the email2's identity public key.

When encoded, the signature can be encoded in compact base64 format.

### Verification algorithm

The signature can be verified in the same way as any signature verification, which is to compare the public key agains the data against the signature.

The difference this time is we need to verify also that the public key corresponds to the email2.

For this, we use SBW 2003 to verify the public key of the owner of the email2.

### Weaknesses

This method to produce and verify signatures has the following weakness:

Suppose an identity key is revoked.

The email2 host can do two things:

Continue to regard the public key as owned by the email2. In this case, new signatures can be produced that look valid but are not.

Revoke the old public key. In this case, old signatures will be regarded as invalid even though they were previously valid.

Either of these cases are flaws. Basically, this way of producing signatures does not allow for proper key revocation.

Key revocation can be fixed through the use of filter services to upgrade PKI. When this is complete, we can produce a new signature specification without these weaknesses.

The solution to this weakness

## References
- https://docs.moneybutton.com/docs/mb-signatures.html
- https://docs.moneybutton.com/docs/bsv/bsv-message.html
- https://github.com/Stamps/Stamps/pull/524

## Implementations

See <code>Bsm.js in <code>js/lib</code> and <code>isValidSig</code> and <code>sign</code> methods in <code>js/email2</code>.