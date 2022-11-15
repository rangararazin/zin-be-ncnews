const db = require("../db/connection.js");
const format = require("pg-format");

exports.checkArticleExist = (article_id) => {
  return db
    .query(
      `
SELECT * FROM articles
WHERE article_Id =$1`,
      [article_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
    });
};

exports.checkUserExist = (column, value) => {
  const queryStr = format(
    `SELECT * FROM users where %I=%L;`,

    column,
    value
  );
  return db.query(queryStr).then((result) => {
    if (!result.rows.length) {
      return Promise.reject({ status: 404, msg: "User not found" });
    }
  });
};
