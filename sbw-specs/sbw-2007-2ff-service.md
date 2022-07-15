SBW 2007: Two Factor Friend (2FF) Service
======================================

Dependencies
------------

* SBW 2001: Email2
* SBW 2002: Email2 identity keys
* SBW 2006: 2FF

Introduction
------------

A 2FF can be any entity independent of the email2 host. For instance, for
stephen@unisot.io, the 2FF can be ryan@heartmail.com, ryan@heartmail.com is
independent of unisot.io.

The 2FF protocol requires that the 2FF be online when a key is retrieved. This
is a usability issue as these people may not be online when you need to log in.
This problem can be solved by using a 2FF-as-a-service. The way this can work is
through a email2 extension.

We extend email2 to offer a new service: '2FF-as-a-service'. This new extension
is just a email2, for instance 2ff@heartmail.com. This service accepts all 2FF
requests. It may also charge money for this service.