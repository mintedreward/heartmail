# API Capabilities

API Capabilities is the same thing as paymail but simpler in a backwards compatible
way.

**Names**: [name]@[domain], for instance name@example.com. Names are compatible
with email addresses.

**Capability Discovery**: A domain name hosts a JSON file at:

https://[domain]/.well-known/bsvalias

**API**: The JSON file format looks like this:

```json
{
  "capabilities": {}
}
```

There are no required capabilities.
