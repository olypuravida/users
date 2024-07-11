import { createSwaggerSpec } from 'next-swagger-doc'
import { APP_TITLE } from '../../constants/app'

import requestBodies from './docs/requestBodies'
import responses from './docs/responses'
import schemas from './docs/schemas'
import paths from './docs/paths'

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: `${APP_TITLE} API Documentation`,
        version: '1.0',
      },
      paths,
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },

          basicAuth: {
            type: 'http',
            scheme: 'basic',
          },
        },

        requestBodies,
        responses,
        schemas,
      },

      security: [{
        bearerAuth: [],
        basicAuth: [],
      }],
    },
  })
  return spec
}
