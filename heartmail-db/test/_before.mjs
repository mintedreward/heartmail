/* global before,after */
import { useKeyspace, getClient } from '../connect.mjs'

const client = getClient()

before(async () => {
  await useKeyspace()
})

after(async () => {
  // prevent db connection from hanging forever after tests
  await client.shutdown()
  // process.exit()
})
