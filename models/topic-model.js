const db = require("../db/connection.js");

exports.selectTopics = () => {
  return db
    .query(
      `
    SELECT * from topics`
    )
    .then((result) => {
      return result.rows;
    });
};
