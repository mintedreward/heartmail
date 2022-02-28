SBW 7: Paymail key logging and revocation data structures
=========================================================

Dependencies
------------

* None: Although these data structures only make sense in the context of paymail, the data structures can be implemented without referencing paymail.

Introduction
------------

We can fix PKI by logging paymail name and key registrations on the blockchain.
When a key is lost or stolen, the key can be revoked by broadcasting a
revocation transaction.

Note that we can fix:
- DNS
- HTTPS
- Paymail
using this technology. This technology fixes *all* PKI when deployed by our
businesses.

The data structures are what the key logging and revocation information actually looks like on the blockchain. In this draft we avoid specifying details (consider using MAP), but we can outline what that data needs to be.

Inside a transaction must be this data to log a key:
<code>
paymail key log [paymail] [public key] [self-signed signature]
</code>

And to revoke a key:
<code>
paymail key revoke [paymail] [public key] [self-signed signature]
</code>