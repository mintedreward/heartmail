import { getClient, useKeyspace } from './connect.mjs'
const client = getClient()
const keyspace = process.env.HEARTMAIL_DB_KEYSPACE

const queries = [
`create table if not exists ${keyspace}.keys (
  key_alias_left bigint,
  key_alias_right bigint,
  key_address text,
  pub_key text,
  priv_key text,
  type_str text,
  data_buf blob,
  created_at timestamp,
  updated_at timestamp,
  primary key (key_alias_left, key_alias_right)
)`,
`create table if not exists ${keyspace}.accounts (
  id text,
  priv_key text,

  created_at timestamp,
  updated_at timestamp,
  signed_in_at timestamp,

  name text,
  primary_heartmail_address text,
  bio text,
  contact_fee_amount_usd double,
  affiliate_id text,

  access_granted_at timestamp,
  mb_payment_id text,
  mb_txid text,
  mb_email text,
  mb_paymail text,
  mb_identity_key text,

  primary key (id)
)`,
`create table if not exists ${keyspace}.mb_paymail_accounts (
  mb_paymail text,

  created_at timestamp,
  updated_at timestamp,
  signed_in_at timestamp,

  account_id text,
  account_name text,
  account_primary_heartmail_address text,
  account_bio text,

  primary key (mb_paymail, signed_in_at)
) with clustering order by (signed_in_at desc)`,
`create table if not exists ${keyspace}.heartmail_addresses (
  heartmail_address text,

  account_id text,

  created_at timestamp,
  updated_at timestamp,

  primary key (heartmail_address)
)`,
`create table if not exists ${keyspace}.account_heartmail_addresses (
  account_id text,

  heartmail_address text,

  created_at timestamp,
  updated_at timestamp,

  primary key (account_id, updated_at)
) with clustering order by (updated_at desc)`,
`create table if not exists ${keyspace}.account_avatars (
  account_id text,
  size int,
  avatar_buf blob,

  created_at timestamp,
  updated_at timestamp,

  primary key (account_id, size)
)`
]

;(async function () {
  await useKeyspace()
  for (let i = 0; i < queries.length; i++) {
    if (queries[i]) {
      await client.execute(queries[i])
    }
  }
  console.log('Migration complete.')
  await client.shutdown()
})()
