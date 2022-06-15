import { getClient, useKeyspace } from './connect.mjs'
import { DbAccessKey } from './index.mjs'
const client = getClient()

;(async function () {
  await useKeyspace()
  const dbAccessKeys = await DbAccessKey.findAll()
  const jsonArr = dbAccessKeys.map((val, index) => val.toJSON())
  console.log('[')
  for (let i = 0; i < jsonArr.length; i++) {
    console.log(jsonArr[i])
    if (i < jsonArr.length - 1) {
      console.log(',')
    }
  }
  console.log(']')
  await client.shutdown()
})()
