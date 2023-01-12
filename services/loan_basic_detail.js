const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM loan_basic_detail WHERE loan_basic_detail_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByUserId(id) {
  const result = await db.query(`SELECT * FROM loan_basic_detail WHERE customer_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM loan_basic_detail LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(loan_basic_detail) {
  let loan_basic_detail_id = '';
  const result = await db.query(
    "INSERT INTO loan_basic_detail (amount, customer_id, is_approved, starting_date, duration_days, interest, loan_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      loan_basic_detail.amount,
      loan_basic_detail.customer_id,
      loan_basic_detail.is_approved,
      loan_basic_detail.starting_date,
      loan_basic_detail.duration_days,
      loan_basic_detail.interest,
      loan_basic_detail.loan_type
    ],
    function (error, results, fields) {
      if (error) throw error;
    }
    );

  let message = "Error in creating the loan_basic_detail!";
  
  if (result.affectedRows) {
    loan_basic_detail_id = result.insertId;
    message = "loan_basic_detail created successfully!";
  }

  return { message, loan_basic_detail_id };
}

async function update(id, loan_basic_detail) {
  let message = "loan_basic_detail not found";
  if (getById(id)) {
    const result = await db.query(
      "UPDATE loan_basic_detail SET amount=?, customer_id=?, is_approved=?, start_date=?, duration_days=?, interest=?, loan_type=? WHERE loan_basic_detail_id=?",
      [
        loan_basic_detail.amount,
        loan_basic_detail.customer_id,
        loan_basic_detail.is_approved,
        loan_basic_detail.start_date,
        loan_basic_detail.duration_days,
        loan_basic_detail.interest,
        loan_basic_detail.loan_type,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "loan_basic_detail updated successfully";
    }
  } else {
    message = "Error in updating loan_basic_detail";
  }

  return { message };
}

async function remove(id) {
  let message = "loan_basic_detail not found";
  if (getById(id)) {
    const result = await db.query(`DELETE FROM loan_basic_detail WHERE loan_basic_detail_id=${id}`);
    if (result.affectedRows) {
      message = "loan_basic_detail deleted successfully!";
    }
  } else {
    message = "Error in deleting loan_basic_detail";
  }

  return { message };
}

module.exports = {
  getByUserId,
  getById,
  getMultiple,
  create,
  update,
  remove,
};
