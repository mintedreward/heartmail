import dotenv from 'dotenv'
import * as path from 'path'

const env = process.env.NODE_ENV

export default function loadenv () {
  // We mirror the next.js env var strategy
  // https://nextjs.org/docs/basic-features/environment-variables
  //
  // Note that dotenv does not override env vars by default, so earlier files
  // always have the preferred value.
  if (env === 'production') {
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env.production.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env.production`) })
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env.production.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env.production`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env`) })
  } else if (env === 'development') {
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env.development.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env.development`) })
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env.development.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env.development`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env`) })
  } else if (env === 'test') {
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env.test.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env.test`) })
    dotenv.config({ path: path.resolve(process.cwd(), '../', `.env`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env.test.local`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env.test`) })
    dotenv.config({ path: path.resolve(process.cwd(), `.env`) })
  } else {
    throw new Error('Invalid environment.')
  }
}

