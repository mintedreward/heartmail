SBW 4: Paymail authentication without revocation
================================================

Dependencies
------------

* SBW 1: Paymail
* SBW 2: Paymail identity keys
* SBW 3: Paymail signatures without revocation

Introduction
------------

It is important for stephan@unisot.io to be able to log into heartmail.com and
it is important for ryan@heartmail.com to be able to log into unisot.io.

The way we do this is by extending paymail with:
- A way to query for redirect URL
- Send the user there with meta information
- Retrieve the user back again with meta information
- Meta information must include permissions, e.g. ability to grand permission to spend balance, view private data, etc.

This version of the spec uses a paymail signature without revocation.