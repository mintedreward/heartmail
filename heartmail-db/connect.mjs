import * as cassandra from 'cassandra-driver'
import * as sigV4 from 'aws-sigv4-auth-cassandra-plugin'
import getCrt from './resources/sf-class2-root.crt.mjs'
import loadenv from 'heartmail-loadenv'

loadenv()
const crt = getCrt()

const region = process.env.AWS_REGION
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretKey = process.env.AWS_SECRET_ACCESS_KEY

// Check that environment variables are not undefined
if (!region) {
  console.log('You do not have a region set. Set environment variable AWS_REGION')
  process.exit(1)
}

if (!accessKey) {
  console.log('You do not have an access key set. Set environment variable AWS_ACCESS_KEY_ID')
  process.exit(1)
}

if (!secretKey) {
  console.log('You do not have a secret key set. Set environment variable AWS_SECRET_ACCESS_KEY')
  process.exit(1)
}

const auth = new sigV4.default.SigV4AuthProvider({
  region: region,
  accessKeyId: accessKey,
  secretAccessKey: secretKey
})

const host = 'cassandra.' + region + '.amazonaws.com'
const sslOptions = {
  ca: [
    crt
  ],
  host: host,
  rejectUnauthorized: true
}

const client = new cassandra.Client({
  contactPoints: [host],
  localDataCenter: region,
  authProvider: auth,
  sslOptions: sslOptions,
  protocolOptions: { port: 9142 }
})

export async function useKeyspace () {
  console.log(`Using keyspace ${process.env.HEARTMAIL_DB_KEYSPACE}`)
  const query = `use ${process.env.HEARTMAIL_DB_KEYSPACE}`
  await client.execute(query)
}

export function getClient () {
  return client
}
