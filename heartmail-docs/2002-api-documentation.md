# API Documentation

A URL for human-readable documentation for web APIs.

## Dependencies

* [API Capabilities](./2001-api-capabilities.md)

## Introduction

API Capabilities provides a solution to machine-to-machine API capability
discovery, but machine-to-human capability discovery requires human-readable
documentation.

Standardized API documentation eliminates the need to have a centralized
location for API capability documentation. Every service provides its own
documentation. If a service is encountered that supports a capability that is
not currently supported, a human intervenes to read the documentation and add
support, if desired. Every service is its own standards body.

## API Capability

A new API capability is added to provide a URL for human-readable documentation:

```json
{
  "capabilities": {
    "api-documentation": "https://example.com/docs"
  }
}
```
