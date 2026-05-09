import {defineField, defineType} from 'sanity'

const programTypes = [
  {title: 'One-time event', value: 'event'},
  {title: 'Ongoing space', value: 'recurring'},
]

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'schedule', title: 'Schedule'},
    {name: 'registration', title: 'Registration'},
    {name: 'publishing', title: 'Publishing'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'programType',
      title: 'Program type',
      type: 'string',
      group: 'content',
      initialValue: 'event',
      options: {
        layout: 'radio',
        list: programTypes,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flyerImage',
      title: 'Polaroid/flyer image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description:
            'Short description for accessibility, such as the event flyer title or photo contents.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.required().max(320),
    }),
    defineField({
      name: 'description',
      title: 'Full description',
      type: 'array',
      group: 'content',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'startDate',
      title: 'Start date/time',
      type: 'datetime',
      group: 'schedule',
      description:
        'Required for one-time events. Leave blank only for ongoing spaces.',
    }),
    defineField({
      name: 'endDate',
      title: 'End date/time',
      type: 'datetime',
      group: 'schedule',
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expiration date/time',
      type: 'datetime',
      group: 'schedule',
      description: 'Optional override for when the public page should stop showing this item.',
    }),
    defineField({
      name: 'registrationDeadline',
      title: 'Registration deadline',
      type: 'datetime',
      group: 'schedule',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'schedule',
    }),
    defineField({
      name: 'audience',
      title: 'Audience',
      type: 'string',
      group: 'schedule',
      description: 'Example: Middle and high school students ages 12-18.',
    }),
    defineField({
      name: 'fee',
      title: 'Fee',
      type: 'string',
      group: 'schedule',
      description: 'Example: Free, $35, or Pay what you can.',
    }),
    defineField({
      name: 'givebutterUrl',
      title: 'Registration form URL',
      type: 'url',
      group: 'registration',
      description: 'Paste a Google Form, Givebutter, or other HTTPS registration link.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
          allowRelative: false,
        }),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      group: 'registration',
      initialValue: 'Register',
      options: {
        list: [
          {title: 'Register', value: 'Register'},
          {title: 'Apply', value: 'Apply'},
          {title: 'Get Tickets', value: 'Get Tickets'},
          {title: 'Learn More', value: 'Learn More'},
        ],
      },
    }),
    defineField({
      name: 'isPublished',
      title: 'Show on website',
      type: 'boolean',
      group: 'publishing',
      description:
        'Turn this off to hide the program from the public page without unpublishing it.',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Feature this item',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'flyerImage',
      programType: 'programType',
      startDate: 'startDate',
    },
    prepare({title, media, programType, startDate}) {
      const date = startDate
        ? new Intl.DateTimeFormat('en', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }).format(new Date(startDate))
        : 'No date'

      return {
        title,
        media,
        subtitle: `${programType || 'event'} · ${date}`,
      }
    },
  },
})
