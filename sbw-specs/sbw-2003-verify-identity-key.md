# SBW 2003: Verify Identity Key

## Dependencies

* SBW 2001: Simplified Paymail
* SBW 2002: Paymail Identity Keys

## Introduction

Allows clients to verify if a public key is a valid identity key for a paymail.

### Capability discovery

A paymail capability is added with a new end point:

```json
{
  "capabilities": {
    "a9f510c16bde": "https://www.example.org/api/paymail/verify/{paymail}/{pubkey}"
  }
}
```

## The Verify End Point

If the key is not valid, an error is returned.

If the key is valid, a status 400 response is returned that may (or may not)
include a JSON blob with more information.
