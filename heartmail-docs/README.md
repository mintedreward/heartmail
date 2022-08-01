API Documentation
=================

## Language

HeartMail stamps uses the original Bitcoin protocol as specified in the Bitcoin
white paper by Satoshi Nakamoto. A complete protocol definition for Bitcoin is
found between the white paper, the original code, the original website, and the
forums posts and emails by Satoshi Nakamoto.

Bitcoin has nothing to do with the popular cryptocurrency "Bitcoin" (BTC). To
avoid confusion, HeartMail never uses the word "Bitcoin" in the product or
marketing material. However, the API and code uses the correct technical
definitions where appropriate. To aid understanding for developers, a dictionary
is provided.

* **1 stamp** = the smallest unit of value, also known as 1 satoshi.
* **10^8 stamps** = 1 bitcoin = 10^8 satoshis.
* **Simplified Postage Verification (SPV)**: Simplified Payment Verification (SPV).
* **Stamp notary**: A "node" in the original white paper, also called a miner or transaction verifier.
* **Stamp block**: A block, which contains a block header and a list of transactions.
* **Stamp database**: Blockchain.
* **Stamp address**: Bitcoin address.
* **Stamp record**: Transaction.
* **Stamp proof**: Transaction, ancestors, and Merkle proofs.
* **Stamp notarization**: Transaction and its Merkle proof.
* **Inbox**: Wallet.
* **API Capabilities**: Paymail / BSV Alias.
* **Email address**: Paymail address and/or email address.
* **Internet Postal System (IPS)**: Social Bitcoin Web (SBW).
* **Internet Postal System Consortium (IPSC)**: Social Bitcoin Web Consortium (SBWC).

## Milestone 4: SPV

* [x] [API Capabilities](./api-capabilities.md)
* [x] [API Documentation](./api-documentation.md)
* [x] [Identity Key](./identity-key.md)
* [x] [Verify Identity Key](./verify-identity-key.md)
* [x] [Identity Signatures](./identity-signatures.md)
* [x] [Stamp Spam](./stamp-spam.md)
* [ ] Merkle Proof
* [ ] Transaction Ancestors
* [ ] SPV Payments
* [ ] Invoices
* [ ] Signed Payments
* [ ] Travel Rule
* [ ] Block Store

## Milestone 5: Social
* [ ] Public Profile
* [ ] Two Factor Friend (2FF)
* [ ] Two Factor Friend (2FF) service
* [ ] Authentication
* [ ] Email Invoices
* [ ] Script template labels
* [ ] Filters
* [ ] Key logging and revocation
* [ ] Key Alias
* [ ] Name logging and revocation

## Milestone 6: Content
* [ ] Transferrable Web Objects
* [ ] Media types: Video, images, text, software, ...
* [ ] Media authorship attestation
* [ ] Media basic rights (sell, resell)
* [ ] Email media transfer

## DHT milestone

...

## Legal contract milestone

...

## Internet Postal System (IPS)

...

## Other Misc Protocols

* Email to phone (phone+14155150210@phone-host.com)
* Email internationalization ([utf8 characters]@example.com)
* Domain key, e.g. heartmail.com signs the transfer of an account