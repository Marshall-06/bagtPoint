const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EDUmix API",
      version: "1.0.0",
      description: "EDUmix API documentation",
    },
    servers: [
  {
    //  production first — Render Swagger will use this
    url: "https://online-1-72ed.onrender.com",
    description: "Production server",
  },
  {
    url: "http://localhost:8080",
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
  //  fixed path — your routers are in src/routers not routes
  apis: ["./src/routers/*.js"],
};

module.exports = swaggerJsdoc(options);