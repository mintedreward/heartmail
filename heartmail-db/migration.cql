create keyspace if not exists heartmail {
    'class': 'SingleRegionStrategy'
};

create table if not exists heartmail.keys (
    aliasLeft bigint,
    aliasRight bigint,
    address text,
    pubKey text,
    privKey text,
    type text,
    data text,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (aliasLeft, aliasRight)
) with clustering order by (aliasRight);