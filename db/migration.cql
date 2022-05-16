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
    address text,
    verified boolean,
    verifiedTime timestamp,
    primary key (address)
);

create table if not exists heartmail.externalPaymails (
    address text,
    verified boolean,
    verifiedTime timestamp,
    primary key (address)
);

create table if not exists heartmail.mbPayments (
    keyAlias text,
    mbClientIdentifier text,
    mbButtonId text,
    mbButtonData text,
    mbAmountUsd float,
    mbToHeartmailAddress text,
    mbToHeartmailAmount text,
    mbToHeartmailCurrency text,
    mbToAffiliateAddress text,
    mbToAffiliateAmount text,
    mbToAffiliateCurrency text,
    mbUserEmail text,
    mbUserEmailVerified text,
    mbUserPrimaryPaymail text,
    mbUserId text,
    mbTxid text,
    mbPaymentId text,
    mbPayment text,
    primary key (keyAlias)
);
