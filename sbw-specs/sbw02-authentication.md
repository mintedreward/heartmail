SBW2: Authentication
====================

It is important for stephan@unisot.io to be able to log into heartmail.com and
it is important for ryan@heartmail.com to be able to log into unisot.io.

The way we do this is by extending paymail with:
- A way to query for redirect URL
- Send the user there with meta information
- Retrieve the user back again with meta information
- Meta information must include permissions, e.g. ability to grand permission to spend balance, view private data, etc.