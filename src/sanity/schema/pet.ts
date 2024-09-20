import {defineField, defineType} from 'sanity'

export const pettype = defineType({
  name: 'pet',
  title: 'pet',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
  ],
})