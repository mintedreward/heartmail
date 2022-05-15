SW 2005: Paymail authentication without revocation
================================================

Dependencies
------------

* SW 2001: Paymail
* SW 2002: Paymail identity keys
* SW 2004: Paymail signatures without revocation

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

Brainstorm
----------

* there needs a web server to handle web login
* even for mobile / desktop ... consider facebook uses web login a lot
* paymail implementation
* web front end for authentication ... bounce from one server to another
* flow:
** user visits unisot.io
** user types in username@heartmail.com
** unisot.io web front-end redirects containing meta information (username@heartmail.com and unisot.io destinstion) to heratmail.com/authentication (or whatever URL is specified in paymail extension)
** user then logs into heartmail ... can happen automtically if user is already logged in with a cookie or local storage
** user then gets redirected back to unisot.io/finish-authetnication (or whatever URL is specified in a paymail extension) with meta information (username@heartmail.com ... plus permissions, including ability to see name, balance?, access balance?)
** now in the top right of unisot.io it says "Full Name <username@heartmail.com>"
* research OAuth
* research: HWallet (before AbbotWallet)

Order:
1. Authentication off-chain identity / off-chain login
2. Authentication on-chain identity / off-chain login
3. Authentication on-chain identity / on-chain login

What is the service?
* user@heartmail.com logs into appname@unisot.io
* merkelproofservice@unisot.io
* filterservice@unisot.io ... or app@filterservice.unisot.io

No redirect:
* user visits unisot.io and wants to log in
* user types in username@heartmail.com
* unisot.io grabs paymail and then pings heartmail.com directly
* heartmail.com knows that user is ready logged in with mobile app with notifications on
* heartmail.com sends notification, silently in teh background, to user's mobile
* mobile app responds saying "this satisfies all my login conditions - yes i agree to log in - " without ever having to even so much as see anything on the scrren
* heartmail.com gets back the login authorization
* and then sends the token back to unisot.com
* and now the user is logged in without even using a redirect

Or.... iframe version
* tyep in paymail
* use the redirect ... but with an iframe... works in all browsers other than safari