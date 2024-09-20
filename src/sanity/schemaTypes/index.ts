import { type SchemaTypeDefinition } from 'sanity'
import { pettype } from '../schema/pet'
import { blogtype } from '../schema/blog'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pettype, blogtype],
}
