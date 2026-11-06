import { collection, fields } from '@keystatic/core';

export const people = collection({
  label: 'People',
  slugField: 'name',
  path: 'src/content/people/*',
  format: { contentField: 'content' },
  columns: ['name'],
  schema: {
    name: fields.text({ label: 'Name', validation: { isRequired: true } }),
    // slug 필드는 삭제합니다.
    coverImage: fields.image({
      label: 'Cover Image',
      directory: 'src/assets/images/people',
      publicPath: '../../assets/images/people/',
    }),
    content: fields.markdoc({
      label: 'Content',
      options: {
        image: {
          directory: 'src/assets/images/people',
          publicPath: '../../assets/images/people/',
        },
      },
    }),
  }
});