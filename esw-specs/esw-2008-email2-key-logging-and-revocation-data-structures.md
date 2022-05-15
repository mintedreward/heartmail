ESW 2008: Email2 key logging and revocation data structures
=========================================================

Dependencies
------------

* None: Although these data structures only make sense in the context of email2, the data structures can be implemented without referencing email2.

Introduction
------------

We can fix PKI by logging email2 name and key registrations on the blockchain.
When a key is lost or stolen, the key can be revoked by broadcasting a
revocation transaction.

Note that we can fix:
- DNS
- HTTPS
- Email2
using this technology. This technology fixes *all* PKI when deployed by our
businesses.

The data structures are what the key logging and revocation information actually looks like on the blockchain. In this draft we avoid specifying details (consider using MAP), but we can outline what that data needs to be.

Inside a transaction must be this data to log a key:
<code>
email2 key log [email2] [public key] [self-signed signature]
</code>

And to revoke a key:
<code>
email2 key revoke [email2] [public key] [self-signed signature]
</code>