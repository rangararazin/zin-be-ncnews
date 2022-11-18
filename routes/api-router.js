const articleRouter = require("./article-router");
const commentRouter = require("./comment-router");
const endPointRouter = require("./endpoint-router");
const topicRouter = require("./topic-router");
const userRouter = require("./user-router");

const apiRouter = require("express").Router();

apiRouter.use("/articles", articleRouter);
apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/", endPointRouter);

module.exports = apiRouter;
