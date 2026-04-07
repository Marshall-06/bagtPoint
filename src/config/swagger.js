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
        url: "https://bagt-point.onrender.com",
        description: "Production server",
      },
      {
        // Use the current process port or default to 5000
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Local development server",
      },
      {
        url: `http://${process.env.LOCAL_IP || 'localhost'}:${process.env.PORT || 5000}`,
        description: "Local network server",
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
  },
  apis: ["./src/routers/*.js"],
});

module.exports = swaggerJsdoc(getSwaggerOptions());