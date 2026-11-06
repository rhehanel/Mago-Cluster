import { collection, fields } from '@keystatic/core';
import { customBlocks } from '../components/customBlocks';

import { publishDateField, displayTimeField } from '../components/glob/TimeFields';
import { peopleField } from '../components/glob/PeopleSelectFields';

import { tagsField, markdocSizeField, createContentField } from '../components/glob/commonFields';

export const posts = collection({
  label: 'Posts',
  slugField: 'slug',
  path: 'src/content/posts/*',
  format: { contentField: 'content' },
  schema: {

    // 1. Title
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),
    secondTitle: fields.text({ label: 'Second Title (Optional)' }),
    slug: fields.text({ 
      label: 'URL Slug (파일명/주소)',
      description: 'URL에 사용될 고유 영문 주소 (띄어쓰기 대신 하이픈(-) 사용. 예: my-test-post)'
    }),

    // 2. 시간/날짜 관련
    publishDate: publishDateField, 
    displayTime: displayTimeField, 

    // 3. 인물/태그/기타
    people: peopleField,
    tags: tagsField,
    markdocSize: markdocSizeField,
    blocks: customBlocks,

    // 4. 본문
    content: createContentField('posts', 'src/assets/images/posts', '../../assets/images/posts/'),
  },
});