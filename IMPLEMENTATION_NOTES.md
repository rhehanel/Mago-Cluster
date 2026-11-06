# Mago Cluster: shared slug + ordered content integration

## Scope

The ordered-content editor and independent Markdoc editor are enabled for:

- `archives`
- `people`
- `posts`
- `scraps`
- `works`

`tags` remains a taxonomy-only collection. Its detail route still uses the common URL slug helper so tag links match the same URL normalization policy, but its Keystatic schema and page do not receive the ordered block canvas or Markdoc custom-component editor.

## Shared URL slug policy

Implementation: `src/lib/slug.ts`

| Collection | Slug source |
| --- | --- |
| `archives` | `data.slug`, falling back to `data.title` |
| `people` | `data.name` |
| `posts` | `data.title` |
| `scraps` | `data.slug`, falling back to `data.title` |
| `works` | `data.title` |
| `tags` | `data.name` |

`toUrlSlug()` trims, Unicode-normalizes, lowercases, converts whitespace/underscores to hyphens, removes other punctuation, and collapses repeated hyphens. Korean and other Unicode letters/numbers are retained.

`createCollectionStaticPaths()` applies the same logic to every dynamic detail route and throws at build time if two entries resolve to the same URL. `contentHref()` is used for internal links, relationship links, Manual List, Dynamic List, the home page and sitemap.

Keystatic's `slugField`, entry IDs, filenames, and relationship values are not rewritten by this helper. Only the public URL is normalized.

## Ordered content model

Every enabled collection retains its independent `content` Markdoc editor and has a separate `blocks` array. Add a `Markdoc Content Position` item to the `Content Order` array wherever the Markdoc field should appear. The renderer outputs Markdoc at the first marker. If an older entry has no marker, Markdoc is displayed first to avoid hiding existing content. Additional Markdoc markers are ignored to prevent duplicating the same document.

Shared ordered block types:

- Markdoc content position
- Video
- Single Image
- Manual List
- Dynamic Collection List
- Text Block
- Column Images
- Row Images

The independent Markdoc editor retains its `CustomImage`, `ImageGallery`, and `VideoPlayer` components. Their uploaded image paths are scoped by collection.

## Compatibility preserved for existing Works blocks

`works` keeps its previous stored field shapes for:

- Video blocks (`{ link: conditionalProvider, size }`)
- Image width as a CSS string
- Text blocks using `fields.mdx`
- Legacy `artist` Manual List entries (now resolved against the `people` collection)
- The old `filterByArtist` field key (its Keystatic label now says “Filter by Person” and it relates to `people`)

The page-level renderers also accept the newer shared Video block shape.

## Files changed

- `keystatic.config.ts`
- `package.json`, `package-lock.json`
- `src/content.config.ts`
- `src/lib/slug.ts` (new)
- `src/keystatic/contentFields.ts` (new; replaces old `.tsx` module)
- `src/keystatic/collections/archives.ts`
- `src/keystatic/collections/people.ts`
- `src/keystatic/collections/posts.ts`
- `src/keystatic/collections/scraps.ts` (renamed from `.tsx`)
- `src/keystatic/collections/works.ts`
- `src/components/OrderedContent.astro`
- `src/components/TextBlock.astro` (new)
- `src/components/VideoPlayer.astro`
- `src/components/ManualList.astro`
- `src/components/DynamicList.astro` (new)
- `src/components/ImageWithLink.astro`
- `src/components/RowImages.astro`
- `src/components/markdoc/CustomImage.astro`
- `src/components/markdoc/ImageGallery.astro`
- `src/pages/index.astro`
- `src/pages/archives/[slug].astro`
- `src/pages/people/[slug].astro`
- `src/pages/posts/[slug].astro`
- `src/pages/scraps/[slug].astro`
- `src/pages/works/[slug].astro`
- `src/pages/tags/[slug].astro` (slug/link normalization only; no ordered editor)
- `src/pages/sitemap.astro` (corrected stale `artists` references to `people`)

Removed `src/keystatic/contentFields.tsx`; all collections now import `src/keystatic/contentFields.ts`.

## Validation

Passed:

- `tsc --noEmit`
- Babel syntax parsing for all TypeScript/TSX/MJS files and all Astro frontmatter
- Shared slug unit checks, including `Hanel Lee -> hanel-lee`, Korean characters, whitespace/punctuation, relationship matching and static-path generation
- Runtime creation of shared Keystatic schemas for all five enabled collections
- Stale-reference scan for `artists`, `fields.textarea`, and the old `contentFields.tsx` import

Astro production build could not be run in this environment because the uploaded `node_modules` contained a macOS Rolldown binary, while this validation environment is Linux (`@rolldown/binding-linux-x64-gnu` is missing). The full project archive intentionally excludes `node_modules`; reinstall dependencies on the target Mac before building.
