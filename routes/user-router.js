const userRouter = require("express").Router();
const {
  getUsers,
  getUserbyUsername,
} = require("../controllers/user-controller");

userRouter.route("/").get(getUsers);
userRouter.route("/:username").get(getUserbyUsername);

module.exports = userRouter;
