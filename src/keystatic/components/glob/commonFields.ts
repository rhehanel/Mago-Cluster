import { fields } from '@keystatic/core';
import { createMarkdocComponents } from '../../contentFields';

export const tagsField = fields.array(
  fields.relationship({
    label: 'Category and tags',
    collection: 'tags',
    validation: { isRequired: true },
  }),
  {
    label: 'Tags',
    itemLabel: (props: any) => props.value ?? 'Select a category or tag',
  }
);

export const markdocSizeField = fields.conditional(
  fields.checkbox({ label: 'Custom Markdoc Size' }),
  {
    true: fields.object({
      width: fields.text({ label: 'Width (e.g., 50%, 500px)' }),
      height: fields.text({ label: 'Height (e.g., max-content, 500px)' }),
      margin: fields.checkbox({ label: 'Center the content' }),
    }),
    false: fields.empty(),
  }
);

export function createContentField(
  collectionName: 'posts' | 'works' | 'archives' | 'scraps' | 'people',
  imageDirectory: string,
  imagePublicPath: string
) {
  return fields.markdoc({
    label: 'Markdoc Content',
    options: {
      image: {
        directory: imageDirectory,
        publicPath: imagePublicPath,
      },
    },
    components: createMarkdocComponents(collectionName),
  });
}