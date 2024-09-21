import { type SchemaTypeDefinition } from 'sanity'
import { blogtype } from '../schema/blog'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogtype],
}
