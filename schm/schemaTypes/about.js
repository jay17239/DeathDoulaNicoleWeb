export default {
  name: 'about',
  type: 'document',
  title: 'About Section',
  fields: [
    {
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      description: 'The main title for the about section'
    },
    {
      name: 'introText',
      type: 'text',
      title: 'Introduction Text',
      description: 'The highlighted introduction paragraph'
    },
    {
      name: 'content',
      type: 'array',
      title: 'About Content',
      description: 'The main content paragraphs',
      of: [{ type: 'block' }]
    },
    {
      name: 'headshot',
      type: 'image',
      title: 'Headshot Photo',
      description: 'Professional headshot photo'
    },
    {
      name: 'headshotAlt',
      type: 'string',
      title: 'Headshot Alt Text',
      description: 'Alternative text for the headshot image'
    }
  ]
} 