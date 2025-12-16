const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./api/routes");

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Ecommerce API is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
