export default {
  name: 'service',
  type: 'document',
  title: 'Service',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Service Title',
      description: 'The name of the service'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Service Description',
      description: 'Detailed description of what this service includes'
    },
    {
      name: 'icon',
      type: 'string',
      title: 'Service Icon',
      description: 'Emoji or icon representing this service (e.g., 🕊️, 🤝, 🌙)'
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Order in which this service appears (1, 2, 3, etc.)'
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Featured Service',
      description: 'Whether this service should be highlighted'
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
} 