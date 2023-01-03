const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM branch WHERE branch_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByManagerId(manager_id) {
  const result = await db.query(`SELECT * FROM branch WHERE manager_id=?`, [
    manager_id,
  ]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM branch LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(branch) {
  let message = "";
    const result = await db.query(
      "INSERT INTO branch (branch_name, branch_type, address, manager_id) VALUES (?, ?, ?, ?)",
      [
        branch.branch_name,
        branch.branch_type,
        branch.address,
        branch.manager_id,
      ]
    );
    if (result.affectedRows) {
      message = "branch created successfully!";
    } else {
      message = "Error creating the branch!";
    }
  return { message };
}

async function update(id, branch) {
  let message = "branch not found";
  if (getById(id)) {
    const result = await db.query(
      "UPDATE branch SET branch_name = ?, branch_type = ?, address = ?, manager_id = ? WHERE branch_id = ?",
      [
        branch.branch_name,
        branch.branch_type,
        branch.address,
        branch.manager_id,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "branch updated successfully";
    }
  } else {
    message = "Error in updating branch";
  }

  return { message };
}

async function remove(id) {
  let message = "branch not found";
  if (getById(id)) {
    const result = await db.query(`DELETE FROM branch WHERE branch_id=${id}`);
    if (result.affectedRows) {
      message = "branch deleted successfully!";
    }
  } else {
    message = "Error in deleting branch";
  }

  return { message };
}

module.exports = {
  getById,
  getByManagerId,
  getMultiple,
  create,
  update,
  remove,
};
