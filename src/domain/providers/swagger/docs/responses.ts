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

  OK: {
    description: 'OK',
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
              $ref: '#/components/schemas/ResponseStatusOK',
            },
          },
        },
      },
    },
  },

  LoginSuccess: {
    description: 'Login success response',
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

  AdminRegisterSuccess: {
    description: 'Admin Registe success response',
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
                  example: 'Admin created successfully!',
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

  CounsellorRegisterSuccess: {
    description: 'Counsellor register success response',
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
                  example: 'Counsellor created successfully!',
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

  TeacherRegisterSuccess: {
    description: 'Teacher register success response',
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
                  example: 'Teacher created successfully!',
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

  StudentRegisterSuccess: {
    description: 'Student register success response',
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
                  example: 'Student created successfully!',
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

  TokenVerifySuccess: {
    description: 'Token verify success response',
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
                  example: 'Token verified successfully!',
                },
                accessToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiJ9...',
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
}

export default responses
