export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'siteName',
      type: 'string',
      title: 'Site Name',
      description: 'Name of the website'
    },
    {
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
      description: 'Short tagline or subtitle for the site'
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Site Logo',
      description: 'Main logo for the website'
    },
    {
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      description: 'Small icon for browser tabs'
    },
    {
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'Default title for search engines'
    },
    {
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Description',
      description: 'Default description for search engines'
    },
    {
      name: 'footerText',
      type: 'text',
      title: 'Footer Text',
      description: 'Text displayed in the website footer'
    },
    {
      name: 'mainNavigation',
      type: 'array',
      title: 'Main Navigation',
      description: 'Navigation menu items',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Menu Item Title'
            },
            {
              name: 'link',
              type: 'string',
              title: 'Link',
              description: 'URL or anchor link (e.g., #about, #services)'
            },
            {
              name: 'order',
              type: 'number',
              title: 'Order'
            }
          ]
        }
      ]
    }
  ],
} 