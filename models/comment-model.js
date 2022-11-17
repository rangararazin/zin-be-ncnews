const db = require("../db/connection.js");

exports.removeCommentbyId = (comment_id) => {
  return db
    .query(
      `
    DELETE FROM comments
    WHERE comment_id=$1
    RETURNING *`,
      [comment_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return;
    });
};
