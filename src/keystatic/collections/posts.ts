import { collection, fields } from '@keystatic/core';
import {
  createMarkdocComponents,
  createOrderedContentBlocks,
} from '../contentFields';

const imageDirectory = 'src/assets/images/posts';
const imagePublicPath = '../../assets/images/posts/';

export const posts = collection({
  label: 'Posts',
  slugField: 'title',
  path: 'src/content/posts/*',
  format: { contentField: 'content' },

  schema: {
    title: fields.text({
      label: 'Title',
      validation: { isRequired: true },
    }),

    // 독립적인 Markdoc 편집기: Markdoc 내부 컴포넌트 사용 가능
    content: fields.markdoc({
      label: 'Markdoc Content',
      options: {
        image: {
          directory: imageDirectory,
          publicPath: imagePublicPath,
        },
      },
      components: createMarkdocComponents('posts'),
    }),

    time: fields.conditional(
      fields.select({
        label: 'Time Format',
        options: [
          { label: 'Date', value: 'date' },
          { label: 'Year', value: 'year' },
          { label: 'Time Period', value: 'time' },
        ],
        defaultValue: 'date',
      }),
      {
        date: fields.object({
          value: fields.date({
            label: 'Date',
            defaultValue: new Date(
              Date.now() - new Date().getTimezoneOffset() * 60000,
            )
              .toISOString()
              .slice(0, 10),
          }),
          time: fields.text({ label: 'Time' }),
        }),

        year: fields.object({
          value: fields.text({ label: 'Year' }),
        }),

        time: fields.conditional(
          fields.checkbox({ label: 'Custom Date String' }),
          {
            true: fields.object({
              time: fields.text({ label: 'Time' }),
              dates: fields.text({
                label: 'Dates String (e.g. 2024.10 - 2025.01)',
              }),
            }),
            false: fields.object({
              time: fields.text({ label: 'Time' }),
              date: fields.date({
                label: 'Start Date',
                defaultValue: new Date(
                  Date.now() - new Date().getTimezoneOffset() * 60000,
                )
                  .toISOString()
                  .slice(0, 10),
              }),
              enddate: fields.date({ label: 'End Date' }),
            }),
          },
        ),
      },
    ),

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
      directory: 'src/assets/images/posts',
      publicPath: '../../assets/images/posts/',
    }),

    // 화면 출력 순서를 정하는 별도의 캔버스
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

    markdocSize: fields.conditional(
      fields.checkbox({ label: 'Custom Markdoc Size' }),
      {
        true: fields.object({
          width: fields.text({ label: 'Width (e.g., 50%, 500px)' }),
          height: fields.text({ label: 'Height (e.g., max-content, 500px)' }),
          margin: fields.checkbox({ label: 'Center the content' }),
        }),
        false: fields.empty(),
      },
    ),
  },
});