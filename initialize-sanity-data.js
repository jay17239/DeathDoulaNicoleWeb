// Sanity Data Initialization Script
// Run this once to populate Sanity with current website content

import { createClient } from '@sanity/client';

// Initialize Sanity client with CLI authentication
const client = createClient({
  projectId: 'gnyojf5q',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
});

// Initialize hero section data
const heroData = {
  _type: 'hero',
  title: 'Compassionate Support Through Life\'s Final Journey',
  subtitle: 'Professional death doula services offering gentle guidance, comfort, and peace during end-of-life transitions in Northeast Ohio.',
  primaryButtonText: 'Schedule a Consultation',
  primaryButtonLink: '#contact',
  secondaryButtonText: 'Learn More', 
  secondaryButtonLink: '#about'
};

// Initialize about section data
const aboutData = {
  _type: 'about',
  sectionTitle: 'About Nicole',
  introText: 'With deep compassion and gentle wisdom, I support individuals and families through one of life\'s most profound transitions.',
  content: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'As a certified death doula, I believe that every person deserves to approach their final journey with dignity, peace, and surrounded by love. My role is to provide non-medical support, guidance, and presence during this sacred time.'
        }
      ]
    },
    {
      _type: 'block', 
      children: [
        {
          _type: 'span',
          text: 'My approach combines professional training with heartfelt empathy, creating a safe space where fears can be acknowledged, wishes can be honored, and families can find comfort in knowing their loved one is truly supported.'
        }
      ]
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span', 
          text: 'I serve families throughout Northeast Ohio, with a focus on Summit and Stark county, offering both in-person and virtual support as needed. Whether you\'re planning ahead, facing an immediate need, or supporting a loved one, I\'m here to walk this path with you.'
        }
      ]
    }
  ],
  headshotAlt: 'Headshot of Nicole'
};

// Initialize services data
const servicesData = [
  {
    _type: 'service',
    title: 'End-of-Life Planning',
    description: 'Thoughtful guidance in creating meaningful plans for your final journey, including legacy projects and personal wishes.',
    icon: '🕊️',
    order: 1,
    featured: true
  },
  {
    _type: 'service',
    title: 'Family Support',
    description: 'Emotional and practical support for families navigating the complexities of caring for a dying loved one.',
    icon: '🤝',
    order: 2,
    featured: false
  },
  {
    _type: 'service',
    title: 'Vigil Assistance',
    description: 'Peaceful presence and support during the active dying process, ensuring comfort and dignity for both patient and family.',
    icon: '🌙',
    order: 3,
    featured: false
  },
  {
    _type: 'service',
    title: 'Grief Companionship',
    description: 'Gentle support for those beginning their grief journey, offering presence and understanding during this difficult time.',
    icon: '💜',
    order: 4,
    featured: false
  },
  {
    _type: 'service',
    title: 'Legacy Projects',
    description: 'Creating meaningful ways to preserve memories, stories, and wisdom for future generations.',
    icon: '📖',
    order: 5,
    featured: false
  },
  {
    _type: 'service',
    title: 'Ritual & Ceremony',
    description: 'Designing personalized rituals and ceremonies that honor the transition and bring comfort to all involved.',
    icon: '🌸',
    order: 6,
    featured: false
  }
];

// Initialize FAQ data
const faqData = [
  {
    _type: 'faq',
    question: 'What is a death doula?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'A death doula is a trained professional who provides non-medical support, guidance, and comfort to individuals and families during the end-of-life process. We focus on emotional, spiritual, and practical support to ensure dignity and peace during this sacred transition.'
          }
        ]
      }
    ],
    order: 1,
    category: 'general'
  },
  {
    _type: 'faq',
    question: 'How do death doula services differ from hospice care?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'While hospice provides medical care and pain management, death doulas offer non-medical support. We focus on emotional comfort, spiritual guidance, family support, and helping create meaningful experiences during the dying process.'
          }
        ]
      }
    ],
    order: 2,
    category: 'services'
  },
  {
    _type: 'faq',
    question: 'When should I contact a death doula?',
    answer: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'You can reach out at any stage - whether you\'re planning ahead, facing a terminal diagnosis, or already in hospice care. Early engagement allows for more comprehensive planning, but support is valuable at any point in the journey.'
          }
        ]
      }
    ],
    order: 3,
    category: 'process'
  }
];

// Initialize contact data
const contactData = {
  _type: 'contact',
  sectionTitle: 'Let\'s Connect',
  sectionSubtitle: 'I\'m here to support you with compassion and understanding',
  consultationTitle: 'Schedule Your Consultation',
  consultationDescription: 'The first step is always a gentle conversation. Schedule a complimentary consultation to discuss your needs and how I can support you.',
  email: 'nicole@example.com',
  phone: '(123) 456-7890',
  serviceArea: 'Northeast Ohio'
};

// Initialize site settings
const siteSettings = {
  _type: 'siteSettings',
  siteName: 'Death Doula Nicole',
  tagline: 'Compassionate End-of-Life Support',
  seoTitle: 'Death Doula Nicole - Compassionate End-of-Life Support | Northeast Ohio',
  seoDescription: 'Professional death doula services in Northeast Ohio. Compassionate support for individuals and families during end-of-life transitions.',
  footerText: 'Serving Northeast Ohio with compassion and grace.'
};

// Function to create documents
async function initializeData() {
  try {
    console.log('Initializing Sanity with current website content...');
    
    // Create hero section
    const hero = await client.create(heroData);
    console.log('Hero section created:', hero._id);
    
    // Create about section
    const about = await client.create(aboutData);
    console.log('About section created:', about._id);
    
    // Create services
    for (const service of servicesData) {
      const createdService = await client.create(service);
      console.log('Service created:', createdService.title);
    }
    
    // Create FAQs
    for (const faq of faqData) {
      const createdFaq = await client.create(faq);
      console.log('FAQ created:', createdFaq.question);
    }
    
    // Create contact info
    const contact = await client.create(contactData);
    console.log('Contact section created:', contact._id);
    
    // Create site settings
    const settings = await client.create(siteSettings);
    console.log('Site settings created:', settings._id);
    
    console.log('✅ Sanity data initialization complete!');
    console.log('You can now edit content in your Sanity studio and see changes on your website.');
    
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Run initialization
initializeData(); 