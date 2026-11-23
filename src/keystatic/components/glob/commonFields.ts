import { fields } from '@keystatic/core';
import { createMarkdocComponents } from '../../contentFields';

// 💡 공통 12분할 그리드 폭 선택 필드
export const gridSpanField = fields.select({
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

export const tagsField = fields.array(
  fields.relationship({
    label: 'Category and tags',
    collection: 'tags',
    validation: { isRequired: true },
  }),
  {
    label: 'Tags',
    itemLabel: (props: any) => props.value ?? 'Select a category or tag',
  }
);

export function createContentField(
  collectionName: 'posts' | 'works' | 'archives' | 'scraps' | 'people',
  imageDirectory: string,
  imagePublicPath: string
) {
  return fields.markdoc({
    label: 'Markdoc Content',
    options: {
      image: {
        directory: imageDirectory,
        publicPath: imagePublicPath,
      },
    },
    components: createMarkdocComponents(collectionName),
  });
}

export const contentDivision = fields.checkbox({ label: 'Unset Markdoc Content Division'});

// 💡 그리드 폭(gridSpan) 선택 필드가 적용된 markdocSizeField
export const markdocSizeField = fields.conditional(
  fields.checkbox({ label: 'Custom Markdoc Size' }),
  {
    true: fields.object({
      gridSpan: gridSpanField,
      height: fields.text({ label: 'Height (Optional, e.g., max-content, 500px)' }),
      margin: fields.checkbox({ label: 'Center the content (Center Align)' }),
    }),
    false: fields.empty(),
  }
);