# Identity Key

## Dependencies

* [API Capabilities](./2001-api-capabilities.md)
* [Public Key](../heartmail-lib/src/pub-key.mjs)

## Introduction

A public key in compressed DER hex format is provided for an email address.

## API Capability

A ```pki``` capability is added like this:

```json
{
  "capabilities": {
    "pki": "https://www.example.org/api/paymail/id/{alias}@{domain.tld}",
  }
}
```

```{alias}@{domain.tld}``` is replaced with the email address when the query to
the ```pki``` end point is performed.

## The PKI End Point

The ```pki``` end point provides a JSON object that looks like this:

```json
{
  "pubkey": "..."
}
```
