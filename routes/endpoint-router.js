const endPointRouter = require("express").Router();
const { getEndpoints } = require("../controllers/endpoint-controller");

endPointRouter.route("/").get(getEndpoints);

module.exports = endPointRouter;
