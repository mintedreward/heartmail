SBW 119: Email2 Forwarding
==========================

An extension to email2 to allow people to specify a new primary email2.

Old primary email2:

user@example.com

New primary email2:

user@example.net

In this example, user@example.com needs a email2 extension to specify that this
is no longer the primary email2, and that all contact cards should be updated
to use user@example.net instead.

The forwarding could last either indefinitely or for a fixed period, similar to
how HTTP redirects are handled. We should model our protocol after HTTP
redirects.