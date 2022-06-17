/* global before,after */
import { useKeyspace, getClient } from '../connect.mjs'

const keyspace = process.env.HEARTMAIL_DB_KEYSPACE
const client = getClient()

before(async () => {
  if (keyspace !== 'heartmail_test') {
    process.exit('Must use keyspace heartmail_test to run the tests.')
  }
  await useKeyspace()
})

after(async () => {
  // prevent db connection from hanging forever after tests
  await client.shutdown()
  // process.exit()
})
