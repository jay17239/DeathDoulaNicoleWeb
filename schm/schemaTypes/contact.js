export default {
  name: 'contact',
  type: 'document',
  title: 'Contact Information',
  fields: [
    {
      name: 'sectionTitle',
      type: 'string',
      title: 'Section Title',
      description: 'Main title for the contact section'
    },
    {
      name: 'sectionSubtitle',
      type: 'string',
      title: 'Section Subtitle',
      description: 'Subtitle text under the main title'
    },
    {
      name: 'consultationTitle',
      type: 'string',
      title: 'Consultation Section Title',
      description: 'Title for the consultation booking area'
    },
    {
      name: 'consultationDescription',
      type: 'text',
      title: 'Consultation Description',
      description: 'Description text for the consultation booking'
    },
    {
      name: 'calendlyUrl',
      type: 'url',
      title: 'Calendly URL',
      description: 'Link to your Calendly scheduling page'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email Address',
      description: 'Contact email address'
    },
    {
      name: 'phone',
      type: 'string',
      title: 'Phone Number',
      description: 'Contact phone number'
    },
    {
      name: 'serviceArea',
      type: 'string',
      title: 'Service Area',
      description: 'Geographic area served (e.g., Northeast Ohio)'
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Social Media Links',
      description: 'Social media profiles',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' }
                ]
              }
            },
            {
              name: 'url',
              type: 'url',
              title: 'Profile URL'
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              description: 'Emoji or icon for this platform'
            }
          ]
        }
      ]
    }
  ]
} 