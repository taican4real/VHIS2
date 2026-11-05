import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { fileURLToPath } from 'url'

import { Pages } from './src/collections/Pages'
import { Divisions } from './src/collections/Divisions'
import { News } from './src/collections/News'
import { Enquiries } from './src/collections/Enquiries'
import { Media } from './src/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— VHIS CMS',
    },
  },
  editor: undefined,
  collections: [Pages, Divisions, News, Enquiries, Media],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  secret: process.env.PAYLOAD_SECRET || 'development-secret-do-not-use-in-production',
  db: postgresAdapter({
    pool: {
      min: 1,
      max: 10,
    },
  }),

  onInit: async (payload) => {
    const existingUsers = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@vhis.example',
          password: 'change-me-immediately',
          role: 'admin',
        },
      })
      payload.logger.info('Seeded default admin user (admin@vhis.example)')
    }
  },
})