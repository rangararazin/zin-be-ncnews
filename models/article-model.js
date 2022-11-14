const db = require("../db/connection.js");

exports.selectAricles = () => {
  return db
    .query(
      `
        SELECT articles.author,title,articles.article_id, topic,articles.created_at, 
        articles.votes,
        COUNT(comment_id)AS comment_count FROM articles
        JOIN users ON users.username=articles.author
        JOIN comments ON comments.article_id=articles.article_id
        GROUP BY articles.article_id    
        ORDER BY articles.created_at DESC
         `
    )
    .then((result) => {
      let convertedResult = result.rows.map((element) => {
        let obj = { ...element };
        obj.comment_count = Number(obj.comment_count);
        return obj;
      });

      return convertedResult;
    });
};
