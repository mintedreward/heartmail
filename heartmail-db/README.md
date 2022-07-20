HeartMail Database
================

The database is AWS Keyspaces. This is chosen to be a scalable database
compatible with Apache Cassandra so that the HeartMail codebase can be
abstracted to run in any cloud provider in the future (although at present we
are on AWS only.)

Consumers
---------

Consumers of the database, such as the web API, should only ever use the dbApi
and should not use the models directly. The reason for this is that because we
use a Cassandra-compatible database (Keyspaces) we have to maintain data
consistency ourselves. The dbApi is designed to handle all data consistency
issues.

Data structures
---------------

The data structures are contained in the structs directory. Every struct should
NOT include any IO. They do not write to disk and they do not access the
database. In fact, they don't even understand Cassandra data types. That is
because the structs are for use both server-side and client-side and there
shouldn't be any server-side logic sent to the browser.

Database models
---------------

The models are contained inside the models directory and are always prefixed
with "db-". Each model corresponds to a struct. Each model contains a struct.
For instance, the account struct as a corresponding db-account model. The models
read and write to the database and also contain cassandra data type
encoding/decoding logic.

A model should never depend on other models. If you are reading/writing multiple
models simultaneously, then that code belongs in the dbApi, not in a model.

A model is always responsible for maintaining its own data integrity. For
instance, a model must prevent invalid fields from being inserted into the
database. A model is never responsible for any model other than itself.

Database API
------------

The database API (dbApi) is an abstraction over all the models to maintain data
consistency between models. Models cannot maintain consistency between themseles
and another model, therefore that responsibility lies in the dbApi. For
instance, if you delete a row, make sure you also delete all other references to
the row with that ID. This responsibility lies inside the dbApi.