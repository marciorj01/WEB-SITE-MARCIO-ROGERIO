import { getPayload } from 'payload'
import config from '@payload-config'
import type { Config } from '@/payload-types'
import { unstable_cache, unstable_noStore } from 'next/cache'

type CollectionSlug = keyof Config['collections']

/**
 * Get the Payload instance configured for this project.
 * Use this in server components and route handlers.
 */
export async function getPayloadClient() {
  const payloadConfig = await config
  return getPayload({ config: payloadConfig })
}

const isProductionBuild = () => process.env.NEXT_PHASE === 'phase-production-build'

/**
 * Wrap a Payload read so an unreachable database cannot fail `next build`.
 * Outside the build, errors propagate as usual. During the build, a failed
 * read opts the current route out of static generation (it is rendered on
 * demand at request time instead) and `generateStaticParams` gets the
 * fallback, so no empty page is baked into the deploy. Once the database is
 * reachable at build time, routes are prerendered statically again.
 */
export function withBuildFallback<Args extends unknown[], R>(
  read: (...args: Args) => Promise<R>,
  fallback: R,
): (...args: Args) => Promise<R> {
  return async (...args) => {
    try {
      return await read(...args)
    } catch (error) {
      if (!isProductionBuild()) throw error
      console.warn(
        `[payload] Database unavailable during build; rendering on demand instead. ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
      unstable_noStore()
      return fallback
    }
  }
}

/**
 * Find a single document by slug in any collection.
 * Returns the document if found, or null if not found.
 *
 * Use this shared helper instead of duplicating slug lookup logic
 * in each route file. Call `notFound()` from `next/navigation`
 * when this returns null.
 *
 * @example
 * ```tsx
 * import { findBySlug } from '@/lib/payload'
 * import { notFound } from 'next/navigation'
 *
 * export default async function ArticlePage({ params }) {
 *   const { slug } = await params
 *   const article = await findBySlug('articles', slug)
 *   if (!article) notFound()
 *   return <Article data={article} />
 * }
 * ```
 */
export async function findBySlug<T extends CollectionSlug>(
  collection: T,
  slug: string,
  options?: {
    /** Include draft documents (default: false, only published) */
    draft?: boolean
    /** Relationship population depth (default: 2) */
    depth?: number
  },
): Promise<Config['collections'][T] | null> {
  const { draft = false, depth = 2 } = options ?? {}
  const query = async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection,
      overrideAccess: false,
      where: { slug: { equals: slug } },
      depth,
      limit: 1,
      draft,
    })
    return (result.docs[0] as Config['collections'][T]) ?? null
  }
  if (draft) return query()
  return withBuildFallback(
    unstable_cache(query, ['detail', collection, slug, String(depth)], {
      tags: [collection, `${collection}:${slug}`, 'media'],
    }),
    null,
  )()
}

/**
 * Find a single document by a custom field value.
 * Returns the document if found, or null if not found.
 *
 * Useful for collections that use a field other than `slug` for routing,
 * such as `title`, `handle`, or `sku`.
 *
 * @example
 * ```tsx
 * import { findByField } from '@/lib/payload'
 * import { notFound } from 'next/navigation'
 *
 * export default async function ProductPage({ params }) {
 *   const { sku } = await params
 *   const product = await findByField('products', 'sku', sku)
 *   if (!product) notFound()
 *   return <Product data={product} />
 * }
 * ```
 */
export async function findByField<T extends CollectionSlug>(
  collection: T,
  field: string,
  value: string,
  options?: {
    /** Include draft documents (default: false, only published) */
    draft?: boolean
    /** Relationship population depth (default: 2) */
    depth?: number
  },
): Promise<Config['collections'][T] | null> {
  const payload = await getPayloadClient()
  const { draft = false, depth = 2 } = options ?? {}

  const result = await payload.find({
    collection,
    overrideAccess: false,
    where: {
      [field]: { equals: value },
    },
    depth,
    limit: 1,
    draft,
  })

  return (result.docs[0] as Config['collections'][T]) ?? null
}
