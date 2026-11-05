import { singleton, fields } from '@keystatic/core';

export const home = singleton({
  label: 'Home',
  path: 'content/singletons/home',
  schema: {
    description: fields.text({ label: 'Description' }),
  },
});