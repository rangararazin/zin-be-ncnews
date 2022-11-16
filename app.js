const express = require("express");
const {
  getArticles,
  getArticlebyId,
  getCommentsbyArticle,
  postCommentbyArticle,
  patchArticlebyId,
} = require("./controllers/article-controller");
const { getTopics } = require("./controllers/topic-controller");
const { getUsers } = require("./controllers/user-controller");

const { handleCustomError, handlePSQLError } = require("./errors/errors");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticlebyId);

app.get("/api/articles/:article_id/comments", getCommentsbyArticle);

app.post("/api/articles/:article_id", postCommentbyArticle);

app.patch("/api/articles/:article_id", patchArticlebyId);

app.get("/api/users", getUsers);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(handleCustomError);
app.use(handlePSQLError);

module.exports = app;
