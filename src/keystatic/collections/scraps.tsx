import { collection, fields } from '@keystatic/core';
import {
  createMarkdocComponents,
  createOrderedContentBlocks,
} from '../contentFields';

const imageDirectory = 'src/assets/images/scraps';
const imagePublicPath = '../../assets/images/scraps/';

export const scraps = collection({
  label: 'Scraps',
  slugField: 'title',
  path: 'src/content/scraps/*',
  format: { contentField: 'content' },
  columns: ['title'],
  schema: {
    title: fields.text({
      label: 'Title',
      validation: { isRequired: true },
    }),
    time: fields.date({
      label: 'Date',
      defaultValue: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 10),
    }),
    people: fields.blocks(
      {
        list: {
          label: 'From List',
          itemLabel: (props: any) =>
            props.value
              ? `People: ${props.value}`
              : 'Select people who are relevant to this post',
          schema: fields.relationship({
            label: 'Select People',
            description: 'Select people who are relevant to this post.',
            collection: 'people',
          }),
        },
        text: {
          label: 'By Text',
          itemLabel: (props: any) =>
            props.fields?.name?.value || 'By Text (No name entered)',
          schema: fields.object({
            name: fields.text({
              label: 'Name',
              validation: { length: { min: 1 }, isRequired: true },
            }),
            link: fields.text({
              label: 'Link (Optional)',
              description: "Link URL to the person's page",
            }),
          }),
        },
      },
      {
        label: 'People',
        description: 'Select people who are relevant to this post.',
      },
    ),

    tags: fields.array(
      fields.relationship({
        label: 'Category and tags',
        collection: 'tags',
        validation: { isRequired: true },
      }),
      {
        label: 'Tags',
        itemLabel: (props: any) =>
          props.value ?? 'Select a category or tag',
      },
    ),

    coverImage: fields.image({
      label: 'Cover Image',
      directory: 'src/assets/images/scraps',
      publicPath: '../../assets/images/scraps/',
    }),

    content: fields.markdoc({
      label: 'Markdoc Content',
      options: {
        image: {
          directory: imageDirectory,
          publicPath: imagePublicPath,
        },
      },
      components: createMarkdocComponents('scraps'),
    }),

    blocks: fields.blocks(
      createOrderedContentBlocks({
        imageDirectory,
        imagePublicPath,
      }),
      {
        label: 'Content Order',
        description:
          '이미지, 영상, 목록, Markdoc 본문이 화면에 출력될 순서를 정합니다. Markdoc Content Position은 한 번만 추가하세요.',
      },
    ),
  },
});