import { collection, fields } from '@keystatic/core';

export const works = collection({
  label: 'Work',
  slugField: 'title',
  path: 'src/content/works/*',
  columns: ['title', 'originaltitle'],
  format: { contentField: 'content' },
  schema: {
    title: fields.slug({
      name: { label: 'English Title', description: "This value will be used to generate the URL slug." },
    }),
    originaltitle: fields.text({ label: 'Original Title' }),
    
    time: fields.conditional(
      fields.select({
        label: 'Data Type',
        description: 'Select the type of date and time format to display.',
        options: [
          { label: 'Year (YYYY)', value: 'year' },
          { label: 'Date (YYYY-MM-DD)', value: 'date' },
          { label: 'Time with Period', value: 'time' },
        ],
        defaultValue: 'year',
      }),
      {
        year: fields.object({
          value: fields.text({
            label: 'Year',
            validation: { length: { min: 1, max: 6 }, isRequired: true }
          }),
        }),
        date: fields.object({
          value: fields.date({
            label: 'Date',
            validation: { isRequired: true },
          }),
          time: fields.text({
            label: 'Time',
            description: 'Format: 00:00 or 00:00 ~ 00:00',
          }),
        }),
        time: fields.conditional(
          fields.checkbox({ 
            label: 'Use Custom Dates', 
            description: 'Check this to enter custom dates manually (e.g., Aug 2nd, 10th, 30th)', 
            defaultValue: false 
          }),
          {
            true: fields.object({
              dates: fields.text({ 
                label: 'Custom Dates', 
                description: 'Enter the custom date format or schedule freely.' 
              }),
              time: fields.text({
                label: 'Time',
                description: 'Format: 00:00 or 00:00 ~ 00:00',
                validation: { length: { max: 13 } }
              }),
            }),
            false: fields.object({
              date: fields.date({
                label: 'Start Date',
                validation: { isRequired: true },
              }),
              enddate: fields.date({
                label: 'End Date (Optional)',
                description: 'Leave empty for single-day events.',
              }),
              time: fields.text({
                label: 'Time',
                description: 'Format: 00:00 or 00:00 ~ 00:00',
                validation: { length: { max: 13 } }
              }),
            }),
          }
        ),
      }
    ),
    
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
      directory: 'src/assets/images/works',
      publicPath: '../../assets/images/works/',
    }),
    
    content: fields.markdoc({
      label: 'Markdoc Content',
      options: {
        image: {
          directory: 'src/assets/images/works',
          publicPath: '../../assets/images/works/',
        },
      },
    }),

    markdocSize: fields.conditional(
      fields.checkbox({ 
        label: 'Customize Markdoc', 
        description: 'Check this to customize the size of Markdoc', 
        defaultValue: false
      }),
      {
        true: fields.object({
          width: fields.text({ label: 'Width (e.g., 50%, 500px)' }),
          height: fields.text({ label: 'Height (e.g., max-content, 500px)' }),
          margin: fields.checkbox({ label: 'Center the content' }),
        }),
        false: fields.empty(),
      }
    ),
    
    blocks: fields.blocks(
      {
        markdoc: {
          label: 'Markdoc Locator',
          schema: fields.empty(),
        },
        video: {
          label: 'Video Block',
          itemLabel: props => `Video (${props.fields.link.discriminant})`,
          schema: fields.object({
            link: fields.conditional(
              fields.select({
                label: 'Link from',
                options: [
                  { label: 'Google Drive', value: 'google' },
                  { label: 'Youtube', value: 'youtube' },
                  { label: 'Vimeo', value: 'vimeo' },
                ],
                defaultValue: 'google',
              }),
              {
                google: fields.object({
                  url: fields.text({ label: 'Google Drive URL', validation: { length: { min: 1 } } }),
                }),
                youtube: fields.object({
                  url: fields.text({ label: 'YouTube video URL', validation: { length: { min: 1 } } }),
                }),
                vimeo: fields.object({
                  url: fields.text({ label: 'Vimeo video URL', validation: { length: { min: 1 } } }),
                }),
              },
            ),
            size: fields.text({
              label: 'Video width',
              description: 'Please include CSS Units( px, %, rem, vw, fit-content, ...)',
            }),
          })
        },
        image: {
          label: 'Image Block',
          itemLabel: props => props.fields.image?.value ? 'Image' : 'Image Block',
          schema: fields.object({
            image: fields.image({
              label: "Upload Image",
              directory: 'src/assets/images/works',
              publicPath: '../../assets/images/works/',
              validation: { isRequired: true },
            }),
            link: fields.text({ label: 'Image Link URL (Optional)' }),
            size: fields.text({
              label: 'Image width',
              description: 'Please include CSS Units( px, %, rem, vw, fit-content, ...)',
            }),
            border: fields.checkbox({ label: 'Hide border' }),
          })
        },
        text: {
          label: 'Text Block',
          itemLabel: () => 'Text Box',
          schema: fields.mdx({
            label: "Text Box",
          }),
        },
        dynamicList: {
          label: 'Archive List',
          itemLabel: props => props.fields.title?.value || 'Untitled Archive List',
          schema: fields.object({
            title: fields.text({ label: 'List Title' }),
            source: fields.select({
              label: 'Source Collection',
              options: [
                { label: 'Works', value: 'works' },
                { label: 'Posts', value: 'posts' }
              ],
              defaultValue: 'works',
            }),
            filterByArtist: fields.relationship({
              label: 'Filter by Artist',
              collection: 'artists',
            }),
            filterByTag: fields.relationship({
              label: 'Filter by Tag (Medium/Category)',
              collection: 'tags',
            }),
            limit: fields.integer({
              label: 'Item Limit',
              defaultValue: 10,
            })
          })
        },
        manualList: {
          label: 'Manual List',
          itemLabel: props => props.fields.title?.value || 'Manual List',
          schema: fields.object({
            title: fields.text({ label: 'List Title' }),
            list: fields.blocks(
              {
                text: {
                  label: 'By Text',
                  itemLabel: props => props.fields.name?.value || 'Text Item',
                  schema: fields.object({
                    name: fields.text({ label: 'Title', validation: { length: { min: 1 }, isRequired: true } }),
                    link: fields.text({ label: 'Link URL' }),
                  })
                },
                artist: {
                  label: 'From Artist List',
                  itemLabel: props => props.value ? `Artist: ${props.value}` : 'Select an Artist',
                  schema: fields.relationship({ label: 'Select list item from Artist list', collection: 'artists' }),
                },
                works: {
                  label: 'From Works List',
                  itemLabel: props => props.value ? `Work: ${props.value}` : 'Select a Work',
                  schema: fields.relationship({ label: 'Select list item from Work list', collection: 'works' }),
                },
                posts: {
                  label: 'From Post List',
                  itemLabel: props => props.value ? `Post: ${props.value}` : 'Select a Post',
                  schema: fields.relationship({ label: 'Select list item from Post list', collection: 'posts' }),
                },
                tag: {
                  label: 'From Tag List',
                  itemLabel: props => props.value ? `Tag: ${props.value}` : 'Select a Tag',
                  schema: fields.relationship({ label: 'Select list item from Tag list', collection: 'tags' }),
                },
              },{
                label: 'List Items',
                description: 'Add items to create a manual list.',
              }
            ),
          }),
        },
        columnImages: {
          label: 'Column Images',
          itemLabel: props => 'Column Images',
          schema: fields.object({
            width: fields.object({
              value: fields.text({
                label: 'Container Width',
                description: 'Please include CSS Units( px, %, rem, vw, fit-content, ...)',
              }),
            }),
            alignment: fields.conditional(
              fields.checkbox({
                label: 'Set Full Width',
              }),
              {
                true: fields.empty(),
                false: fields.select({
                  label: 'Image Alignment',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' },
                  ],
                  defaultValue: 'left'
                }),
              }
            ),
            height: fields.conditional(
              fields.checkbox({ label: 'Use Scroll', defaultValue: false }),
              {
                true: fields.object({
                  height: fields.text({
                    label: 'Container Height',
                    description: 'Please include CSS Units( px, %, rem, vh, ...)',
                  }),
                }),
                // Empty fields are useful to show... no fields!
                false: fields.empty(),
              }
            ),
            images: fields.array(
              fields.object({
                image: fields.image({
                  label: "Upload Image",
                  directory: 'src/assets/images/works',
                  publicPath: '../../assets/images/works/',
                  validation: { isRequired: true },
                }),
                link: fields.text({ label: 'Image Link URL (Optional)' }),
                size: fields.text({
                  label: 'Image Width',
                  description: 'Please include CSS Units( px, %, rem, vw, fit-content, ...)',
                }),
                border: fields.checkbox({ label: 'Hide border' }),
              }),
              {
                label: 'Images',
              }
            ),
          })
        },
        rowImages: {
          label: 'Row Images',
          itemLabel: props => 'Row Images',
          schema: fields.object({
            width: fields.object({
              value: fields.text({
                label: 'Container Width',
                description: 'Please include CSS Units( px, %, rem, vw, fit-content, ...)',
              }),
            }),
            scrollX: fields.conditional(
              fields.checkbox({
                label: 'Use Horizontal Scroll',
                defaultValue: false,
              }),
              {
                true: fields.text({
                  label: 'Container Height',
                  description: 'Please include CSS Units( px, %, rem, vh, auto, ...)',
                }),
                false: fields.empty(),
              }
            ),
            alignment: fields.select({
              label: 'Vertical Alignment (align-items)',
              description: 'Align images vertically within the row',
              options: [
                { label: 'Top', value: 'flex-start' },
                { label: 'Center', value: 'center' },
                { label: 'Bottom', value: 'flex-end' },
                { label: 'Stretch (100% Height)', value: 'stretch' },
              ],
              defaultValue: 'flex-start'
            }),
            images: fields.array(
              fields.object({
                image: fields.image({
                  label: "Upload Image",
                  directory: 'src/assets/images/works',
                  publicPath: '../../assets/images/works/',
                  validation: { isRequired: true },
                }),
                link: fields.text({ label: 'Image Link URL (Optional)' }),
                size: fields.text({
                  label: 'Image Width',
                  description: 'Please include CSS Units( px, %, rem, vw, fit-content, ...)',
                }),
                border: fields.checkbox({ label: 'Hide border' }),
              }),
              {
                label: 'Images',
              }
            ),
          })
        },
      },
      {label: 'Content Blocks'}
    )
  },
});