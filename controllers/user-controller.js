const { selectUsers, selectUserbyUsername } = require("../models/user-model");

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUserbyUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await selectUserbyUsername(username);

    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
