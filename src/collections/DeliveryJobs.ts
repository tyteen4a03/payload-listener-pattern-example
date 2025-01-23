import { CollectionConfig } from 'payload'

const DeliveryJobs: CollectionConfig = {
  slug: 'deliveryJobs',
  fields: [
    {
      name: 'jobStopsListener',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/JobStopsListenerField/JobStopsListenerField',
        },
      },
    },
    {
      name: 'jobStopsLastStopListener',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/JobStopsLastStopListenerField/JobStopsLastStopListenerField',
        },
      },
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'test',
      type: 'group',
      fields: [
        {
          name: 'testField',
          type: 'text',
        },
      ],
    },
    {
      name: 'stops',
      type: 'array',
      fields: [
        {
          name: 'address',
          type: 'relationship',
          relationTo: 'addresses',
          required: true,
        },
        {
          name: 'contactNotes',
          type: 'text',
          label: 'Contact Notes',
          admin: {
            description: 'Leave blank if same as default',
          },
        },
      ],
    },
    {
      name: 'lastStopContactName',
      type: 'text',
    },
  ],
}

export default DeliveryJobs
