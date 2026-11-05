import type { Access } from 'payload'

/**
 * Allow public read access to published content.
 * Enquiries are never readable publicly — see Enquiries collection access.
 */
export const siteAccess: Access = ({ req: { user } }) => {
  // Public visitors can read published content
  if (!user) return true
  // Authenticated CMS users can read everything
  return true
}

/**
 * Only authenticated CMS users can create/update/delete published content.
 */
export const authenticatedAccess: Access = ({ req: { user } }) => {
  return Boolean(user)
}

/**
 * Only admin role users can manage enquiries (personal data).
 */
export const adminAccess: Access = ({ req: { user } }) => {
  return Boolean(user?.role === 'admin')
}
