const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getByLoanDetailId(id) {
  const result = await db.query(`SELECT * FROM normal_loan WHERE loan_detail_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByEmployeeId(id) {
  const result = await db.query(`SELECT * FROM normal_loan WHERE employee_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM normal_loan LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(normal_loan) {
  const result = await db.query(
    "INSERT INTO normal_loan (loan_detail_id, employee_id) VALUES (?, ?)",
    [
      normal_loan.loan_detail_id,
      normal_loan.employee_id
    ]
  );

  let message = "Error in creating the normal_loan!";

  if (result.affectedRows) {
    message = "normal_loan created successfully!";
  }

  return { message };
}

async function update(id, normal_loan) {
  let message = "normal_loan not found";
  if (getByLoanDetailId(id)) {
    const result = await db.query(
      "UPDATE normal_loan SET employee_id=? WHERE loan_detail_id=?",
      [
        normal_loan.employee_id,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "normal_loan updated successfully";
    }
  } else {
    message = "Error in updating normal_loan";
  }

  return { message };
}

async function remove(id) {
  let message = "normal_loan not found";
  if (getByLoanDetailId(id)) {
    const result = await db.query(`DELETE FROM normal_loan WHERE loan_detail_id=${id}`);
    if (result.affectedRows) {
      message = "normal_loan deleted successfully!";
    }
  } else {
    message = "Error in deleting normal_loan";
  }

  return { message };
}

module.exports = {
  getByLoanDetailId,
  getByEmployeeId,
  getMultiple,
  create,
  update,
  remove,
};
