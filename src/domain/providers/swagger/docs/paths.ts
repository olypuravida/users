const paths = {
  '/api/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Authenticate user',
      description: 'Authenticate user with username and password, required basic authorization header.',
      security: [{ basicAuth: [] }],
      responses: {
        200: {
          $ref: '#/components/responses/LoginSuccess',
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

  '/api/auth/register/admin': {
    post: {
      tags: ['Auth'],
      summary: 'Register admin user',
      description: 'Register admin user with data provided, required master bearer authorization header.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/AdminRequest',
      },
      responses: {
        200: {
          $ref: '#/components/responses/AdminRegisterSuccess',
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

  '/api/auth/register/counsellor': {
    post: {
      tags: ['Auth'],
      summary: 'Register counsellor user',
      description: 'Register counsellor user with data provided, required master bearer authorization header.',
      requestBody: {
        $ref: '#/components/requestBodies/CounsellorRequest',
      },
      responses: {
        200: {
          $ref: '#/components/responses/CounsellorRegisterSuccess',
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

  '/api/auth/register/teacher': {
    post: {
      tags: ['Auth'],
      summary: 'Register teacher user',
      description: 'Register teacher user with data provided, required master bearer authorization header.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/TeacherRequest',
      },
      responses: {
        200: {
          $ref: '#/components/responses/TeacherRegisterSuccess',
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

  '/api/auth/register/student': {
    post: {
      tags: ['Auth'],
      summary: 'Register student user',
      description: 'Register student user with data provided, required master bearer authorization header.',
      security: [{ bearerAuth: [] }],
      requestBody: {
        $ref: '#/components/requestBodies/StudentRequest',
      },
      responses: {
        200: {
          $ref: '#/components/responses/StudentRegisterSuccess',
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
