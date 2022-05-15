SW 2009: Script template labels
==============================

Dependencies
------------

* Stamps

Introduction
------------

In order to create standardized filter services, we need standardized ways to
match on the outputs. We can use the outputs themselves minus variable push
datas. However, for long scripts, they might be very long. Therefore we may want
to also defined the hash of the script (minus variable push datas) as the label
fo the transaction template. Filter services can then use this to provide their
API.

The transaction template label should be the hash of the output minus all
variable length push datas. It doesn't matter too much which hash function we
use.