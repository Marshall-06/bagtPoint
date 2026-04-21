const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "bagtPoint API", // Updated title
      version: "1.0.0",
      description: "bagtPoint API documentation",
    },
    servers: [
      {
        // ALWAYS put the HTTPS production URL first for Render
        url: "https://bagtpoint.onrender.com", 
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
  // Ensure this matches your folder structure exactly
  apis: ["./src/routers/*.js"], 
};

module.exports = swaggerJsdoc(options);