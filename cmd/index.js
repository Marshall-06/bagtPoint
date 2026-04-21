const express = require("express")
const app = express()
const sequelize = require('../src/config/db');
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT || 5000
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/config/swagger");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}))

// auth
app.use("/api/auth", require("../src/routers/auth.router"))


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})