const db = require("../db/connection");
const { checkUserExist } = require("../utils/db");

exports.selectUsers = () => {
  return db
    .query(
      `
  SELECT * FROM users`
    )
    .then((result) => {
      return result.rows;
    });
};

exports.selectUserbyUsername = async (username) => {
  await checkUserExist("username", username);

  console.log(typeof username);
  const result = await db.query(
    `
  SELECT * FROM users
  WHERE username=$1;
  `,
    [username]
  );

  return result.rows[0];
};
