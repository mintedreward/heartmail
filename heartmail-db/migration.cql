create keyspace if not exists heartmail with replication = {
    'class': 'SingleRegionStrategy',
    'replication_factor' : 3
};

create table if not exists heartmail.keys (
    alias text,
    address text,
    pubKey text,
    privKey text,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (alias)
);

create table if not exists heartmail.accounts (
    keyAlias text,
    accessGrantedAt timestamp,
    signInEmailAddress text,
    paymentEmailAddress text,
    affiliateKeyAlias text,
    contactFeeAmountUsd float,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (keyAlias)
);

create table if not exists heartmail.emailAddresses (
    address text,
    isEmail boolean,
    isPaymail boolean,
    isInternal boolean,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (address)
);

create table if not exists heartmail.emailAddressAccounts (
    emailAddress text,
    keyAlias text,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (emailAddress)
);

create table if not exists heartmail.invoices (
    keyAlias text,
    amountUsd float,
    paid boolean,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (keyAlias)
);

create table if not exists heartmail.payments (
    keyAlias text,
    metaData text,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (keyAlias)
);

/*
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
    createdAt timestamp,
    updatedAt timestamp,
    primary key (keyAlias)
);
*/
