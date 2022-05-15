SW 10: Advanced filter service
======================

# Status
Draft

# Authors
* Connor Murray <connor@britevue.com>
* Dylan Murray <dylan@britevue.com>

# Dependencies
* SW 9
* SW 107

# Specification

Utilize a transaction template identifier (hash of the transaction template) as
a 20-32 byte chunk of data that can be used as a filter keyword

## Benefits
* Enables filtering services to use a unique buffer in the rawTx to determine if it is relevant to them
* Filtering service emerges as second ring of the Mandala Network, bringing true overlay networks to Stamps inside script.
* By utilizing a header field to do this instead of OP_RETURN, the header checksum and transaction enforcement mechanism outlined in SW 7 can prevent DOS attacks against your overlay network

## Disclaimer
* Filtering services such as Planaria have been used to check OP_RETURN for certain strings. Any filtering service can emerge today that checks for any buffer in the rawTx


