import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'wmmpqkot', // Lo encontrás en sanity.json o en sanity.io/manage
  dataset: 'production', // O el dataset que hayas creado
  apiVersion: '2024-06-01', // Usa una fecha ISO actual
  useCdn: true, // true para rendimiento en producción
})

const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source) => builder.image(source)
