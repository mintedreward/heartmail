CREATE KEYSPACE IF NOT EXISTS heartmail
    WITH replication = {'class': 'SingleRegionStrategy'};

CREATE TABLE IF NOT EXISTS heartmail.keys (
   name text,
   email text,
   age int,
   PRIMARY KEY (email)
);