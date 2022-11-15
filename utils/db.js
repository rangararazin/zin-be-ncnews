const db = require("../db/connection.js");

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
