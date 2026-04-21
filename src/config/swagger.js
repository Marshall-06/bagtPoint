const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

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
  },
  // Using path.join prevents "File not found" errors on Render/Linux
  apis: [path.join(__dirname, "../routers/*.js")], 
};

module.exports = swaggerJsdoc(options);