import { config } from '@keystatic/core';

// 1. 분리된 Collections 불러오기
import { archives } from './src/keystatic/collections/archives';
import { people } from './src/keystatic/collections/people';
import { posts } from './src/keystatic/collections/posts';
import { scraps } from './src/keystatic/collections/scraps.tsx';
import { works } from './src/keystatic/collections/works';
import { tags } from './src/keystatic/collections/tags';

// 2. 분리된 Singletons 불러오기
import { home } from './src/keystatic/singletons/home';
import { settings } from './src/keystatic/singletons/settings';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    navigation: {
      'The living': ['archives', 'scraps' ],
      'The dead': ['posts', 'works'],
      'Sort': ['people', 'tags'],
      'Settings': ['home', 'settings'],
    }
  },
  collections: {
    archives,
    people,
    works,
    posts,
    scraps,
    tags,
  },
  singletons: {
    home,
    settings,
  },
});