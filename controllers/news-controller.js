const { selectTopics, selectAricles } = require("../models/news-model");

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectAricles().then((articles) => {
    res.status(200).send({ articles });
  });
};
