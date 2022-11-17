const { removeCommentbyId } = require("../models/comment-model");

exports.deleteCommentbyId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentbyId(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
