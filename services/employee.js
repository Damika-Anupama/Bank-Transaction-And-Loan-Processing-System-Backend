const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM employee WHERE employee_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM employee LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(employee) {
  const result = await db.query(
    "INSERT INTO employee (user_id, branch_id) VALUES (?, ?)",
    [
      employee.user_id,
      employee.branch_id
    ]
  );

  let message = "Error in creating the employee!";

  if (result.affectedRows) {
    message = "employee created successfully!";
  }

  return { message };
}

async function update(id, employee) {
  let message = "employee not found";
  if (getById(id)) {
    const result = await db.query(
      "UPDATE employee SET user_id=?, branch_id=? WHERE id=?",
      [
        employee.user_id,
        employee.branch_id,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "employee updated successfully";
    }
  } else {
    message = "Error in updating employee";
  }

  return { message };
}

async function remove(id) {
  let message = "employee not found";
  if (getById(id)) {
    const result = await db.query(`DELETE FROM employee WHERE employee_id=${id}`);
    if (result.affectedRows) {
      message = "employee deleted successfully!";
    }
  } else {
    message = "Error in deleting employee";
  }

  return { message };
}

module.exports = {
  getById,
  getMultiple,
  create,
  update,
  remove,
};
