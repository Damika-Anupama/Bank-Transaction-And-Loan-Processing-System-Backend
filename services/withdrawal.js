const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM withdrawal WHERE withdrawal_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM withdrawal LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(withdrawal) {
  const result = await db.query(
    "INSERT INTO withdrawal (amount, account_id, withdrawal_time, withdrawal_fee) VALUES (?, ?, ?, ?)",
    [
      withdrawal.amount,
      withdrawal.account_id,
      withdrawal.withdrawal_time,   
      withdrawal.withdrawal_fee
    ]
  );

  let message = "Error in creating the withdrawal!";

  if (result.affectedRows) {
    message = "withdrawal created successfully!";
  }

  return { message };
}

async function update(id, withdrawal) {
  let message = "withdrawal not found";
  if (getById(id)) {
    const result = await db.query(
      "UPDATE withdrawal SET amount=?, account_id=?, withdrawal_time=?, withdrawal_fee=? WHERE withdrawal_id=?",
      [
        withdrawal.amount,
        withdrawal.account_id,
        withdrawal.withdrawal_time,   
        withdrawal.withdrawal_fee,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "withdrawal updated successfully";
    }
  } else {
    message = "Error in updating withdrawal";
  }

  return { message };
}

async function remove(id) {
  let message = "withdrawal not found";
  if (getById(id)) {
    const result = await db.query(`DELETE FROM withdrawal WHERE withdrawal_id=${id}`);
    if (result.affectedRows) {
      message = "withdrawal deleted successfully!";
    }
  } else {
    message = "Error in deleting withdrawal";
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
