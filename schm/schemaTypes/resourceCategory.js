export default {
  name: 'resourceCategory',
  type: 'document',
  title: 'Resource Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Category Title',
      description: 'Title of the resource category (e.g., Planning Documents)'
    },
    {
      name: 'icon',
      type: 'string',
      title: 'Category Icon',
      description: 'Emoji or icon for the category (e.g., 📋, 📚, 🧘)'
    },
    {
      name: 'resources',
      type: 'array',
      title: 'Resources',
      description: 'List of resources in this category',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Resource Title'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Resource Description'
            },
            {
              name: 'link',
              type: 'url',
              title: 'Resource Link'
            }
          ]
        }
      ]
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Order in which this category appears'
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