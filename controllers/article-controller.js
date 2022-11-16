const {
  selectAricles,
  selectArticlebyId,
  selectCommentbyArticle,
  insertCommentbyArticle,
  updateArticlebyId,
} = require("../models/article-model");

exports.getArticles = (req, res, next) => {
  selectAricles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlebyId = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlebyId(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsbyArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentbyArticle(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentbyArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body, votes } = req.body;

  insertCommentbyArticle(article_id, username, body, votes)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticlebyId = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (typeof inc_votes !== "number") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    updateArticlebyId(article_id, inc_votes)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch((err) => {
        next(err);
      });
  }
};
