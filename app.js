const express = require("express");
const {
  getArticles,
  getArticlebyId,
  getCommentsbyArticle,
} = require("./controllers/article-controller");
const { getTopics } = require("./controllers/topic-controller");

const { handleCustomError, handlePSQLError } = require("./errors/errors");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticlebyId);

app.get("/api/articles/:article_id/comments", getCommentsbyArticle);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(handleCustomError);
app.use(handlePSQLError);

module.exports = app;
