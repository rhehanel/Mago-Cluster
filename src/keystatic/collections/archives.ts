import { collection, fields } from '@keystatic/core';

export const archives = collection({
  label: 'Archives',
  slugField: 'slug',
  path: 'src/content/archives/*',
  format: { contentField: 'content' },
  columns: ['title'],
  schema: {
    title: fields.text({label: 'Title', validation: { isRequired: true }}),
    slug: fields.slug({ 
      name: { 
        label: 'Slug (URL / 파일명)',
        description: '이 항목의 URL과 파일명으로 사용됩니다.'
      },
    }),
    people: fields.blocks(
      {
        list: {
          label: 'From List',
          itemLabel: props => props.value ? `People: ${props.value}` : 'Select people who is relevant to this post',
          schema: fields.relationship({
            label: 'Select People',
            description: 'Select people who is relevant to this post.',
            collection: 'people'
          })
        },
        text: {
          label: 'By Text',
          itemLabel: props => props.fields.name?.value || 'By Text (No name entered)',
          schema: fields.object({ 
            name: fields.text({
              label: 'Name',
              validation: { length: { min: 1 }, isRequired: true }
            }),
            link: fields.text({
              label: 'Link (Optional)',
              description: 'Link URL to the person\'s page',
            }),
          }),
        }
      },{
        label: 'People',
        description: 'Select people who is relevant to this post.',
      }
    ),
    tags: fields.array(
      fields.relationship({
        label: 'Category and tags',
        collection: 'tags',
        validation: { isRequired: true },
      }),
      {
        label: 'tags',
        itemLabel: (props: any) => props.value ?? 'Select a category or tags',
      }
    ),
    coverImage: fields.image({
      label: 'Cover Image',
      directory: 'src/assets/images/archives',
      publicPath: '../../assets/images/archives/',
    }),
    content: fields.markdoc({
      label: 'Content',
      options: {
        image: {
          directory: 'src/assets/images/archives',
          publicPath: '../../assets/images/archives/',
        },
      },
    }),
    works: fields.array(
      fields.relationship({
        label: 'Works',
        collection: 'works',
        validation: { isRequired: true },
      }),
      {
        label: 'Works',
        itemLabel: (props) => props.value ?? 'Select a project',
      }
    ),
  }
});