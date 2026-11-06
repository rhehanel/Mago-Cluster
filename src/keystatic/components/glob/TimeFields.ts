import { fields } from '@keystatic/core';

// 1. [시스템 정렬용] 표준 날짜 (목록 노출 및 Sorting 기준)
export const publishDateField = fields.date({
  label: 'System Date (For Sorting)',
  description: '웹사이트 목록에서 글을 정렬할 때 기준이 되는 시스템 날짜입니다.',
  validation: { isRequired: true },
  defaultValue: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10),
});

// 2. [화면 표시용] 복잡한 시간 표시 시스템 (TimeDisplay.astro와 연동)
export const displayTimeField = fields.conditional(
  fields.select({
    label: 'Display Time Format',
    description: '실제 화면에 표시될 시간 형식을 선택하세요.',
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
        defaultValue: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10),
      }),
      time: fields.text({ label: 'Time (Optional)' }),
    }),

    year: fields.object({
      value: fields.text({ label: 'Year' }),
    }),

    time: fields.conditional(
      fields.checkbox({ label: 'Custom Date String' }),
      {
        true: fields.object({
          time: fields.text({ label: 'Time (e.g., 11:00 AM - 7:00 PM)' }),
          dates: fields.text({
            label: 'Dates String (e.g. 2024.10 - 2025.01)',
          }),
        }),
        false: fields.object({
          time: fields.text({ label: 'Time (e.g., 11:00 AM - 7:00 PM)' }),
          date: fields.date({
            label: 'Start Date',
            defaultValue: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10),
          }),
          enddate: fields.date({ label: 'End Date' }),
        }),
      }
    ),
  }
);