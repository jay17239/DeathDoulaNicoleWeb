export default {
  name: 'hero',
  type: 'document',
  title: 'Hero Section',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Main Title',
      description: 'The main headline in the hero section'
    },
    {
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle',
      description: 'The descriptive text below the main title'
    },
    {
      name: 'primaryButtonText',
      type: 'string',
      title: 'Primary Button Text',
      description: 'Text for the main call-to-action button'
    },
    {
      name: 'primaryButtonLink',
      type: 'string',
      title: 'Primary Button Link',
      description: 'Link for the primary button (e.g., #contact)'
    },
    {
      name: 'secondaryButtonText',
      type: 'string',
      title: 'Secondary Button Text',
      description: 'Text for the secondary button'
    },
    {
      name: 'secondaryButtonLink',
      type: 'string',
      title: 'Secondary Button Link',
      description: 'Link for the secondary button (e.g., #about)'
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      description: 'The main image displayed in the hero section'
    }
  ]
} 