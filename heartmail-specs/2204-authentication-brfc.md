---
brfc: true
title: Email2 authentication (without revocation)
authors:
  - Murray Distributed Technologies
version: 1
---
# SBW 2004: Email2 authentication (without revocation)

ID: authentication

This capability allows the retrieval of an authentication URL for a given email2.

# Motivation
In order for us to use email2 domains as a native authentication mechanism, applications must know where to redirect users for authentication given their email2. The /authentication endpoint returns a URL to redirect the user to an endpoint to login. 

## Capability discovery

The `.well-known/bsvalias` document is updated to include a public authentication endpoint:

```json
{
  "bsvalias": "1.0",
  "capabilities": {
    "SBW-2004-email2-authentication": "https://example.bsvalias.tld/api/{alias}@{domain.tld}/authentication"
  }
}
```

The `capabilities.SBW-2004-email2-authentication` is a template URL to query for the public authentication information.

## Client Request

The `capabilities.SBW-2004-email2-authentication` path returns a URI template. Senders _MUST_ replace `{alias}`, `{domain.tld}` placeholders with a valid email2 handle.

The client _MUST_ perform a GET request to the obtained URL.

## Server Response

The server response is a JSON object containing a hex encoded encrypted raw keyfile.

### 200 OK

Returned when a valid request was made. The response _MUST_ have `application/json` as content type. The response body _MUST_ follow this schema:

```json
{
  "bsvalias":"1.0",
  "handle": <alias>@<domain>.<tld>,
  "authenticationUrl": "..."
}
```
### 404 Not Found
The email2 handle was not found by this service
