const commentRouter = require("express").Router();
const { deleteCommentbyId } = require("../controllers/comment-controller");

commentRouter.route("/:comment_id").delete(deleteCommentbyId);

module.exports = commentRouter;
