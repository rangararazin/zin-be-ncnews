const articleRouter = require("express").Router();
const {
  getArticles,
  getArticlebyId,
  getCommentsbyArticle,
  postCommentbyArticle,
  patchArticlebyId,
} = require("../controllers/article-controller");

articleRouter.route("/").get(getArticles);

articleRouter
  .route("/:article_id")
  .get(getArticlebyId)
  .post(postCommentbyArticle)
  .patch(patchArticlebyId);

articleRouter.route("/:article_id/comments").get(getCommentsbyArticle);

module.exports = articleRouter;
