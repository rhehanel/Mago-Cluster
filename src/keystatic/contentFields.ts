import { createElement } from 'react';
import { fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export type ContentCollectionName =
  | 'archives'
  | 'people'
  | 'posts'
  | 'scraps'
  | 'works';

/**
 * Markdoc components are embedded inside the independent Markdoc editor.
 * They are intentionally separate from the page-level ordered blocks below.
 */
export function createMarkdocComponents(collectionName: ContentCollectionName) {
  const imageDirectory = `public/images/${collectionName}`;
  const publicPath = `/images/${collectionName}/`;

  return {
    CustomImage: block({
      label: 'Custom Image',
      schema: {
        file: fields.image({
          label: 'Image',
          directory: imageDirectory,
          publicPath,
        }),
        displayType: fields.select({
          label: 'Display Style',
          description: '이미지 출력 방식을 선택하세요.',
          options: [
            { label: 'Full Width (100%)', value: 'full' },
            { label: 'Inline / Natural Size', value: 'inline' },
          ],
          defaultValue: 'full',
        }),
        link: fields.text({ label: 'Link URL (Optional)' }),
        caption: fields.text({ label: 'Caption (Optional)' }),
      },
      ContentView: (props: any) => {
        const fileData = props.value?.file;
        let imageSrc = typeof fileData === 'string' ? fileData : '';

        if (fileData?.data instanceof Uint8Array) {
          imageSrc = URL.createObjectURL(new Blob([fileData.data]));
        } else if (fileData?.filename) {
          imageSrc = `${publicPath}${fileData.filename}`;
        }

        return createElement(
          'div',
          {
            style: {
              padding: '8px',
              border: '1px dashed #ccc',
              marginBottom: '8px',
            },
          },
          createElement(
            'div',
            null,
            `이미지 출력 형태: ${props.value?.displayType ?? 'full'}`,
          ),
          imageSrc
            ? createElement('img', {
                src: imageSrc,
                alt: '',
                style: { maxWidth: '100%', maxHeight: '150px' },
              })
            : null,
          props.value?.caption
            ? createElement('div', null, props.value.caption)
            : null,
        );
      },
    }),

    ImageGallery: block({
      label: 'Image Gallery (Flex)',
      schema: {
        images: fields.array(
          fields.object({
            file: fields.image({
              label: 'Image',
              directory: imageDirectory,
              publicPath,
            }),
            link: fields.text({ label: 'Link URL' }),
          }),
          {
            label: 'Images',
            itemLabel: (props: any) =>
              props.value?.file?.filename || 'Image Item',
          },
        ),
        align: fields.select({
          label: 'Gallery Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'center',
        }),
        flexAlign: fields.select({
          label: 'Flex Alignment',
          options: [
            { label: 'Center', value: 'center' },
            { label: 'Flex Start', value: 'flex-start' },
            { label: 'Flex End', value: 'flex-end' },
            { label: 'Space Between', value: 'space-between' },
          ],
          defaultValue: 'center',
        }),
        direction: fields.select({
          label: 'Flex Direction',
          options: [
            { label: 'Row', value: 'row' },
            { label: 'Column', value: 'column' },
          ],
          defaultValue: 'row',
        }),
        displayType: fields.select({
          label: 'Display Style',
          options: [
            { label: 'Block', value: 'block' },
            { label: 'Inline', value: 'inline' },
          ],
          defaultValue: 'block',
        }),
        widthType: fields.select({
          label: 'Width Type',
          options: [
            { label: 'Full Width (100%)', value: 'full' },
            { label: 'Custom Width', value: 'custom' },
          ],
          defaultValue: 'full',
        }),
        customWidth: fields.text({ label: 'Custom Width Value' }),
      },
      ContentView: (props: any) => {
        const itemCount = props.value?.images?.length ?? 0;

        return createElement(
          'div',
          { style: { padding: '8px', border: '1px dashed #888' } },
          createElement('div', null, `Flex 이미지 갤러리 (${itemCount}개 이미지)`),
          createElement('div', null, `정렬: ${props.value?.align ?? 'center'}`),
          createElement('div', null, `방향: ${props.value?.direction ?? 'row'}`),
        );
      },
    }),

    VideoPlayer: block({
      label: 'Video Player (YouTube / Drive / Vimeo)',
      schema: {
        url: fields.text({
          label: 'Video URL',
          description: 'YouTube, Google Drive 또는 Vimeo 주소를 입력하세요.',
          validation: { isRequired: true },
        }),
        displayType: fields.select({
          label: 'Display Style',
          options: [
            { label: 'Block', value: 'block' },
            { label: 'Inline', value: 'inline' },
          ],
          defaultValue: 'block',
        }),
        widthType: fields.select({
          label: 'Width Type',
          options: [
            { label: 'Full Width', value: 'full' },
            { label: 'Custom Width', value: 'custom' },
          ],
          defaultValue: 'full',
        }),
        customWidth: fields.text({ label: 'Custom Width Value' }),
      },
      ContentView: (props: any) =>
        createElement(
          'div',
          { style: { padding: '8px', border: '1px dashed #666' } },
          createElement('div', null, '비디오 플레이어'),
          createElement(
            'div',
            { style: { fontSize: '0.85rem', color: '#888' } },
            props.value?.url || 'URL을 입력하세요',
          ),
        ),
    }),
  };
}

type OrderedBlockOptions = {
  imageDirectory: string;
  imagePublicPath: string;
  /** Preserve the original Works video block shape. */
  videoShape?: 'conditional' | 'object';
  /** Preserve the original Works CSS-string image width field. */
  imageSizeMode?: 'integer' | 'text';
  /** Preserve the original Works MDX text block storage. */
  textMode?: 'plain' | 'mdx';
};

/**
 * Page-level ordered content canvas.
 * The Markdoc entry is still edited independently; `markdoc` is only its
 * placement marker inside this ordered list.
 */
export function createOrderedContentBlocks({
  imageDirectory,
  imagePublicPath,
  videoShape = 'conditional',
  imageSizeMode = 'integer',
  textMode = 'plain',
}: OrderedBlockOptions) {
  const imageField = (label = 'Upload Image') =>
    fields.image({
      label,
      directory: imageDirectory,
      publicPath: imagePublicPath,
      validation: { isRequired: true },
    });

  const imageItems = () =>
    fields.array(
      fields.object({
        image: imageField(),
        link: fields.text({ label: 'Image Link URL (Optional)' }),
        size: fields.text({
          label: 'Image Width',
          description: 'CSS 단위 포함 (예: 50%, 300px, fit-content)',
        }),
        border: fields.checkbox({ label: 'Hide border' }),
      }),
      { label: 'Images' },
    );

  const columnImagesSchema = () =>
    fields.object({
      width: fields.object({
        value: fields.text({
          label: 'Container Width',
          description: 'CSS 단위를 포함하세요 (예: 100%, 800px, fit-content).',
        }),
      }),
      alignment: fields.conditional(
        fields.checkbox({ label: 'Set Full Width' }),
        {
          true: fields.empty(),
          false: fields.select({
            label: 'Image Alignment',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ],
            defaultValue: 'left',
          }),
        },
      ),
      height: fields.conditional(
        fields.checkbox({ label: 'Use Vertical Scroll', defaultValue: false }),
        {
          true: fields.object({
            height: fields.text({
              label: 'Container Height',
              description: 'CSS 단위를 포함하세요 (예: 400px, 60vh).',
            }),
          }),
          false: fields.empty(),
        },
      ),
      images: imageItems(),
    });

  const rowImagesSchema = () =>
    fields.object({
      width: fields.object({
        value: fields.text({
          label: 'Container Width',
          description: 'CSS 단위를 포함하세요 (예: 100%, 800px, fit-content).',
        }),
      }),
      scrollX: fields.conditional(
        fields.checkbox({ label: 'Use Horizontal Scroll', defaultValue: false }),
        {
          true: fields.text({
            label: 'Container Height',
            description: 'CSS 단위를 포함하세요 (예: 300px, 60vh, auto).',
          }),
          false: fields.empty(),
        },
      ),
      alignment: fields.select({
        label: 'Vertical Alignment',
        options: [
          { label: 'Top', value: 'flex-start' },
          { label: 'Center', value: 'center' },
          { label: 'Bottom', value: 'flex-end' },
          { label: 'Stretch', value: 'stretch' },
        ],
        defaultValue: 'flex-start',
      }),
      images: imageItems(),
    });

  const videoProviderField = () =>
    fields.conditional(
      fields.select({
        label: 'Link from',
        options: [
          { label: 'Google Drive', value: 'google' },
          { label: 'YouTube', value: 'youtube' },
          { label: 'Vimeo', value: 'vimeo' },
        ],
        defaultValue: 'google',
      }),
      {
        google: fields.object({
          url: fields.text({
            label: 'Google Drive URL',
            validation: { length: { min: 1 } },
          }),
          size: fields.text({ label: 'Video Width (CSS value, optional)' }),
        }),
        youtube: fields.object({
          url: fields.text({
            label: 'YouTube video URL',
            validation: { length: { min: 1 } },
          }),
          size: fields.text({ label: 'Video Width (CSS value, optional)' }),
        }),
        vimeo: fields.object({
          url: fields.text({
            label: 'Vimeo URL',
            validation: { length: { min: 1 } },
          }),
          size: fields.text({ label: 'Video Width (CSS value, optional)' }),
        }),
      },
    );

  const videoSchema = videoShape === 'object'
    ? fields.object({
        link: videoProviderField(),
        size: fields.text({
          label: 'Video Width',
          description: 'CSS 단위를 포함하세요 (예: 50%, 600px, 40rem).',
        }),
      })
    : videoProviderField();

  const imageSizeField = imageSizeMode === 'text'
    ? fields.text({
        label: 'Image Width',
        description: 'CSS 단위를 포함하세요 (예: 50%, 300px, fit-content).',
      })
    : fields.integer({
        label: 'Image Width (%)',
        description: '10부터 100까지',
        validation: { min: 10, max: 100 },
      });

  const textBlockField = textMode === 'mdx'
    ? fields.mdx({ label: 'Text Block' })
    : fields.text({
        label: 'Text',
        description: '일반 텍스트를 입력합니다. 서식이 필요한 내용은 Markdoc Content를 사용하세요.',
        multiline: true,
      });

  return {
    markdoc: {
      label: 'Markdoc Content Position',
      itemLabel: () => 'Markdoc Content',
      schema: fields.empty(),
    },

    video: {
      label: 'Video Block',
      itemLabel: (props: any) => {
        const provider =
          props?.fields?.discriminant?.value ||
          props?.fields?.link?.fields?.discriminant?.value ||
          'Video';
        return `Video (${provider})`;
      },
      schema: videoSchema,
    },

    image: {
      label: 'Single Image',
      itemLabel: () => 'Single Image',
      schema: fields.object({
        image: imageField(),
        link: fields.text({ label: 'Image Link URL (Optional)' }),
        size: imageSizeField,
        border: fields.checkbox({ label: 'Hide border' }),
      }),
    },

    manualList: {
      label: 'Manual List',
      itemLabel: (props: any) =>
        props.fields?.title?.value || 'Manual List',
      schema: fields.object({
        title: fields.text({ label: 'List Title' }),
        list: fields.blocks(
          {
            text: {
              label: 'By Text',
              itemLabel: (props: any) =>
                props.fields?.name?.value || 'Text Item',
              schema: fields.object({
                name: fields.text({
                  label: 'Title',
                  validation: { length: { min: 1 }, isRequired: true },
                }),
                link: fields.text({ label: 'Link URL' }),
              }),
            },
            people: {
              label: 'From People List',
              itemLabel: (props: any) =>
                props.value ? `People: ${props.value}` : 'Select a person',
              schema: fields.relationship({
                label: 'Select list item from People list',
                collection: 'people',
              }),
            },
            // Legacy Works entries used the `artist` discriminant. Keep it
            // readable/editable, but point it to the current People collection.
            artist: {
              label: 'People (legacy Works entries)',
              itemLabel: (props: any) =>
                props.value ? `People: ${props.value}` : 'Select a person',
              schema: fields.relationship({
                label: 'Select list item from People list',
                collection: 'people',
              }),
            },
            works: {
              label: 'From Works List',
              itemLabel: (props: any) =>
                props.value ? `Work: ${props.value}` : 'Select a Work',
              schema: fields.relationship({
                label: 'Select list item from Works list',
                collection: 'works',
              }),
            },
            posts: {
              label: 'From Posts List',
              itemLabel: (props: any) =>
                props.value ? `Post: ${props.value}` : 'Select a Post',
              schema: fields.relationship({
                label: 'Select list item from Posts list',
                collection: 'posts',
              }),
            },
            archives: {
              label: 'From Archives List',
              itemLabel: (props: any) =>
                props.value ? `Archive: ${props.value}` : 'Select an Archive',
              schema: fields.relationship({
                label: 'Select list item from Archives list',
                collection: 'archives',
              }),
            },
            tag: {
              label: 'From Tags List',
              itemLabel: (props: any) =>
                props.value ? `Tag: ${props.value}` : 'Select a Tag',
              schema: fields.relationship({
                label: 'Select list item from Tags list',
                collection: 'tags',
              }),
            },
          },
          {
            label: 'List Items',
            description: '항목을 추가해 수동 목록을 만드세요.',
          },
        ),
      }),
    },

    dynamicList: {
      label: 'Dynamic Collection List',
      itemLabel: (props: any) =>
        props.fields?.title?.value || 'Dynamic Collection List',
      schema: fields.object({
        title: fields.text({ label: 'List Title' }),
        source: fields.select({
          label: 'Source Collection',
          options: [
            { label: 'Works', value: 'works' },
            { label: 'Posts', value: 'posts' },
          ],
          defaultValue: 'works',
        }),
        // Kept under the old key so existing Works dynamic-list filters survive.
        filterByArtist: fields.relationship({
          label: 'Filter by Person',
          collection: 'people',
        }),
        filterByTag: fields.relationship({
          label: 'Filter by Tag',
          collection: 'tags',
        }),
        limit: fields.integer({
          label: 'Item Limit',
          defaultValue: 10,
          validation: { min: 1 },
        }),
      }),
    },

    text: {
      label: 'Text Block',
      itemLabel: () => 'Text Block',
      schema: textBlockField,
    },

    columnImages: {
      label: 'Column Images',
      itemLabel: () => 'Column Images',
      schema: columnImagesSchema(),
    },

    rowImages: {
      label: 'Row Images',
      itemLabel: () => 'Row Images',
      schema: rowImagesSchema(),
    },
  };
}
