import { collection, fields } from '@keystatic/core';
import { customBlocks } from '../components/customBlocks';

import { publishDateField, displayTimeField } from '../components/glob/TimeFields';
import { peopleField } from '../components/glob/PeopleSelectFields';

import { tagsField, markdocSizeField, createContentField } from '../components/glob/commonFields';

export const scraps = collection({
  label: 'Scraps',
  slugField: 'slug',
  path: 'src/content/scraps/*',
  format: { contentField: 'content' },
  columns: ['title', 'publishDate'],
  schema: {
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),
    secondTitle: fields.text({ label: 'Second Title (Optional)' }),
    slug: fields.text({ 
      label: 'URL Slug (파일명/주소)',
      description: 'URL에 사용될 고유 영문 주소 (띄어쓰기 대신 하이픈(-) 사용. 예: my-test-post)'
    }),
    publishDate: publishDateField, 
    displayTime: displayTimeField, 
    people: peopleField,
    tags: tagsField,
    content: createContentField('scraps', 'src/assets/images/scraps', '../../assets/images/scraps/'),
    markdocSize: markdocSizeField,
    blocks: customBlocks,
  },
});