import { fields } from '@keystatic/core';

export const peopleField = fields.blocks(
  {
    list: {
      label: 'From List',
      itemLabel: (props: any) =>
        props.value ? `People: ${props.value}` : 'Select people who are relevant to this post',
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
  }
);