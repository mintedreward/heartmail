create keyspace if not exists heartmail with replication = {
    'class': 'SingleRegionStrategy'
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
    ownerEmailAddress text,
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
    accountKeyAlias text,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (emailAddress)
);

create table if not exists heartmail.invoices (
    keyAlias text,
    amountUsd float,
    paymentKeyAlias text,
    createdAt timestamp,
    updatedAt timestamp,
    primary key (keyAlias)
);

create table if not exists heartmail.payments (
    keyAlias text,
    invoiceKeyAlias text,
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
