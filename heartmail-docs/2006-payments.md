# Payments

A way for one email address to send payments to another email address.

## Dependencies

* [API Capabilities](./2001-api-capabilities.md)

## Introduction

Two new API capabilities are created:

* The first one for generating payment terms.
* The second one for sending a payment that satisfies the payment terms.

It is assumed that the transacting entities are always named with an email
address. In other words, the payments are always from [name1]@[domain1] to
[name2]@[domain2].

## API Capabilities

A new **Payment Terms** API capability is created like this:

```json
{
  "capabilities": {
    "2a40af698840": "https://example.com/api/payment-terms/{alias}@{domain.tld}"
  }
}
```

The email address ```{alias}@{domain.tld}``` is where the payment is to be sent to.

The hex value ```2a40af698840``` is chosen for backwards-compatibility with the
*P2P Payment Destination* protocol [1].

A new **Payment** API capability is created like this:

```json
{
  "capabilities": {
    "5f1323cddf31": "https://example.com/api/payment/{alias}@{domain.tld}"
  }
}
```

The email address ```{alias}@{domain.tld}``` is where the payment is being sent to.

The hex value ```5f1323cddf31``` is chosen for backwards-compatibility with the
*P2P Transaction* protocol [2].

## Payment Terms End Point

## Payment End Point

## References

1. https://docs.moneybutton.com/docs/paymail/paymail-07-p2p-payment-destination.html
2. https://docs.moneybutton.com/docs/paymail/paymail-07-p2p-payment-destination.html