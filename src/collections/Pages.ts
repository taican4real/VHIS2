import type { CollectionConfig } from 'payload'
import { siteAccess, authenticatedAccess } from '../access/site'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    description: 'Public website pages. Editors manage content; layout is code-defined.',
  },
  access: {
    read: siteAccess,
    create: authenticatedAccess,
    update: authenticatedAccess,
    delete: authenticatedAccess,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
      unique: true,
      admin: {
        description: 'URL-friendly identifier, e.g. about-us',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Page content',
      required: true,
    },
    {
      name: 'metaDescription',
      type: 'text',
      label: 'Meta description',
      admin: {
        description: 'SEO meta description for search results',
      },
    },
  ],
  timestamps: true,
}
