const express = require("express");
const { getTopics } = require("./controllers/news-controller");

const { handleCustomError } = require("./errors/errors");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(handleCustomError);

module.exports = app;
