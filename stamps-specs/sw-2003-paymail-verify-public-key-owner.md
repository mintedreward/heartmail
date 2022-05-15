# SW 2003: Email2 verify public key owner

## Authors

* Andy &lt;[unknown]@nchain.com&gt;
* Ryan X. Charles &lt;ryan@heartmail.com&gt;
* Miguel Duarte &lt;miguel@moneybutton.com&gt;

## Dependencies

* SW 2001: Email2
* SW 2002: Email2 identity keys

## Introduction

In the original email2 protocol specifications, there was an identity public
key that you could use to sign stuff. Someone can verify the signature of a
email2 by checking that the public key used is the one attached to the email2.

But there is a problem with this approach, which is that the public key may
change.

If the public key changes, old signatures are no longer valid, even though they
were valid at the time the signature was created.

This specification allows one to check whether a public key was ever associated
with a email2, meaning old signatures continue to be valid.

This is still not the best approach. Ultimately, we want to simply log keys and
revocations on the blockchain to completely fix PKI. But for for now, we adopt
this protocol for backwards-compatibility with existing email2 signature
implementations, and we plan to extend these specifications on-chain when we can
to fully fix all the PKI issues.

The original email2 "verify public key owner" spec can be found here:

https://www.bsvalias.org/05-verify-public-key-owner.html

## Verify Public Key Owner

This capability allows clients to verify if a given public key is a valid identity key for a given email2 handle.

### Motivation

The public key returned by pki flow for a given email2 handle may change over time. This situation may produce troubles to verify data signed using old keys, because even having the keys, the verifier doesn't know if the public key actually belongs to the right user.

### Capability discovery

The `.well-known/bsvalias` document is updated to include a declaration public key owner validation enpoint:

```json
{
  "bsvalias": "1.0",
  "capabilities": {
    "a9f510c16bde": "https://example.bsvalias.tld/api/{alias}@{domain.tld}/{pubkey}"
  }
}
```

The `capabilities.a9f510c16bde` is a template URL to verify the ownership of the public key.

### Client Request

The `capabilities.a9f510c16bde` path returns a URI template. Senders _MUST_ replace `{alias}`, `{domain.tld}` placeholders with a valid email2 handle. `{pubkey}` placeholder _MUST_ be a valid point on the secp256k1 curve, compressed, and hex-encoded. The client _MUST_ perform a GET request to the obtained URL.

### Server Response

Below are the responses that have meaning to this protocol. A server may return other status codes, for example `5xx` indicating some sort of server failure. Clients should treat status codes not specified as part of this specification as some sort of transient error and may retry at their leisure.

#### 200 OK

Returned when a valid request was made. The response _MUST_ have `application/json` as content type. The response body _MUST_ follow this schema:

```json
{
  "handle":"someemail2handle@domain.tld",
  "pubkey":"<consulted pubkey>",
  "match": true,
}
```

| Field         |  Description |
|---------------|--------------|
| `handle`   | queried handle |
| `pubkey` | queried public key |
| `match` | `true` if pubkey belongs to email2 handle. `false` otherwise. |

This endpoint returns status 200 everytime the request is valid. If the email2 handle is unknown to the server it returns 200 anyway, but `false` in the match field.

#### Client Request

A public key is added to the body of the request. The final schema is the following:

```json
{
    "senderName": "FirstName LastName",
    "senderHandle": "<alias>@<domain.tld>",
    "dt": "<ISO-8601 timestamp>",
    "amount": 550,
    "purpose": "message to receiver",
    "signature": "<compact Stamps message signature>",
    "pubkey":"<valid public key>"
}
```

#### Flow

![Verify public key flow](./SW-2003-verify-public-key-flow.png)