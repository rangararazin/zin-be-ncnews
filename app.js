const express = require("express");
const apiRouter = require("./routes/api-router");
const cors = require("cors");

const {
  handleCustomError,
  handlePSQLError,
  urlError,
} = require("./errors/errors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.all("/*", urlError);

app.use(handleCustomError);
app.use(handlePSQLError);

module.exports = app;
