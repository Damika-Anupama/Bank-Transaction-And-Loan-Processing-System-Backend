const mysql = require("mysql2/promise");
const config = require("../config/config");

async function query(sql, params) {
  let connection = await mysql.createConnection(config.db);
  let [results] = [];
  try {
    // start a transaction
    await connection.beginTransaction();
    [results] = await connection.execute(sql, params);
    // commit the transaction
    await connection.commit();
  } catch (err) {
    // rollback the transaction
    await connection.rollback();
    throw err;
  } finally {
    // release the connection
    await connection.end();
  }

  return results;
}

module.exports = {
  query,
};
