const fs = require("fs/promises");
const path = "./endpoints.json";

exports.getEndpoints = (req, res, next) => {
  return fs
    .readFile(path, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    })
    .then((result) => {
      res.status(200).send({ endpoints: result });
    });
};
