# API Capabilities

A standard way for web APIs to describe the capabilities they offer.

## Introduction

The standard way for web services to communicate is via REST-like APIs with JSON
data delivered over HTTPS.

A problem with this approach is that web services cannot automatically
communicate with each other unless a human intervenes to read documentation and
program API support.

The need for human intervention can be removed to allow automatic web API
capability discovery through the use of standardized API capability
descriptions.

For instance, a standardized API for making payments can be created. Any two
services that share the payments capability in common can make payments to each
other automatically with no human intervention.

Web services may have users. The standard naming system for users is email
addresses. Email addresses are decentralized globally unique identifiers that
may be used for humans or entities of any sort such as businesses, machines, or
functions.

## API Description

**Names**: ```{alias}@{domain.tld}```, for instance name@example.com. Names are
compatible with email addresses.

**Capability Discovery**: A domain name hosts a JSON file at:

```https://{domain.tld}/.well-known/bsvalias```

**API**: The JSON file format looks like this:

```json
{
  "capabilities": {}
}
```

There are no required capabilities.

## Comparison to Paymail

API Capabilities is the same thing as paymail [1, 2] but simpler in a backwards
compatible way.

The primary difference is the removal of any need for DNS SRV records. The only
reason to use the SRV record is for "paymail hosting", which does not actually
require an SRV record. Instead of an SRV record, use an HTTP redirect on the
JSON document. Or, provide API capabilities that are all hosted at a different
domain, e.g. ```https://api.{domain.tld}``` or
```https://{alternate-domain.tld}/api```.

## References

1. https://bsvalias.org
2. https://docs.moneybutton.com/docs/paymail/paymail-overview.html
