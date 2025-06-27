export default {
  name: 'faq',
  type: 'document',
  title: 'FAQ Item',
  fields: [
    {
      name: 'question',
      type: 'string',
      title: 'Question',
      description: 'The frequently asked question'
    },
    {
      name: 'answer',
      type: 'array',
      title: 'Answer',
      description: 'The answer to the question',
      of: [{ type: 'block' }]
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Order in which this FAQ appears (1, 2, 3, etc.)'
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Category for grouping FAQs',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Process', value: 'process' }
        ]
      }
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