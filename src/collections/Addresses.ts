import type { CollectionConfig } from 'payload'

const Addresses: CollectionConfig = {
  slug: 'addresses',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Address',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Warehouse',
          value: 'warehouse',
        },
        {
          label: 'Centre',
          value: 'centre',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
    },
    {
      name: 'contactName',
      type: 'text',
    },
    {
      name: 'contactNotes',
      type: 'text',
    },
  ],
}

export default Addresses
