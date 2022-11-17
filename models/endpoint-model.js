const fs = require("fs/promises");
const path = "./endpoints.json";

exports.readEndpoints = () => {
  return fs.readFile(path, "utf-8").then((data) => {
    return JSON.parse(data);
  });
};
