# SBW 2002: Identity Key

## Dependencies

* SBW 2001: Simplified Paymail

## Introduction

A Bitcoin public key in compressed DER hex format (the established standard) is
provided in a paymail capability.

## Paymail Capability

Paymail is extended with the ```pki``` capability like this:

```json
{
  "capabilities": {
    "pki": "https://www.example.org/api/paymail/id/{paymail}",
  }
}
```

```{paymail}``` is replaced with the paymail when the query to the ```pki``` end
point is performed.

## The PKI End Point

The ```pki``` end point provides a JSON object that looks like this:

```json
{
  "pubkey": "..."
}
```
