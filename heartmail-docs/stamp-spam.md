# Payments

A way for one email address to send payments to another email address.

## Dependencies

* [API Capabilities](./2001-api-capabilities.md)
* [Identity Key](./2003-identity-key.md)
* [Identity Signatures](./2005-identity-signatures.md)
* [Transaction](../heartmail-lib/src/tx.mjs)

## Introduction

Two new API capabilities are created:

* The first one for generating payment terms.
* The second one for sending a payment that satisfies the payment terms.

It is assumed that the transacting entities are always named with an email
address. In other words, the payments are always from {alias1}@{domain1.tld} to
{alias2}@{domain2.tld}.

## API Capabilities

A new **Get Payment Terms** API capability is created like this:

```json
{
  "capabilities": {
    "2a40af698840": "https://example.com/api/get-payment-terms/{alias}@{domain.tld}"
  }
}
```

The value ```{alias}@{domain.tld}``` is replaced with the email address where
the payment is to be sent to.

The hex value ```2a40af698840``` is chosen for backwards-compatibility with the
*P2P Payment Destination* protocol [1].

A new **Send Payment** API capability is created like this:

```json
{
  "capabilities": {
    "5f1323cddf31": "https://example.com/api/send-payment/{alias}@{domain.tld}"
  }
}
```

The value ```{alias}@{domain.tld}``` is replaced with the email address where
the payment is being sent to.

The hex value ```5f1323cddf31``` is chosen for backwards-compatibility with the
*P2P Transaction* protocol [2].

## Get Payment Terms End Point

A POST request is sent to the end point like this:

```json
{
  "satoshis": 30000,
}
```

Where ```satoshis``` is the amount desired to send.

The response looks like this:

```json
{
  "outputs": [
    {
      "script": "76a914f32281faa74e2ac037493f7a3cd317e8f5e9673688ac",
      "satoshis": 10000
    },
    {
      "script": "76a914b919d0b2ea7e9d858fa2916409902253789c169788ac",
      "satoshis": 20000
    }
  ],
  "reference": "12345"
}
```

The ```script``` values are hex encoded Bitcoin script. There can be any number
of outputs.

It is not required that the ```satoshis``` add up to the value in the POST
request. Making the payment is optional.

```reference``` is a reference value such as an invoice ID.

## Send Payment End Point

A POST request is sent to the end point with data that looks like this:

```json
{
  "hex": "01000000012adda020db81f2155ebba69e7c841275517ebf91674268c32ff2f5c7e2853b2c010000006b483045022100872051ef0b6c47714130c12a067db4f38b988bfc22fe270731c2146f5229386b02207abf68bbf092ec03e2c616defcc4c868ad1fc3cdbffb34bcedfab391a1274f3e412102affe8c91d0a61235a3d07b1903476a2e2f7a90451b2ed592fea9937696a07077ffffffff02ed1a0000000000001976a91491b3753cf827f139d2dc654ce36f05331138ddb588acc9670300000000001976a914da036233873cc6489ff65a0185e207d243b5154888ac00000000",
  "metadata": {
    "sender": "name@example.com",
    "pubkey": "<identity-key>",
    "signature": "<signature(txid)>",
    "note": "Human-readable information about the transaction"
  },
  "reference": "12345"
}
```

Where the values are:

* ```hex```: The hex value of a Bitcoin transaction.
* ```metadata``` (optional):
  * ```sender```: The email address of the sender.
  * ```pubkey```: The identity key of the sender.
  * ```signature```: The identity signature of the transaction ID hex.
  * ```note```: Human-readable information about the transaction.
* ```reference```: The reference number from the Get Payment Terms reponse.

If the payment is accepted, the transaction is broadcast to the node network. If
not, an error is returned.

A successful response looks like this:

```json
{
  "txid": "<sometxid>",
  "note": "Human-readable information about the transaction"
}
```

Where the values are:

* ```txid```: The transaction ID of the payment.
* ```note``` (optional): Human-readable information about the transaction.

## References

1. https://docs.moneybutton.com/docs/paymail/paymail-07-p2p-payment-destination.html
2. https://docs.moneybutton.com/docs/paymail/paymail-06-p2p-transactions.html
