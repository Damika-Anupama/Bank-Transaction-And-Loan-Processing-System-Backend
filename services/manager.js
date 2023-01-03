const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM manager WHERE manager_id=?`, [
    id,
  ]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM manager LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(manager) {
  const result = await db.query(
    "INSERT INTO manager (user_id) VALUES (?)",
    manager.user_id
  );
  let message = "Error in creating the manager!";

  if (result.affectedRows) {
    message = "manager created successfully!";
  }

  return { message };
}
async function remove(id) {
  let message = "manager not found";
  if (getById(id)) {
    const result = await db.query(`DELETE FROM manager WHERE manager_id=${id}`);
    if (result.affectedRows) {
      message = "manager deleted successfully!";
    }
  } else {
    message = "Error in deleting manager";
  }

  return { message };
}

module.exports = {
  getById,
  getMultiple,
  create,
  remove,
};
