# SBW 2001: Simplified Paymail

Simplified paymail is the same thing as paymail but simpler in a
backwards-compatible way.

**Names**: [name]@[domain], for instance name@example.com. Names are 100%
compatible with email addresses and it is intended that emails and paymails are
the same, but there is no requirement for paymail providers to support email.

**Capability discovery**: A domain name hosts a JSON file at:

https://[domain]/.well-known/bsvalias

**API**: The JSON file format looks like this:

```json
{
  "capabilities": [ ... ]
}
```

There are no required capabilities.
