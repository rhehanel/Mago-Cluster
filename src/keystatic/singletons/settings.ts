import { singleton, fields } from '@keystatic/core';

export const settings = singleton({
  label: 'Settings',
  path: 'content/singletons/settings',
  schema: {
    title: fields.text({ label: 'Website Title' }),
    description: fields.text({ label: 'Website Description' }),
    favicon: fields.image({
      label: 'Favicon',
      directory: 'src/assets/favicon',
      publicPath: '../../src/assets/favicon',
    }),
    navigation: fields.array(
      fields.object({
        label: fields.text({ label: 'Menu Name (e.g., About)' }),
        href: fields.text({ label: 'Link URL (e.g., /about)' }),
      }),
      {
        label: 'Menu Items',
        itemLabel: (props) => props.fields.label.value || 'New Menu',
      }
    ),
  },
});