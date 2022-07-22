# Verify Identity Key

## Dependencies

* [API Capabilities](./2001-api-capabilities.md)
* [Identity Key](./2003-identity-key.md)

## Introduction

Allows clients to verify if a public key is a valid identity key for an email address.

## API Capability

An capability is added with a new end point:

```json
{
  "capabilities": {
    "a9f510c16bde": "https://www.example.org/api/paymail/verify/{alias}@{domain.tld}/{pubkey}"
  }
}
```

## The Verify End Point

If the key is not valid, an error is returned.

If the key is valid, a status 400 response is returned that may (or may not)
include a JSON blob with more information.
