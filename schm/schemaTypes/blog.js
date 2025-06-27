export default {
    name: 'blog',
    type: 'document',
    title: 'Blog Post',
    fields: [
      { name: 'title', type: 'string', title: 'Title' },
      { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
      { name: 'excerpt', type: 'text', title: 'Excerpt' },
      { name: 'content', type: 'array', title: 'Content', of: [{ type: 'block' }] },
      { name: 'publishedAt', type: 'datetime', title: 'Publish Date' },
      { name: 'author', type: 'string', title: 'Author' },
      { name: 'category', type: 'string', title: 'Category' },
      { name: 'featuredImage', type: 'image', title: 'Featured Image' }
    ],
  }
  