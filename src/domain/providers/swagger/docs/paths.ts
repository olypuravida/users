const paths = {
  '/api/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Authenticate user',
      description: 'Authenticate user with username and password, required basic authorization header.',
      security: [{ basicAuth: [] }],
      responses: {
        200: {
          description: 'Login success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  content: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Login successfully!',
                      },
                      user: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },

                  status: {
                    $ref: '#/components/schemas/ResponseStatusOK',
                  },
                },
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/BadRequest',
        },
        401: {
          $ref: '#/components/responses/Unauthorized',
        },
        404: {
          $ref: '#/components/responses/NotFound',
        },
        500: {
          $ref: '#/components/responses/InternalServerError',
        },
      },
    },
  },
}

export default paths
