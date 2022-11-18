const commentRouter = require("express").Router();
const {
  deleteCommentbyId,
  patchCommentbyId,
} = require("../controllers/comment-controller");

commentRouter
  .route("/:comment_id")
  .delete(deleteCommentbyId)
  .patch(patchCommentbyId);

module.exports = commentRouter;
