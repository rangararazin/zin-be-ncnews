const db = require("../db/connection.js");
const { checkArticleExist } = require("../utils/db.js");

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

exports.selectArticlebyId = (article_id) => {
  return db
    .query(
      `
      SELECT articles.author,title,article_id,body, topic,created_at,votes 
      FROM articles
      JOIN users ON users.username=articles.author
      WHERE article_id = $1`,
      [article_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }

      return result.rows[0];
    });
};

exports.selectCommentbyArticle = (article_id) => {
  return checkArticleExist(article_id)
    .then(() => {
      return db.query(
        `
         SELECT comments.comment_id,votes,created_at ,comments.author,body
         FROM comments
         JOIN users ON users.username=comments.author   
         WHERE article_id =$1
         GROUP BY article_id,comments.comment_id
         ORDER BY created_at DESC`,
        [article_id]
      );
    })
    .then((result) => {
      return result.rows;
    });
};
