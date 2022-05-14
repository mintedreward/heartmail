/*
Affiliate:
- Retrieve affiliate external paymail

Payment:
- Accept and verify money button payment for early access
- Generate a new key & account

View:
- Retrieve information for a key
- Retrieve information for an account
*/

create keyspace if not exists heartmail with replication = {
    'class': 'SingleRegionStrategy',
    'replication_factor' : 3
};

create table if not exists heartmail.keys (
    id text,
    address text,
    pubKey text,
    privKey text,
    type text,
    created_time timestamp,
    primary key (id)
);

create table if not exists heartmail.accounts (
    keyId text,
    accessGrantedTime timestamp,
    externalEmail timestamp,
    externalPaymail timestamp,
    affiliateKeyId text,
    contactFeeAmountUsd float,
    primary key (keyId)
);

create table if not exists heartmail.externalEmails (
    email text,
    verified boolean,
    verifiedTime timestamp,
    primary key (email)
);

create table if not exists heartmail.externalPaymails (
    paymail text,
    verified boolean,
    verifiedTime timestamp,
    primary key (paymail)
);

create table if not exists heartmail.mbPayments (
    keyId text,
    mbClientIdentifier text,
    mbButtonId text,
    mbButtonData text,
    mbAmountUsd float,
    mbToHeartmailPaymail text,
    mbToHeartmailAmount text,
    mbToHeartmailCurrency text,
    mbToAffiliatePaymail text,
    mbToAffiliateAmount text,
    mbToAffiliateCurrency text,
    mbUserEmail text,
    mbUserEmailVerified text,
    mbUserPrimaryPaymail text,
    mbUserId text,
    mbTxid text,
    mbPaymentId text,
    mbPayment text,
    primary key (keyId)
);
