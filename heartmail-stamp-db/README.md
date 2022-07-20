# HeartMail DB

We use Amazon S3 to store files (transactions, avatars, and media objects).

We use Amazon Keyspaces (a managed implementation of the Cassandra API) for
users, keys, and meta information.

A user can be a person or an organization.

## Getting started
Follow these general instructions to get started.  

0. run `yarn` to install dependencies.
1. Log into your aws console. There is a ui web interface to set up Keyspaces database and create your database using the commands in `./migration.cql`
2. Create a aws user and get the login user and password using the `Generate service-specific credentials` below
3. copy .env.example to .env and configure the following settings... 
```
CERTFILE='certs/sf-class2-root.crt'
AWS_CASSANDRA='cassandra.us-east-1.amazonaws.com'
AWS_KEYSPACE='openspv'
AWS_REGION='us-east-1'
AWS_SERVICEUSER='YOUR_AWS_SERVICE_USER'
AWS_SERVICEPASSWORD='YOUR_AWS_SERVICE_PASSWORD'
```

Pay special attention to your service user name and password!  

4. run `yarn start`. It will log a bunch of cassandra details to your console and then it should respond at the end with the invoice record that it wrote to the cassandra database.

## Amazon Keyspaces
Use these links to connect to amazon keyspaces...  

* https://docs.aws.amazon.com/keyspaces/latest/devguide/programmatic.drivers.html

* https://docs.aws.amazon.com/keyspaces/latest/devguide/using_nodejs_driver.html

* https://docs.aws.amazon.com/keyspaces/latest/devguide/programmatic.credentials.ssc.html

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
| userId | email2 | name | bio | website | email | emailVerified |
|-----------------------------------------------------------------|

* userId: The bitcoin address string of the user's first key. The same as the
  user's first identity key.
* email2: The user's primary email2.
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

### Email2s

|------------------|
| email2 | userId |
|------------------|

* email2: A normalized email2 including local part and domain name.
* userId: The user who owns this email2.

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
* derivationPrivKey: A randomly generated key held by the server.
  this to derive derivedPrivKey.
* derivationPubKey: The public key corresponding to derivationPrivKey.
* derivedPubKey: The derived public key: derivedPubKey = identityPubKey + derivationPubKey.
* derivedAddress: The address corresponding to derivedPubKey.
* createdTime: The time this key was created.

### Tx IO

This table contains all of the user's inputs and outputs.

This table is complex because it needs to account for:

* Unused outputs. Used but not spent outputs. Spent outputs.
* The user's confirmed balance and unconfirmed balance (for this identity
  address) both at the time the tx was created and, when the tx is confirmed,
  after it is put into a block.

| userId | identityAddress | type | scriptTemplateType | scriptTemplateData | txId | satoshis | txIn | txOut | usedTime | spentTime | spentTxId | blockId | blockIndex | conversionTime | priceUSD | confirmedBalanceSatoshis | unconfirmedBalanceSatoshis |

|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| userId | createdTime | identityAddress | scriptTemplateType | scriptTemplateData | txId | satoshis | txOut | usedTime | spentTime | spentTxId | blockId | blockIndex | conversionTime | priceUSD | confirmedBalanceSatoshis | unconfirmedBalanceSatoshis |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

* userId: The bitcoin address string of the user's first key.
* identityAddress: The identity address whose derived keys we are computing the balance for.
* type: "in" or "out"
* scriptTemplateType: For now, only includes "pubKeyHash"
* scriptTemplateJSON: A JSON string blog containined data for the script
  template. For the typical script template type of pubKeyHash, this is a JSON
  blob containing the derivedAddress the user needs to know to spend this tx.
* txId: The ID of the transaction containing this output.
* satoshis: The amount of money being sent in this output.
* txIn: If this is an input, the raw tx input in hex. (null otherwise)
* txOut: If this is an output, the raw tx output in hex. (null otherwise)
* usedTime: If this is a UTXO, when the user decides to use this UTXO but before they have spent it.
* spentTime: If this is a UTXO, when the user sends a fully signed transaction including this UTXO.
* spentTxId: Spent by this tx.
* blockId: The block the tx was included in & when the balance was computed.
* blockIndex: The block index.
* conversionTime: The time when the price was queried.
* priceUSD: The price at this time.
* confirmedBalanceSatoshis: The balance in satoshis of all confirmed transactions up to this UTXO.
* unconfirmedBalanceSatoshis: The balance in satoshis of all unconfirmed transactions up to this UTXO.

### Invoices

|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| id | userId | receivingEmail2 | sendingEmail2 | conversionTime | priceUSD | amountSatoshis | txOuts | createdTime | expiredTime | paidTime | paidTxIds |
|----------------------------------------------------------------------------------------------------------------------------------------------------------|

* id: A randomly generated id for the invoice.
* userId: The bitcoin address string of the user's first key.
* receivingEmail2: The email2 the user is using to receive this payment.
* sendingEmail2: The email2 of the sender.
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

### Two Factor Friends

...

