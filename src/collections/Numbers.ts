import { CollectionConfig } from 'payload'

const Numbers: CollectionConfig = {
  slug: 'numbers',
  fields: [
    {
      name: 'numberOne',
      type: 'number',
      required: true,
    },
    {
      name: 'numberTwo',
      type: 'number',
      required: true,
    },
    {
      name: 'numberThree',
      type: 'number',
      required: true,
    },
    // Listeners can be placed anywhere you like, but I recommend either at the start or the end of the fields list for your sanity
    {
      name: 'numberAdderListener',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/NumberAdderListenerField/NumberAdderListenerField',
        },
      },
    },
    {
      name: 'numberFour',
      type: 'number',
    },
  ],
}

export default Numbers
