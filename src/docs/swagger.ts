import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Selene API",
      version: "1.0.0",
      description: "API para gerenciamento de ciclos menstruais.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Gabriela",
            },
            email: {
              type: "string",
              example: "gabriela@email.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        Cycle: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            startDate: {
              type: "string",
              format: "date",
              example: "2026-07-01",
            },
            endDate: {
              type: "string",
              format: "date",
              example: "2026-07-05",
            },
            cycleLength: {
              type: "integer",
              example: 28,
            },
            notes: {
              type: "string",
              example: "Regular cycle",
            },
            userId: {
              type: "integer",
              example: 1,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        Symptom: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            name: {
              type: "string",
              example: "Cramps",
            },
            intensity: {
              type: "integer",
              example: 8,
            },
            notes: {
              type: "string",
              example: "Strong pain during the first day.",
            },
            cycleId: {
              type: "integer",
              example: 1,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },

        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Resource not found",
            },
          },
        },

        ValidationError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Validation failed",
            },
            errors: {
              type: "array",
              items: {
                type: "string",
              },
              example: [
                "Email is required",
                "Password must be at least 6 characters",
              ],
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);