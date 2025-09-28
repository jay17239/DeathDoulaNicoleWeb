import blog from './blog'
import hero from './hero'
import about from './about'
import service from './service'
import faq from './faq'
import resourceCategory from './resourceCategory'
import contact from './contact'
import siteSettings from './siteSettings'
import testimonial from './testimonial'

export const schemaTypes = [
  // Site-wide settings
  siteSettings,
  
  // Page sections
  hero,
  about,
  service,
  faq,
  resourceCategory,
  contact,
  testimonial,
  
  // Content types
  blog
]
