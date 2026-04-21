const express = require("express");
const app = express();
const sequelize = require('../src/config/db'); 
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/config/swagger");

// 1. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Optimized CORS for Render
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true
}));


// 4. Routes
app.use("/api/auth", require("../src/routers/auth.router"));
// categories
app.use("/api/categories", require("../src/routers/category.router"))

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});