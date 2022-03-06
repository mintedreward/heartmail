---
brfc: true
title: Encrypted Keyfile for Authentication
authors:
  - Murray Distributed Technologies
version: 1
---
# Encrypted Keyfile for Authentication

{{yfm}}

Hash: 3a37773637ec
ID: keyfile

This capability allows the retrieval of the encrypted keyfile for a given paymail.

# Motivation
In order for us to use paymail domains as a native authentication mechanism, users must be able to retrieve the private keys needed to perform signatures inside of applications. This extension will enable a user to retrieve their encrypted keyfile from their paymail domain.  

## Capability discovery

The `.well-known/bsvalias` document is updated to include a public keyfile endpoint:

```json
{
  "bsvalias": "1.0",
  "capabilities": {
    "{{fm:brfc}}": "https://example.bsvalias.tld/api/{alias}@{domain.tld}/keyfile"
  }
}
```

The `capabilities.{{fm:brfc}}` is a template URL to query for the public keyfile information.

## Client Request

The `capabilities.{{fm:brfc}}` path returns a URI template. Senders _MUST_ replace `{alias}`, `{domain.tld}` placeholders with a valid paymail handle.

The client _MUST_ perform a GET request to the obtained URL.

## Server Response

The server response is a JSON object containing a hex encoded encrypted raw keyfile.

### 200 OK

Returned when a valid request was made. The response _MUST_ have `application/json` as content type. The response body _MUST_ follow this schema:

```json
{
  "bsvalias":"1.0",
  "handle": <alias>@<domain>.<tld>,
  "keyfile":"..."
}
```
### 404 Not Found
The paymail handle was not found by this service
