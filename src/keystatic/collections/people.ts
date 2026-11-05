import { collection, fields } from '@keystatic/core';

export const people = collection({
  label: 'People',
  slugField: 'name', // slug 대신 name을 기준점으로 변경
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