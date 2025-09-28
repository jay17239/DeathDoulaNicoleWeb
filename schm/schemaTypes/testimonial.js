export default {
  name: 'testimonial',
  type: 'document',
  title: 'Testimonial',
  fields: [
    {
      name: 'quote',
      type: 'text',
      title: 'Quote',
      description: 'The testimonial text shown on the website',
      rows: 4
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      description: 'Person or family name (e.g., The Johnson Family)'
    },
    {
      name: 'meta',
      type: 'string',
      title: 'Meta',
      description: 'Optional context (relation, city, etc.)'
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Order in which this appears (1, 2, 3, etc.)'
    }
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote'
    }
  }
}



