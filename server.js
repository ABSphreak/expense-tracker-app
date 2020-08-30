require("colors");
require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");

connectDB();

const transactions = require("./routes/transactions");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  )
);
