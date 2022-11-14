const express = require("express");
const { getArticles } = require("./controllers/article-controller");
const { getTopics } = require("./controllers/topic-controller");

const { handleCustomError } = require("./errors/errors");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(handleCustomError);

module.exports = app;
