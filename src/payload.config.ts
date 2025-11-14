// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Divisions } from './collections/Divisions'
import { Categories } from './collections/Categories'
import { Comments } from './collections/Comments'
import { Tickets } from './collections/Tickets'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Divisions, Categories, Tickets, Comments],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl: { ca: process.env.POSTGRES_CA || undefined },
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})

// db: sqliteAdapter({
//   client: {
//     url: process.env.DATABASE_URI || '',
//   },
// }),
