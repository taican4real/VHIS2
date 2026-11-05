import type { CollectionConfig } from 'payload'
import { adminAccess } from '../access/site'

/**
 * Admissions and contact enquiries.
 *
 * SECURITY: No public read access. Enquiries are personal data and must never
 * be exposed via public API, sitemap, or any public relationship.
 * Only authenticated admin users can read/manage enquiries.
 */
export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'division', 'status', 'createdAt'],
    description: 'Protected enquiry submissions. Admin-only access.',
    hidden: ({ user }) => !Boolean(user?.role === 'admin'),
  },
  access: {
    // No public read — create-only for the public form
    read: adminAccess,
    create: () => true,
    update: adminAccess,
    delete: adminAccess,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Parent / guardian name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone number',
    },
    {
      name: 'studentName',
      type: 'text',
      label: 'Student name',
      admin: {
        description:
          'Only include after VHIS confirms this field is required and lawful basis is documented.',
      },
    },
    {
      name: 'division',
      type: 'select',
      options: [
        { label: 'Nursery', value: 'nursery' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      required: true,
      label: 'Division of interest',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
      label: 'Status',
    },
  ],
  timestamps: true,
}
