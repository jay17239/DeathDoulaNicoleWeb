import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Death Doula Nicole',

  projectId: 'gnyojf5q',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  cors: {
    allowCredentials: true,
    allowOrigins: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://deathdoulanicole.vercel.app',
      'https://jay17239.github.io'
    ]
  }
})
