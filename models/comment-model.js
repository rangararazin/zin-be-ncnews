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

exports.updateCommentbyId = async (comment_id, inc_votes) => {
  const result = await db.query(
    `
  UPDATE comments
  SET votes = votes + $1
  WHERE comment_id=$2
  RETURNING *;
  `,
    [inc_votes, comment_id]
  );

  if (!result.rows.length) {
    return Promise.reject({ status: 404, msg: "Comment not found" });
  }
  return result.rows[0];
};
