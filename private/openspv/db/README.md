# OpenSPV DB

We use Amazon S3 to store files (transactions, avatars, and media objects).

We use Amazon Keyspaces (a managed implementation of the Cassandra API) for
users, keys, and meta information.

A user can be a person or an organization.

## Amazon S3

### Txs

|-----------------|
| tx/txId | txBuf |
|-----------------|

* txId: A hex string of the reverse of the double sha256 hash of the
  transaction.
* txBuf: The transaction in raw binary.

### Merkle Proofs

|-------------------------------------|
| merkleProofs/txId | merkleProofJSON |
|-------------------------------------|

* txId: A hex string of the reverse of the double sha256 hash of the
  transaction.
* merkleProofJSON: A JSON string blob containing the merkle proof.

### Avatars

|--------------------------------------------|
| avatars/userId/200x200 | avatar200x200.jpg |
|--------------------------------------------|

* userId: The bitcoin address string of the user's first key.
* avatar200x200.jpg: The raw binary of the user's avatar in JPG format. Exactly
  200x200 pixels in size.

## Amazon Keyspaces

### Block Headers

|------------------------------------------------------|
| blockId | blockIndex | blockHeader | totalDifficulty |
|------------------------------------------------------|

* blockId: The reverse double sha256 hash of the block.
* blockIndex: The count of the block.
* blockHeader: The block header in binary format.
* totalDifficulty: An incrementing value. The blockchain to follow is the one
  with the greatest total difficulty.

### Users

|-----------------------------------------------------------------|
| userId | paymail | name | bio | website | email | emailVerified |
|-----------------------------------------------------------------|

* userId: The bitcoin address string of the user's first key. The same as the
  user's first identity key.
* paymail: The user's primary paymail.
* name: The user's full name.
* bio: A short text description written by the user.
* website: A URL to the user's website. Can be null.
* email: The user's primary email address.
* emailVerified: Whether the user's primary email address has been verified.

### Emails

|-------------------------------------------------------|
| email | userId | verificationTime | verificationToken |
|-------------------------------------------------------|

* email: Normalized email address.
* userId: The bitcoin address string of the user's first key.
* verifiedTime: The time the email was verified.
* verificationToken: The token that was used to verify.

### Email Verification Tokens

|----------------------------------------------------------|
| email | verificationToken | createdTime | expirationTime |
|----------------------------------------------------------|

* email: Normalized email address.
* verificationToken: A random string.
* createdTime: The time the verification token was created
* expirationTime: The time when the token expires (typically one day or so after
  createdTime)

### Paymails

|------------------|
| paymail | userId |
|------------------|

* paymail: A normalized paymail including local part and domain name.
* userId: The user who owns this paymail.

### Identity Keys

|--------------------------------------------------------------------------|
| userId | passwordHmacHmac | address | pubKey | createdTime | revokedTime |
|--------------------------------------------------------------------------|

* userId: The bitcoin address string of the user's first key.
* passwordHmacHmac: An HMAC of an HMAC of the user's password. See "keyfile".
* address: A bitcoin address string corresponding to a private key held by the
  user.
* pubKey: The public key string corresponding to the address.
* createdTime: The time this key was created.
* revokedTime: When the key was revoked (can be null).

### Derived Keys

|----------------------------------------------------------------------------------------------------------------|
| userId | identityAddress | derivationPrivKey | derivationPubKey | derivedPubKey | derivedAddress | createdTime |
|----------------------------------------------------------------------------------------------------------------|

* userId: The bitcoin address string of the user's first key.
* identityAddress: The root address from which other keys are derived.
* derivationPrivKey: A randomly generated key held by the server. User can use
  this to derive derivedPrivKey.
* derivationPubKey: The public key corresponding to derivationPrivKey.
* derivedPubKey: The derived public key: derivedPubKey = identityPubKey + derivationPubKey.
* derivedAddress: The address corresponding to derivedPubKey.
* createdTime: The time this key was created.

### Tx Outputs

This table is complex because it needs to account for:

* Unused outputs. Used but not spent outputs. Spent outputs.
* The user's confirmed balance and unconfirmed balance (for this identity
  address) both at the time the tx was created and, when the tx is confirmed,
  after it is put into a block.

|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| userId | identityAddress | scriptTemplateType | scriptTemplateData | txId | satoshis | txOut | usedTime | spentTime | spentTxId | blockId | blockIndex | conversionTime | priceUSD | confirmedBalanceSatoshis | unconfirmedBalanceSatoshis |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

* userId: The bitcoin address string of the user's first key.
* identityAddress: The identity address whose derived keys we are computing the balance for.
* userId: The bitcoin address string of the user's first key.
* scriptTemplateType: For now, only includes "pubKeyHash"
* scriptTemplateJSON: A JSON string blog containined data for the script
  template. For the typical script template type of pubKeyHash, this is a JSON
  blob containing the derivedAddress the user needs to know to spend this tx.
* blockId: The block when the balance was computed.
* blockIndex: The block index.
* conversionTime: The time when the price was queried.
* priceUSD: The price at this time.
* confirmedBalanceSatoshis: The balance in satoshis of all confirmed transactions.
* unconfirmedBalanceSatoshis: The balance in satoshis of all unconfirmed transactions.

### Invoices

|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| userId | receivingPaymail | sendingPaymail | conversionTime | priceUSD | amountSatoshis | txOuts | createdTime | expiredTime | paidTime | paidTxIds |
|-----------------------------------------------------------------------------------------------------------------------------------------------------|

* userId: The bitcoin address string of the user's first key.
* receivingPaymail: The paymail the user is using to receive this payment.
* sendingPaymail: The paymail of the sender.
* conversionTime: The time at which the price quote was created.
* amountSatoshis: The amount to send denominated in Satoshis.
* amountUSD: The USD amount of the amountSatoshis.
* txOuts: A list of txOuts in JSON.
* createdTime: The time the invoice was created.
* expiredTime: There needs to be an expired time because the price quote will no
  longer be valid after a few minutes. There is no reason why most payments
  shouldn't be instant. These are not long-term invoices - these are for the
  sender to ask to generate an invoice immediately before sending.
* paidTime: The time when the payment was received.
* paidTxIds: A list of txIds of the received payments.

### Bitcoin Price

|----------------------------------|
| conversionTime | bitcoinPriceUSD |
|----------------------------------|

* conversionTime: The time the conversion was made.
* bitcoinPriceUSD: The price of one Bitcoin in USD at that time.
