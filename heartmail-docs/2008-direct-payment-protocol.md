# Direct Payment Protocol (DPP)

## Dependencies

* API Capabilities
* Identity Key
* Merkle Proof
* Transaction Ancestors

## Introduction

A new API capability is created to enable generating Bitcoin invoices and making
Bitcoin payments in a manner consistent with SPV as described in the Bitcoin
white paper.

## API Capability

A new API capability is created like this:

```json
{
  "capabilities": {
    "direct-payment-protocol": "https://example.com/api/dpp/{alias}@{domain.tld}"
  }
}
```

## Messages

### Invoice Request

### Invoice

```json
{
  "creationTimestamp": "",
  "expirationTimestamp": "",
  "paymentUrl": "",
  "outputs": [ "..." ]
}
```

### Payment

### PaymentAck