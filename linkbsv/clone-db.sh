#!/bin/sh

echo Dumping from their database. Enter their DB password.
mongodump mongodb+srv://cluster0-linkbsv.qc87z.mongodb.net/linkBsv -u linkBsv-backend-server -p

echo Restoring to our database. Enter our DB password.
mongorestore --host linkbsv-docdb.cluster-cbtzb5eylgfi.us-west-2.docdb.amazonaws.com:27017 --username linkbsv --password

