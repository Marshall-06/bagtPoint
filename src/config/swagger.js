const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const getSwaggerOptions = () => ({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "bagtPoint API",
      version: "1.0.0",
      description: "bagtPoint API documentation",
    },
    servers: [
      {
        url: "/", 
        description: "Current Host (Auto-detect)"
      },
      {
        url: "https://bagt-point.onrender.com",
        description: "Production server",
      },
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Local development server",
      }
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
  },
  apis: ["./src/routers/*.js"],
});

module.exports = swaggerJsdoc(getSwaggerOptions());