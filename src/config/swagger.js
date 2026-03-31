// const swaggerJsdoc = require("swagger-jsdoc");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "bagtPoint API",
//       version: "1.0.0",
//       description: "bagtPoint API documentation",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000",
//         description: "Local server",
//       },
//       {
//         url: `http://${process.env.PORT || 'localhost'}:5000`,
//         description: "Local network server",
//       },
//       {
//         //  production first — Render Swagger will use this
//         url: "https://online-1-72ed.onrender.com",
//         description: "Production server",
//       },
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//   },
//   //  fixed path — your routers are in src/routers not routes
//   apis: ["./src/routers/*.js"],
// };

// module.exports = swaggerJsdoc(options);

const swaggerJsdoc = require("swagger-jsdoc");

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
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: `http://${process.env.LOCAL_IP || 'localhost'}:5000`,
        description: "Local network server",
      },
      {
        url: "https://online-1-72ed.onrender.com",
        description: "Production server",
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