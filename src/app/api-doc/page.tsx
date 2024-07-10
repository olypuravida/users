import React from 'react'
import { getApiDocs } from '@/domain/providers/swagger'
import ReactSwagger from './react-swagger'

export default async function ApiDoc() {
  const spec = await getApiDocs()

  return (
    <section className="container">
      <ReactSwagger spec={ spec } />
    </section>
  )
}
