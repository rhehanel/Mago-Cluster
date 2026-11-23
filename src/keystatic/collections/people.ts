import { collection, fields } from '@keystatic/core';
import { customBlocks } from '../components/customBlocks';

import { tagsField, markdocSizeField, createContentField } from '../components/glob/commonFields';

export const people = collection({
  label: 'People',
  slugField: 'slug',
  path: 'src/content/people/*',
  format: { contentField: 'content' },
  columns: ['name'],
  schema: {
    name: fields.text({ label: 'Name', validation: { isRequired: true } }),
    slug: fields.text({ 
      label: 'URL Slug (파일명/주소)',
      description: 'URL에 사용될 고유 영문 주소 (띄어쓰기 대신 하이픈(-) 사용. 예: yi-sang)'
    }),
    tags: tagsField,
    content: createContentField('people', 'src/assets/images/people', '../../assets/images/people/'),
    markdocSize: markdocSizeField,
    blocks: customBlocks,
  },
});