# Identity Key

A public key for signatures and encryption for email addresses.

## Dependencies

* [API Capabilities](./2001-api-capabilities.md)
* [Public Key](../heartmail-lib/src/pub-key.mjs)

## Introduction

A new capability to deliver a Bitcoin public key in compressed DER hex format
(the de facto standard) is provided for an email address.

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

The ```pki``` end point provides a JSON object upon a GET request that looks
like this:

```json
{
  "pubkey": "024ee0d073cb52afd3f4207cee0a65504d2fc85a184451c8688fd3788e60d521c5"
}
```

## References

* https://docs.moneybutton.com/docs/paymail/paymail-03-public-key-infrastructure.html
* https://bsvalias.org/03-public-key-infrastructure.html
