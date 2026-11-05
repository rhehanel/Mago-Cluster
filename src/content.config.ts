// @ts-ignore
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const people = defineCollection({
  loader: glob({ 
    pattern: '**/*.{md,mdoc,yaml,json}', 
    base: './src/content/people' 
  }),
  schema: z.object({
    name: z.string(),
    coverImage: z.string().optional(),
  })
});

const posts = defineCollection({
  loader: glob({ 
    pattern: ['**/*.{md,mdoc,yaml,json}', '!**/blocks/**'], 
    base: './src/content/posts' 
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    originaltitle: z.string().optional(),
    coverImage: image().optional(),
    time: z.any().optional(),
    tags: z.array(z.any()).optional(),
    people: z.any().optional(),
    markdocSize: z.any().optional(),
    blocks: z.any().optional(),
    manualList: z.any().optional(),
    columnImages: z.any().optional(),
    rowImages: z.any().optional(),
  })
});

const works = defineCollection({
  loader: glob({ 
    pattern: ['**/*.{md,mdoc,yaml,json}', '!**/blocks/**'], 
    base: './src/content/works' 
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    originaltitle: z.string().optional(),
    coverImage: image().optional(),
    
    time: z.any().optional(),
    tags: z.array(z.any()).optional(),
    people: z.any().optional(),
    blocks: z.any().optional(),
    markdocSize: z.any().optional(),
    manualList: z.any().optional(),
    columnImages: z.any().optional(),
    rowImages: z.any().optional(),
  })
});

const archives = defineCollection({
  loader: glob({ 
    pattern: ['**/*.{md,mdoc,yaml,json}', '!**/blocks/**'], 
    base: './src/content/archives' 
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    originaltitle: z.string().optional(),
    coverImage: image().optional(),
    
    time: z.any().optional(),
    tags: z.array(z.any()).optional(),
    people: z.any().optional(),
    blocks: z.any().optional(),
    markdocSize: z.any().optional(),
    manualList: z.any().optional(),
    columnImages: z.any().optional(),
    rowImages: z.any().optional(),
  })
});

const scraps = defineCollection({
  loader: glob({ 
    pattern: ['**/*.{md,mdoc,yaml,json}', '!**/blocks/**'], 
    base: './src/content/scraps' 
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string().optional(),
    tags: z.array(z.any()).optional(),
    people: z.any().optional(),
    coverImage: image().optional(),
    time: z.any().optional(),
    blocks: z.any().optional(),
    markdocSize: z.any().optional(),
    manualList: z.any().optional(),
    columnImages: z.any().optional(),
    rowImages: z.any().optional(),
  })
});

const tags = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc,yaml,json}', base: './src/content/tags' }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  })
});

export const collections = {
  archives,
  people,
  posts,
  works,
  scraps,
  tags,
};