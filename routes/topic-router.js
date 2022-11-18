const topicRouter = require("express").Router();
const { getTopics } = require("../controllers/topic-controller");

topicRouter.route("/").get(getTopics);

module.exports = topicRouter;
