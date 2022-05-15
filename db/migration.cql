create keyspace if not exists heartmail with replication = {
    'class': 'SingleRegionStrategy',
    'replication_factor' : 3
};

create table if not exists heartmail.keys (
    alias text,
    address text,
    pubKey text,
    privKey text,
    type text,
    created_time timestamp,
    primary key (alias)
);

create table if not exists heartmail.accounts (
    keyAlias text,
    accessGrantedTime timestamp,
    externalEmail timestamp,
    externalEmail2 timestamp,
    affiliateKeyAlias text,
    contactFeeAmountUsd float,
    primary key (keyAlias)
);

create table if not exists heartmail.externalEmails (
    email text,
    verified boolean,
    verifiedTime timestamp,
    primary key (email)
);

create table if not exists heartmail.externalEmail2s (
    email2 text,
    verified boolean,
    verifiedTime timestamp,
    primary key (email2)
);

create table if not exists heartmail.mbPayments (
    keyAlias text,
    mbClientIdentifier text,
    mbButtonId text,
    mbButtonData text,
    mbAmountUsd float,
    mbToHeartmailEmail2 text,
    mbToHeartmailAmount text,
    mbToHeartmailCurrency text,
    mbToAffiliateEmail2 text,
    mbToAffiliateAmount text,
    mbToAffiliateCurrency text,
    mbUserEmail text,
    mbUserEmailVerified text,
    mbUserPrimaryEmail2 text,
    mbUserId text,
    mbTxid text,
    mbPaymentId text,
    mbPayment text,
    primary key (keyAlias)
);
