const responses = {
  BadRequest: {
    description: 'Bad Request',
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
                },
              },
            },
            status: {
              $ref: '#/components/schemas/ResponseStatusBadRequest',
            },
          },
        },
      },
    },
  },

  InternalServerError: {
    description: 'Internal Server Error',
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
                },
              },
            },
            status: {
              $ref: '#/components/schemas/ResponseStatusInternalServerError',
            },
          },
        },
      },
    },
  },

  NotFound: {
    description: 'Not Found',
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
                },
              },
            },
            status: {
              $ref: '#/components/schemas/ResponseStatusNotFound',
            },
          },
        },
      },
    },
  },

  Unauthorized: {
    description: 'Unauthorized',
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
                },
              },
            },
            status: {
              $ref: '#/components/schemas/ResponseStatusUnauthorized',
            },
          },
        },
      },
    },
  },
}

export default responses
