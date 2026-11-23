// customBlocks.tsx

import { fields } from '@keystatic/core';

const gridSpanField = fields.select({
  label: 'Block Width (Grid Span)',
  options: [
    { label: 'Full Width (12/12)', value: '12' },
    { label: '11 Width (11/12)', value: '11' },
    { label: '10 Width (10/12)', value: '10' },
    { label: '9 Width (9/12)', value: '9' },
    { label: '8 Width (8/12)', value: '8' },
    { label: '7 Width (7/12)', value: '7' },
    { label: '1/2 Width (6/12)', value: '6' },
    { label: '5 Width (5/12)', value: '5' },
    { label: '1/3 Width (4/12)', value: '4' },
    { label: '1/4 Width (3/12)', value: '3' },
    { label: '1/6 Width (2/12)', value: '2' },
    { label: '1 Width (1/12)', value: '1' },
  ],
  defaultValue: '12',
});

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
        gridSpan: gridSpanField,
        link: fields.text({ 
          label: 'Video URL',
          description: 'YouTube, Vimeo, 또는 Google Drive 공유 링크를 입력하세요.'
        }),
      }),
    },
    // 3. 단일 이미지 (링크 포함)
    image: {
      label: '🖼️ Image With Link',
      schema: fields.object({
        gridSpan: gridSpanField,
        image: fields.image({
          label: 'Image',
          directory: 'src/assets/images/blocks',
          publicPath: '../../assets/images/blocks/',
        }),
        link: fields.url({ label: 'Link URL (Optional)' }),
        alt: fields.text({ label: 'Alt Text (Optional)' }),
      }),
    },
    // 5. 다단 이미지 (2열, 3열 등)
    columnImages: {
      label: '🗂️ Column Images',
      schema: fields.object({
        gridSpan: gridSpanField,
        
        // 💡 조건부 필드: 스크롤이 체크된 경우에만 높이 입력창이 나타납니다.
        scrollable: fields.conditional(
          fields.checkbox({
            label: 'Enable Vertical Scroll & Fixed Height',
            description: '체크하면 컨테이너 높이를 지정하고 수직 스크롤을 활성화합니다.',
          }),
          {
            false: fields.empty(),
            true: fields.object({
              containerHeight: fields.text({
                label: 'Container Height',
                description: '예: 400px, 50vh',
              }),
            }),
          }
        ),
        images: fields.array(
          fields.object({
            image: fields.image({
              label: 'Image',
              directory: 'src/assets/images/blocks',
              publicPath: '../../assets/images/blocks/',
            }),
            alt: fields.text({ label: 'Alt & Caption' }),
            caption: fields.checkbox({
              label: "Show alt text as a Caption"
            }),
            link: fields.url({ label: 'Link URL (Optional)' }),
          }),
          { label: 'Images', itemLabel: props => props.fields.alt.value || 'Image' }
        ),
      }),
    },
    // 6. 가로 스크롤/배열 이미지
    rowImages: {
      label: '🎞️ Row Images',
      schema: fields.object({
        gridSpan: gridSpanField,
        // 💡 3가지 Row Layout Mode 분기
        wrapMode: fields.select({
          label: 'Row Layout Mode',
          options: [
            { label: '1. Wrap (줄바꿈 허용)', value: 'wrap' },
            { label: '2. No-wrap + 컨테이너 폭에 맞추기 (균등 분할)', value: 'fit' },
            { label: '3. No-wrap + 원본/지정 크기 유지 + 가로 스크롤', value: 'scroll' },
          ],
          defaultValue: 'wrap',
        }),
        // 💡 세로 정렬 필드 추가
        alignItems: fields.select({
          label: 'Vertical Alignment (세로 정렬)',
          options: [
            { label: 'Stretch (높이 채우기 / 동일 맞춤)', value: 'stretch' },
            { label: 'Top (상단 정렬)', value: 'flex-start' },
            { label: 'Center (중앙 정렬)', value: 'center' },
            { label: 'Bottom (하단 정렬)', value: 'flex-end' },
            { label: 'Baseline (글자 기준선 정렬)', value: 'baseline' },
          ],
          defaultValue: 'stretch',
        }),
        images: fields.array(
          fields.object({
            image: fields.image({
              label: 'Image',
              directory: 'src/assets/images/blocks',
              publicPath: '../../assets/images/blocks/',
            }),
            alt: fields.text({ label: 'Alt & Caption' }),
            caption: fields.checkbox({
              label: "Show alt text as a Caption"
            }),
            link: fields.url({ label: 'Link URL (Optional)' }),
            width: fields.text({ label: 'Width (Optional, e.g. 200px)' }),
            height: fields.text({ label: 'Height (Optional, e.g. 150px)' }),
          }),
          { label: 'Images', itemLabel: props => props.fields.alt.value || 'Image' }
        ),
      }),
    },
    
    // 7. 동적 리스트 (다른 컬렉션 글 불러오기)
    dynamicList: {
      label: '🔄 Dynamic List',
      schema: fields.object({
        gridSpan: gridSpanField,
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
        gridSpan: gridSpanField,
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
        gridSpan: gridSpanField,
        title: fields.text({ label: 'Block Title (Optional)' }),
        content: fields.text({ label: 'Content', multiline: true }),
      }),
    },
  },
  {
    label: 'Dynamic Content Blocks',
  }
);