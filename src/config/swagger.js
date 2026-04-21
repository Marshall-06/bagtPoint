const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "bagtPoint API",
      version: "1.0.0",
      description: "bagtPoint API documentation",
    },
    servers: [
      {
        url: "https://bagt-point.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:5000",
        description: "Local server",
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
    },
    schemes: ["https", "http"],
  },
  apis: ["./src/routers/*.js"],
};

module.exports = swaggerJsdoc(options);