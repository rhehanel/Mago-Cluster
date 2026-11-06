import { fields } from '@keystatic/core';

export const customBlocks = fields.blocks(
  {
    // 1. Markdoc 본문 위치 표시자
    markdoc: {
      label: '📄 Markdoc Content Position',
      schema: fields.empty(),
    },
    // 2. 단일 비디오
    video: {
      label: '🎬 Video Player',
      schema: fields.object({
        link: fields.text({ label: 'Video URL or Embed Link' }),
      }),
    },
    // 3. 단일 이미지 (링크 포함)
    image: {
      label: '🖼️ Image With Link',
      schema: fields.object({
        image: fields.image({
          label: 'Image',
          directory: 'src/assets/images/blocks',
          publicPath: '../../assets/images/blocks/',
        }),
        link: fields.url({ label: 'Link URL (Optional)' }),
        altText: fields.text({ label: 'Alt Text (Optional)' }),
      }),
    },
    // 5. 다단 이미지 (2열, 3열 등)
    columnImages: {
      label: '🗂️ Column Images',
      schema: fields.object({
        images: fields.array(
          fields.object({
            image: fields.image({
              label: 'Image',
              directory: 'src/assets/images/blocks',
              publicPath: '../../assets/images/blocks/',
            }),
            caption: fields.text({ label: 'Caption (Optional)' }),
          }),
          { label: 'Images', itemLabel: props => props.fields.caption.value || 'Image' }
        ),
        layout: fields.select({
          label: 'Layout Type',
          options: [
            { label: '2 Columns', value: '2-col' },
            { label: '3 Columns', value: '3-col' },
          ],
          defaultValue: '2-col',
        }),
      }),
    },
    // 6. 가로 스크롤/배열 이미지
    rowImages: {
      label: '🎞️ Row Images',
      schema: fields.object({
        images: fields.array(
          fields.object({
            image: fields.image({
              label: 'Image',
              directory: 'src/assets/images/blocks',
              publicPath: '../../assets/images/blocks/',
            }),
            caption: fields.text({ label: 'Caption (Optional)' }),
          }),
          { label: 'Images', itemLabel: props => props.fields.caption.value || 'Image' }
        ),
      }),
    },
    // 7. 동적 리스트 (다른 컬렉션 글 불러오기)
    dynamicList: {
      label: '🔄 Dynamic List',
      schema: fields.object({
        collectionType: fields.select({
          label: 'Select Collection',
          options: [
            { label: 'Posts', value: 'posts' },
            { label: 'Works', value: 'works' },
            { label: 'Archives', value: 'archives' },
          ],
          defaultValue: 'posts',
        }),
        limit: fields.integer({ label: 'Item Limit', defaultValue: 3 }),
      }),
    },
    // 4. 수동 리스트 (직접 텍스트 입력)
    manualList: {
      label: '📝 Manual List',
      schema: fields.object({
        title: fields.text({ label: 'List Title' }),
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Item Title' }),
            description: fields.text({ label: 'Description', multiline: true }),
          }),
          { label: 'List Items', itemLabel: props => props.fields.title.value || 'Item' }
        ),
      }),
    },
    // 8. 텍스트 블록
    textBlock: {
      label: '텍스트 블록',
      schema: fields.object({
        title: fields.text({ label: 'Block Title (Optional)' }),
        content: fields.text({ label: 'Content', multiline: true }),
      }),
    },
  },
  {
    label: 'Dynamic Content Blocks',
  }
);