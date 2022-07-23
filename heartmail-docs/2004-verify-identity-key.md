# Verify Identity Key

Verify that a public key is owned by an email address.

## Dependencies

* [API Capabilities](./2001-api-capabilities.md)
* [Identity Key](./2003-identity-key.md)

## Introduction

The use of an identity key for an email address provides a way for email
addresses to be use for digital signatures. However, signature verification
requires knowledge of whether the public key corresponds to the email address. A
new API capability is created to enable verification of the correspondence of a
public key to an email address.

## API Capability

An capability is added with a new end point:

```json
{
  "capabilities": {
    "a9f510c16bde": "https://www.example.org/api/paymail/verify/{alias}@{domain.tld}/{pubkey}"
  }
}
```

The hex value ```a9f510c16bde``` is chosen for backwards-compatibility with the
paymail capability "Verify Public Key Owner" [1, 2].

## The Verify End Point

A GET request is made to the end point.

If the key is not valid, an error is returned.

If the key is valid, a status 400 response is returned that may (or may not)
include a JSON blob with more information.

## References

1. https://docs.moneybutton.com/docs/paymail/paymail-05-verify-public-key-owner.html
2. https://bsvalias.org/05-verify-public-key-owner.html