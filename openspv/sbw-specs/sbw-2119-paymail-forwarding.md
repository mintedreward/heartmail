SBW 119: Paymail Forwarding
==========================

An extension to paymail to allow people to specify a new primary paymail.

Old primary paymail:

user@example.com

New primary paymail:

user@example.net

In this example, user@example.com needs a paymail extension to specify that this
is no longer the primary paymail, and that all contact cards should be updated
to use user@example.net instead.

The forwarding could last either indefinitely or for a fixed period, similar to
how HTTP redirects are handled. We should model our protocol after HTTP
redirects.