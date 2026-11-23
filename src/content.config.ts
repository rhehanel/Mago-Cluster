// src/content/content.config.ts
// @ts-ignore - Astro provides this virtual module at build time.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 💡 4개 컬렉션(posts, works, archives, scraps)이 공유하는 공통 스키마
const baseSchema = ({ image }: any) => z.object({
  title: z.string(),
  secondTitle: z.string().optional(),
  publishDate: z.any(), 
  displayTime: z.any().optional(),
  coverImage: image().optional(),
  tags: z.array(z.any()).optional(),
  people: z.any().optional(),
  markdocSize: z.any().optional(),
  contentDivision: z.boolean().optional(),
  blocks: z.any().optional(),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    coverImage: z.string().optional(),
    tags: z.array(z.any()).optional(),
    markdocSize: z.any().optional(),
    blocks: z.any().optional(),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/posts' }),
  schema: baseSchema,
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/works' }),
  schema: baseSchema,
});

const archives = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/archives' }),
  schema: baseSchema,
});

const scraps = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/scraps' }),
  schema: baseSchema,
});

const tags = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc,yaml,json}', base: './src/content/tags' }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  archives,
  people,
  posts,
  works,
  scraps,
  tags,
};