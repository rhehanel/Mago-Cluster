import { collection, fields } from '@keystatic/core';

export const tags = collection({
  label: 'Tags / Categories',
  slugField: 'name',
  path: 'src/content/tags/*',
  columns: ['name', 'description'],
  schema: {
    name: fields.slug({ 
      name: { 
        label: 'Tag Name', 
        description: 'Please use English letters only (no spaces or special characters).' 
      } 
    }),
    description: fields.text({ label: 'Description' }),
  }
});