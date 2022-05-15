SW 2007: Two Factor Friend (2FF) Service
======================================

Dependencies
------------

* SW 2001: Paymail
* SW 2002: Paymail identity keys
* SW 2006: 2FF

Introduction
------------

A 2FF can be any entity independent of the paymail host. For instance, for
stephen@unisot.io, the 2FF can be ryan@heartmail.com, ryan@heartmail.com is
independent of unisot.io.

The 2FF protocol requires that the 2FF be online when a key is retrieved. This
is a usability issue as these people may not be online when you need to log in.
This problem can be solved by using a 2FF-as-a-service. The way this can work is
through a paymail extension.

We extend paymail to offer a new service: '2FF-as-a-service'. This new extension
is just a paymail, for instance 2ff@heartmail.com. This service accepts all 2FF
requests. It may also charge money for this service.