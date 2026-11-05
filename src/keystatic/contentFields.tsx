import { fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

/**
 * Markdoc 편집기 안에서 사용할 컴포넌트.
 * 이 컴포넌트들은 fields.blocks와 별개로 Markdoc 문서 안에 삽입된다.
 */
export function createMarkdocComponents(collectionName: 'posts' | 'scraps') {
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

        return (
          <div
            style={{
              padding: '8px',
              border: '1px dashed #ccc',
              marginBottom: '8px',
            }}
          >
            <div>이미지 출력 형태: {props.value?.displayType ?? 'full'}</div>
            {imageSrc && (
              <img
                src={imageSrc}
                alt=""
                style={{ maxWidth: '100%', maxHeight: '150px' }}
              />
            )}
            {props.value?.caption && <div>{props.value.caption}</div>}
          </div>
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

        return (
          <div style={{ padding: '8px', border: '1px dashed #888' }}>
            <div>Flex 이미지 갤러리 ({itemCount}개 이미지)</div>
            <div>정렬: {props.value?.align ?? 'center'}</div>
            <div>방향: {props.value?.direction ?? 'row'}</div>
          </div>
        );
      },
    }),

    VideoPlayer: block({
      label: 'Video Player (YouTube / Drive)',
      schema: {
        url: fields.text({
          label: 'Video URL',
          description: 'YouTube 주소 또는 Google Drive 공유 링크를 입력하세요.',
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
      ContentView: (props: any) => (
        <div style={{ padding: '8px', border: '1px dashed #666' }}>
          <div>비디오 플레이어</div>
          <div style={{ fontSize: '0.85rem', color: '#888' }}>
            {props.value?.url || 'URL을 입력하세요'}
          </div>
        </div>
      ),
    }),
  };
}

type OrderedBlockOptions = {
  imageDirectory: string;
  imagePublicPath: string;
};

/**
 * 페이지 전체의 출력 순서를 제어하는 fields.blocks 스키마.
 * markdoc은 실제 본문을 저장하지 않고 content 필드의 출력 위치만 지정한다.
 */
export function createOrderedContentBlocks({
  imageDirectory,
  imagePublicPath,
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

  const imageGroupSchema = () =>
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
        fields.checkbox({ label: 'Use Scroll', defaultValue: false }),
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

  return {
    // content 필드의 Markdoc 본문을 이 위치에서 한 번 렌더링한다.
    markdoc: {
      label: 'Markdoc Content Position',
      itemLabel: () => 'Markdoc Content',
      schema: fields.empty(),
    },

    video: {
      label: 'Video Block',
      itemLabel: (props: any) => {
        const provider = props?.fields?.discriminant?.value || 'Video';
        return `Video (${provider})`;
      },
      schema: fields.conditional(
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
          }),
          youtube: fields.object({
            url: fields.text({
              label: 'YouTube video URL',
              validation: { length: { min: 1 } },
            }),
          }),
          vimeo: fields.object({
            url: fields.text({
              label: 'Vimeo video URL',
              validation: { length: { min: 1 } },
            }),
          }),
        },
      ),
    },

    image: {
      label: 'Single Image',
      itemLabel: () => 'Single Image',
      schema: fields.object({
        image: imageField(),
        link: fields.text({ label: 'Image Link URL (Optional)' }),
        size: fields.integer({
          label: 'Image Width (%)',
          description: '10부터 100까지',
          validation: { min: 10, max: 100 },
        }),
        border: fields.checkbox({ label: 'Hide border' }),
      }),
    },

    manualList: {
      label: 'Manual List',
      itemLabel: () => 'Manual List',
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
              label: 'From Post List',
              itemLabel: (props: any) =>
                props.value ? `Post: ${props.value}` : 'Select a Post',
              schema: fields.relationship({
                label: 'Select list item from Posts list',
                collection: 'posts',
              }),
            },
            tag: {
              label: 'From Tag List',
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

    columnImages: {
      label: 'Column Images',
      itemLabel: () => 'Column Images',
      schema: imageGroupSchema(),
    },

    rowImages: {
      label: 'Row Images',
      itemLabel: () => 'Row Images',
      schema: imageGroupSchema(),
    },
  };
}