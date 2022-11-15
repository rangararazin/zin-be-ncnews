const { selectAricles, selectArticlebyId } = require("../models/article-model");

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
