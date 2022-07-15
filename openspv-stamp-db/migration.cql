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
  email2 text,
  name text,
  bio text,
  website text,
  email text,
  emailVerified boolean,
  primary key (userId)
);

create table openspv.emails (
  email text,
  userId text,
  verificationTime timestamp,
  verificationToken text,
  primary key (email)
);

create table openspv.emailVerificationTokens (
  email text,
  verificationToken text,
  createdTime timestamp,
  expirationTime timestamp,
  primary key (email)
);

create table openspv.email2s (
  email2 text,
  userId text,
  primary key (email2)
);

create table openspv.identityKeys (
  userId text,
  passwordHmacHmac text,
  address text,
  pubKey text,
  createdTime timestamp,
  revokedTime timestamp,
  primary key (userId)
);

create table openspv.derivedKeys (
  userId text,
  identityAddress text,
  derivationPrivKey text,
  derivationPubKey text,
  derivedAddress text,
  createdTime timestamp,
  primary key (userId, identityAddress, derivedAddress)
);

create table openspv.txInsAndOuts (
  userId text,
  identityAddress text,
  createdTime timestamp,
  type text,
  scriptTemplateType text,
  scriptTemplateJSON text,
  txId text,
  satoshis bigint,
  txIn text,
  txOut text,
  usedTime timestamp,
  spentTime timestamp,
  spentTxId text,
  blockId text,
  blockIndex int,
  conversionTime timestamp,
  priceUSD float,
  confirmedBalanceSatoshis bigint,
  unconfirmedBalanceSatoshis bigint,
  primary key (userId, createdTime, identityAddress)
);

create table openspv.invoices (
  id uuid,
  userId text,
  receivingEmail2 text,
  sendingEmail2 text,
  conversionTime timestamp,
  amountSatoshis bigint,
  amountUSD float,
  txOuts text,
  createdTime timestamp,
  expiredTime timestamp,
  paidTime timestamp,
  paidTxIds text,
  primary key (id)
);

create table openspv.price (
  conversionTime timestamp,
  priceUSD float,
  primary key (conversionTime)
);

# create table openspv.twoFactorFriends ...