const requestBodies = {
  AdminRequest: {
    description: 'Admin request body',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Admin username',
              example: 'admin',
              required: true,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Admin email',
              example: 'KpZtH@example.com',
              required: true,
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Admin password',
              required: true,
            },
            info: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  description: 'Admin first name',
                  required: true,
                },
                lastName: {
                  type: 'string',
                  description: 'Admin last name',
                  required: true,
                },
                birthDate: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Admin birth date',
                  required: true,
                },
                address: {
                  type: 'string',
                  description: 'Admin address',
                  example: '123 Main St',
                  required: true,
                },
                phone: {
                  type: 'string',
                  description: 'Admin phone',
                  example: '1234567890',
                  required: true,
                },
                school: {
                  type: 'string',
                  description: 'Admin school',
                },
                position: {
                  type: 'string',
                  description: 'Admin position',
                },
                class: {
                  type: 'string',
                  description: 'Admin classroom',
                },
                docType: {
                  type: 'string',
                  description: 'Admin document type',
                  example: 'ID',
                },
                docID: {
                  type: 'string',
                  description: 'Admin document number',
                },
                gender: {
                  type: 'string',
                  description: 'Admin gender',
                  example: 'MALE',
                },
              },
            },
          },
        },
      },
    },
  },

  CounsellorRequest: {
    description: 'Counsellor request body',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Counsellor username',
              example: 'counsellor',
              required: true,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Counsellor email',
              example: 'KpZtH@example.com',
              required: true,
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Counsellor password',
              required: true,
            },
            info: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  description: 'Counsellor first name',
                  required: true,
                },
                lastName: {
                  type: 'string',
                  description: 'Counsellor last name',
                  required: true,
                },
                birthDate: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Counsellor birth date',
                  required: true,
                },
                address: {
                  type: 'string',
                  description: 'Counsellor address',
                  example: '123 Main St',
                  required: true,
                },
                phone: {
                  type: 'string',
                  description: 'Counsellor phone',
                  example: '1234567890',
                  required: true,
                },
                school: {
                  type: 'string',
                  description: 'Counsellor school',
                },
                position: {
                  type: 'string',
                  description: 'Counsellor position',
                },
                class: {
                  type: 'string',
                  description: 'Counsellor classroom',
                },
                docType: {
                  type: 'string',
                  description: 'Counsellor document type',
                  example: 'ID',
                  required: true,
                },
                docID: {
                  type: 'string',
                  description: 'Counsellor document number',
                  required: true,
                },
                gender: {
                  type: 'string',
                  description: 'Counsellor gender',
                  example: 'FEMALE',
                },
              },
            },
          },
        },
      },
    },
  },

  TeacherRequest: {
    description: 'Teacher request body',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Teacher username',
              example: 'teacher',
              required: true,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Teacher email',
              example: 'KpZtH@example.com',
              required: true,
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Teacher password',
              required: true,
            },
            info: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  description: 'Teacher first name',
                  required: true,
                },
                lastName: {
                  type: 'string',
                  description: 'Teacher last name',
                  required: true,
                },
                birthDate: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Teacher birth date',
                  required: true,
                },
                address: {
                  type: 'string',
                  description: 'Teacher address',
                  example: '123 Main St',
                  required: true,
                },
                phone: {
                  type: 'string',
                  description: 'Teacher phone',
                  example: '1234567890',
                  required: true,
                },
                school: {
                  type: 'string',
                  description: 'Teacher school',
                  required: true,
                },
                position: {
                  type: 'string',
                  description: 'Teacher position',
                },
                class: {
                  type: 'string',
                  description: 'Teacher classroom',
                  required: true,
                },
                docType: {
                  type: 'string',
                  description: 'Teacher document type',
                  example: 'ID',
                  required: true,
                },
                docID: {
                  type: 'string',
                  description: 'Teacher document number',
                  required: true,
                },
                gender: {
                  type: 'string',
                  description: 'Teacher gender',
                  example: 'FEMALE',
                  required: true,
                },
              },
            },
          },
        },
      },
    },
  },

  StudentRequest: {
    description: 'Student request body',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Student username',
              example: 'student',
              required: true,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Student email',
              example: 'KpZtH@example.com',
              required: true,
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Student password',
              required: true,
            },
            info: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  description: 'Student first name',
                  required: true,
                },
                lastName: {
                  type: 'string',
                  description: 'Student last name',
                  required: true,
                },
                birthDate: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Student birth date',
                  required: true,
                },
                address: {
                  type: 'string',
                  description: 'Student address',
                  example: '123 Main St',
                  required: true,
                },
                phone: {
                  type: 'string',
                  description: 'Student phone',
                  example: '1234567890',
                  required: true,
                },
                school: {
                  type: 'string',
                  description: 'Student school',
                  required: true,
                },
                class: {
                  type: 'string',
                  description: 'Student classroom',
                  required: true,
                },
                docType: {
                  type: 'string',
                  description: 'Student document type',
                  example: 'STUDENT_CARD',
                  required: true,
                },
                docID: {
                  type: 'string',
                  description: 'Student document number',
                  required: true,
                },
                gender: {
                  type: 'string',
                  description: 'Student gender',
                  example: 'MALE',
                  required: true,
                },
              },
            },
          },
        },
      },
    },
  },
}

export default requestBodies
