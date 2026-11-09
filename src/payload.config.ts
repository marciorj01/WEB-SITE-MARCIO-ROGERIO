import path from 'path'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt as adminLanguage } from '@payloadcms/translations/languages/pt'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Categories } from './collections/Categories'
import { Authors } from './collections/Authors'
import { Articles } from './collections/Articles'
import { Properties } from './collections/Properties'
import { Developments } from './collections/Developments'
import { Leads } from './collections/Leads'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { Brand } from './globals/Brand'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const rawDatabaseUri = process.env.DATABASE_URI || process.env.POSTGRES_URL
const databaseUri = rawDatabaseUri
  ? rawDatabaseUri.replace('sslmode=require', 'sslmode=no-verify')
  : undefined

const databaseAdapter = databaseUri
  ? postgresAdapter({
      pool: {
        connectionString: databaseUri,
        ssl: {
          rejectUnauthorized: false,
        },
      },
    })
  : sqliteAdapter({
      client: {
        url: `file:${path.resolve(dirname, 'payload.db')}`,
      },
    })

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'marcio-rogerio-secret-dev-key-2026-payload',
  db: databaseAdapter,
  editor: lexicalEditor(),
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt: adminLanguage },
  },
  collections: [
    Admins,
    Media,
    Folders,
    Tags,
    Categories,
    Authors,
    Articles,
    Properties,
    Developments,
    Leads,
    NewsletterSubscribers,
  ],
  globals: [Brand],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
