const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getByLoanDetailId(id) {
  const result = await db.query(`SELECT * FROM online_portal_loan WHERE loan_detail_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByFixedDepositId(id) {
  const result = await db.query(`SELECT * FROM online_portal_loan WHERE fixed_deposit_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM online_portal_loan LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(online_portal_loan) {
  const result = await db.query(
    "INSERT INTO online_portal_loan (loan_detail_id, fixed_deposit_id) VALUES (?, ?)",
    [
      online_portal_loan.loan_detail_id,
      online_portal_loan.fixed_deposit_id
    ]
  );

  let message = "Error in creating the online_portal_loan!";

  if (result.affectedRows) {
    message = "online_portal_loan created successfully!";
  }

  return { message };
}

async function update(id, online_portal_loan) {
  let message = "online_portal_loan not found";
  if (getByLoanDetailId(id)) {
    const result = await db.query(
      "UPDATE online_portal_loan SET fixed_deposit_id=? WHERE loan_detail_id=?",
      [
        online_portal_loan.fixed_deposit_id,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "online_portal_loan updated successfully";
    }
  } else {
    message = "Error in updating online_portal_loan";
  }

  return { message };
}

async function remove(id) {
  let message = "online_portal_loan not found";
  if (getByLoanDetailId(id)) {
    const result = await db.query(`DELETE FROM online_portal_loan WHERE loan_detail_id=${id}`);
    if (result.affectedRows) {
      message = "online_portal_loan deleted successfully!";
    }
  } else {
    message = "Error in deleting online_portal_loan";
  }

  return { message };
}

module.exports = {
  getByLoanDetailId,
  getByFixedDepositId,
  getMultiple,
  create,
  update,
  remove,
};
