import { getClient, useKeyspace } from './connect.mjs'
const client = getClient()
const keyspace = process.env.HEARTMAIL_DB_KEYSPACE

const query = `
create table if not exists ${keyspace}.keys (
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
)
`

;(async function () {
  await useKeyspace()
  await client.execute(query)
  console.log('Migration complete.')
  await client.shutdown()
})()
