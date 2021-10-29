create keyspace openspv with replication = {
  'class': 'SimpleStrategy',
  'replication_factor' : 3
};

create table openspv.blockHeaders (
  blockId text,
  blockIndex int,
  blockHeader text,
  totalDifficulty double,
  PRIMARY KEY (blockIndex, blockId)
);

create table openspv.users (
  userId text,
  paymail text,
  name text,
  bio text,
  website text,
  email text,
  emailVerified bool,
  primary key (userId)
);

create table openspv.emails (
  email text,
  userId text,
  verificationTime time,
  verificationToken text,
  primary key (email)
);

create table openspv.emailVerificationTokens (
  email text,
  verificationToken text,
  createdTime time,
  expirationTime time,
  primary key (email)
);

create table openspv.paymails (
  paymail text,
  userId text,
  primary key (paymail)
);

create table openspv.identityKeys (
  userId text,
  passwordHmacHmac text,
  address text,
  pubKey text,
  createdTime time,
  revokedTime time,
  primary key (userId)
);

create table openspv.derivedKeys (
  userId text,
  identityAddress text,
  derivationPrivKey text,
  derivationPubKey text,
  derivedAddress text,
  createdTime time,
  primary key (userId, identityAddress, derivedAddress)
);

create table openspv.txInsAndOuts (
  userId text,
  identityAddress text,
  createdTime time,
  type text,
  scriptTemplateType text,
  scriptTemplateJSON text,
  txId text,
  satoshis bigint,
  txIn text,
  txOut text,
  usedTime time,
  spentTime time,
  spentTxId text,
  blockId text,
  blockIndex int,
  conversionTime time,
  priceUSD float,
  confirmedBalanceSatoshis bigint,
  unconfirmedBalanceSatoshis bigint,
  primary key (userId, createdTime, address)
);

create table openspv.invoices (
  id uuid,
  userId text,
  receivingPaymail text,
  sendingPaymail text,
  conversionTime time,
  amountSatoshis bigint,
  amountUSD float,
  txOuts text,
  createdTime time,
  expiredTime time,
  paidTime time,
  paidTxIds text,
  primary key (id)
);

create table openspv.price (
  conversionTime time,
  priceUSD float,
  primary key (conversionTime)
);

# create table openspv.twoFactorFriends ...