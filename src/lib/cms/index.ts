/**
 * Server-only Payload CMS client.
 * Import this in server components and route handlers only — never in client components.
 */
import { getPayload } from 'payload'
import config from '../../../payload.config'
import { env } from '@/lib/env'

let payloadClient: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getCms() {
  if (!payloadClient) {
    payloadClient = await getPayload({ config })
  }
  return payloadClient
}

/**
 * DTO mapper: strip internal fields before exposing to public clients.
 * Never return raw CMS documents, internal IDs unnecessarily, access-control
 * fields, user records, unpublished media keys or audit data.
 */
export function sanitizePage(doc: unknown): Record<string, unknown> {
  const page = doc as Record<string, unknown>
  return {
    id: page.id,
    title: page.title,
    slug: page.slug,
    content: page.content,
    metaDescription: page.metaDescription,
    updatedAt: page.updatedAt,
  }
}
