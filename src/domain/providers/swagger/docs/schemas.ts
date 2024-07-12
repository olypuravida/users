const schemas = {
  User: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'ObjectId',
        description: 'User ID',
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'User email',
        example: 'KpZtH@example.com',
        required: true,
      },
      username: {
        type: 'string',
        description: 'User username',
        example: 'johnDoe',
        required: true,
      },
      password: {
        type: 'string',
        format: 'password',
        description: 'User password',
        required: true,
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'User creation date',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'User last update date',
      },
      deletedAt: {
        type: 'string',
        format: 'date-time',
        description: 'User deletion date',
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
        description: 'User status',
      },
      roles: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Role',
        },
        description: 'User roles',
      },
      sessions: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Session',
        },
        description: 'User sessions',
      },
      info: {
        $ref: '#/components/schemas/UserInfo',
      },
    },
  },

  UserInfo: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'ObjectId',
        description: 'User ID',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'User creation date',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'User last update date',
      },
      deletedAt: {
        type: 'string',
        format: 'date-time',
        description: 'User deletion date',
      },
      firstName: {
        type: 'string',
        description: 'User first name',
      },
      lastName: {
        type: 'string',
        description: 'User last name',
      },
      birthDate: {
        type: 'string',
        format: 'date-time',
        description: 'User birth date',
      },
      phone: {
        type: 'string',
        description: 'User phone',
      },
      address: {
        type: 'string',
        description: 'User address',
      },
      school: {
        type: 'string',
        description: 'User school',
      },
      class: {
        type: 'string',
        description: 'User class',
      },
      docType: {
        type: 'string',
        description: 'User document type',
      },
      docID: {
        type: 'string',
        description: 'User document ID',
      },
      avatar: {
        type: 'string',
        description: 'User avatar',
      },
      gender: {
        type: 'string',
        description: 'User gender',
      },
    },
  },

  Role: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'ObjectId',
        description: 'Role ID',
      },
      name: {
        type: 'string',
        description: 'Role name',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Role creation date',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Role last update date',
      },
      deletedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Role deletion date',
      },
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User',
        },
        description: 'Role users',
      },
    },
  },

  Session: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'ObjectId',
        description: 'Session ID',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Session creation date',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Session last update date',
      },
      deletedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Session deletion date',
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE', 'DELETED', 'EXPIRED'],
        description: 'Session status',
      },
      user: {
        $ref: '#/components/schemas/User',
        description: 'Session user',
      },
    },
  },

  ResponseStatusOK: {
    type: 'object',
    properties: {
      code: {
        type: 'number',
        description: 'Response code',
        example: 200,
      },
      reason: {
        type: 'string',
        description: 'Response reason',
        example: 'OK',
      },
      success: {
        type: 'boolean',
        description: 'Response success status',
        example: true,
      },
    },
  },

  ResponseStatusBadRequest: {
    type: 'object',
    properties: {
      code: {
        type: 'number',
        description: 'Response code',
        example: 400,
      },
      reason: {
        type: 'string',
        description: 'Response reason',
        example: 'BAD_REQUEST',
      },
      success: {
        type: 'boolean',
        description: 'Response success status',
        example: false,
      },
    },
  },

  ResponseStatusUnauthorized: {
    type: 'object',
    properties: {
      code: {
        type: 'number',
        description: 'Response code',
        example: 401,
      },
      reason: {
        type: 'string',
        description: 'Response reason',
        example: 'UNAUTHORIZED',
      },
      success: {
        type: 'boolean',
        description: 'Response success status',
        example: false,
      },
    },
  },

  ResponseStatusNotFound: {
    type: 'object',
    properties: {
      code: {
        type: 'number',
        description: 'Response code',
        example: 404,
      },
      reason: {
        type: 'string',
        description: 'Response reason',
        example: 'NOT_FOUND',
      },
      success: {
        type: 'boolean',
        description: 'Response success status',
        example: false,
      },
    },
  },

  ResponseStatusInternalServerError: {
    type: 'object',
    properties: {
      code: {
        type: 'number',
        description: 'Response code',
        example: 500,
      },
      reason: {
        type: 'string',
        description: 'Response reason',
        example: 'INTERNAL_SERVER_ERROR',
      },
      success: {
        type: 'boolean',
        description: 'Response success status',
        example: false,
      },
    },
  },
}

export default schemas
