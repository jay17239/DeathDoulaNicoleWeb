// Import Sanity client from CDN
import { createClient } from 'https://cdn.skypack.dev/@sanity/client'

// Sanity client configuration
export const client = createClient({
  projectId: 'gnyojf5q', // Replace with your project ID
  dataset: 'production',
  useCdn: true, // Use CDN for faster read operations
  apiVersion: '2024-01-01', // Use current date
})

// Helper function to get Sanity image URL
export function urlFor(source) {
  return `https://cdn.sanity.io/images/gnyojf5q/production/${source.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
}

// Data fetching functions
export async function getHeroData() {
  const query = '*[_type == "hero"][0]'
  return await client.fetch(query)
}

export async function getAboutData() {
  const query = '*[_type == "about"][0]'
  return await client.fetch(query)
}

export async function getServices() {
  const query = '*[_type == "service"] | order(order asc)'
  return await client.fetch(query)
}

export async function getFAQs() {
  const query = '*[_type == "faq"] | order(order asc)'
  return await client.fetch(query)
}

export async function getResourceCategories() {
  const query = '*[_type == "resourceCategory"] | order(order asc)'
  return await client.fetch(query)
}

export async function getContactData() {
  const query = '*[_type == "contact"][0]'
  return await client.fetch(query)
}

export async function getSiteSettings() {
  const query = '*[_type == "siteSettings"][0]'
  return await client.fetch(query)
}

export async function getBlogPosts() {
  const query = '*[_type == "blog"] | order(publishedAt desc)'
  return await client.fetch(query)
}

// Helper function to convert Sanity block content to HTML
export function blocksToHtml(blocks) {
  if (!blocks) return ''
  
  return blocks.map(block => {
    if (block._type === 'block') {
      const text = block.children?.map(child => child.text).join('') || ''
      switch (block.style) {
        case 'h1': return `<h1>${text}</h1>`
        case 'h2': return `<h2>${text}</h2>`
        case 'h3': return `<h3>${text}</h3>`
        default: return `<p>${text}</p>`
      }
    }
    return ''
  }).join('')
} 