# linkbsv.com

Created by Casey Hamilton & Greg Ward. Purchased from Greg Ward in March, 2022.

Ryan X. Charles has root access to the server to facilitate migration.

## Dumping their DB from their server

This DB dump contains private user data. Do not show to the public.

Log into linkbsv.com with:

ssh root@linkbsv.com

Visit this directory:

cd /home/linkbsv.com/backend

Dump data with this command:

mongodump -u linkBsv-backend-server -p [password] mongodb+srv://cluster0-linkbsv.qc87z.mongodb.net/linkBsv

Exit ssh and copy to this directory with:

scp -r root@linkbsv.com:/home/linkbsv.com/backend/dump ./

You can restore with:

mongorestore

mongorestore --host linkbsv.cluster-cbtzb5eylgfi.us-west-2.docdb.amazonaws.com:27017 --username linkbsv --password [password]

This database can be restored to a new database hosted on AWS.

## Cloning their DB to our DB from our server

mongodump mongodb+srv://cluster0-linkbsv.qc87z.mongodb.net/linkBsv -u linkBsv-backend-server -p [password]

mongorestore --host linkbsv-docdb.cluster-cbtzb5eylgfi.us-west-2.docdb.amazonaws.com:27017 --username linkbsv --password [password]
