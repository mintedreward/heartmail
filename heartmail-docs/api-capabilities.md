# API Capabilities

A way for web APIs to describe the capabilities they offer.

## API Description

**Names**: ```{alias}@{domain.tld}```, for instance name@example.com. Names are
compatible with email addresses.

**Capability Discovery**: A domain name hosts a JSON file at:

```https://{domain.tld}/.well-known/api-capabilities```

**API**: The JSON file format looks like this:

```json
{
  "capabilities": {}
}
```

There are no required capabilities.

## Backwards Compatibility

API Capabilities is similar to BSV Alias [1, 2]. To provide backwards
compatibility, the following optional strategies apply:

### Serving

Firstly, add a DNS SRV record at ```{domain.tld}``` pointing to
```{domain.tld}```.

The SRV record should have these properties:

| Parameter | Value                       |
|-----------|-----------------------------|
| Service   | `_bsvalias`                 |
| Proto     | `_tcp`                      |
| Name      | `<domain>.<tld>.`           |
| TTL       | `3600`                      |
| Class     | `IN`                        |
| Priority  | `10`                        |
| Weight    | `10`                        |
| Port      | `443`                       |
| Target    | `{domain.tld}`              |

Secondly, add an HTTP redirect from this location:

```https://{domain.tld}/.well-known/bsvalias```

To this location:

```https://{domain.tld}/.well-known/api-capabilities```

## Querying

If finding this document fails:

```https://{domain.tld}/.well-known/api-capabilities```

Then try this document:

```https://{domain.tld}/.well-known/bsvalias```

If that also fails, then try looking up the DNS SRV record. If the SRV record
exists and points to the domain ```{domain.tld}```, then query this document:

```https://{domain.tld}/.well-known/bsvalias``` to get the capabilities.

If that document also does not exist, then API capabilities are not supported.

## References

1. https://bsvalias.org
2. https://docs.moneybutton.com/docs/paymail/paymail-overview.html
