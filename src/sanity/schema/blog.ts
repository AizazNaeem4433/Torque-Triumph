import {defineField, defineType} from 'sanity'

export const blogtype = defineType({
  name: 'blog',
  title: 'Blogs',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      title: 'Title of blog articale'
    }),
    defineField({
        name: 'slug',
        type: 'slug',
        title: 'Slug of your articale',
        options:{
          source:'Title',
        }
      }),
      defineField({
        name: 'image',
        type: 'image',
        title: 'Title Image',
      }),
      defineField({
        name: 'Smalldescription',
        type: 'text',
        title: 'Small description',
      }),
      defineField({
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [
          {
            type: 'block',
          }
        ]
      }),

      
  ],
})