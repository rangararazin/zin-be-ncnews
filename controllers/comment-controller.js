const {
  removeCommentbyId,
  updateCommentbyId,
} = require("../models/comment-model");

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

exports.patchCommentbyId = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;

    if (typeof inc_votes !== "number") {
      res.status(400).send({ msg: "Bad request" });
    } else {
      const commentToPatch = await updateCommentbyId(comment_id, inc_votes);
      res.status(200).send({ comment: commentToPatch });
    }
  } catch (error) {
    next(error);
  }
};
