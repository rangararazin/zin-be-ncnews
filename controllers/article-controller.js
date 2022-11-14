const { selectAricles } = require("../models/article-model");

exports.getArticles = (req, res, next) => {
  selectAricles().then((articles) => {
    res.status(200).send({ articles });
  });
};
