const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM saving_account WHERE saving_account_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByAccountId(id) {
  const result = await db.query(`SELECT * FROM saving_account WHERE account_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM saving_account LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(saving_account) {
  const result = await db.query(
    "INSERT INTO saving_account (account_id, saving_account_type, interest_rate, min_required_balance, no_of_withdrawals) VALUES (?, ?, ?, ?, ?)",
    [
        saving_account.account_id,
        saving_account.saving_account_type,
        saving_account.interest_rate,
        saving_account.min_required_balance,
        saving_account.no_of_withdrawals
    ]
  );

  let message = "Error in creating the saving_account!";

  if (result.affectedRows) {
    message = "saving_account created successfully!";
  }

  return { message };
}

async function update(id, saving_account) {
  let message = "saving_account not found";
  if (getById(id)) {
    const result = await db.query(
      "UPDATE saving_account SET account_id=?, saving_account_type=?, interest_rate=?, min_required_balance=?, no_of_withdrawals=? WHERE saving_account_id=?",
      [
        saving_account.account_id,
        saving_account.saving_account_type,
        saving_account.interest_rate,
        saving_account.min_required_balance,
        saving_account.no_of_withdrawals,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "saving_account updated successfully";
    }
  } else {
    message = "Error in updating saving_account";
  }

  return { message };
}

async function remove(id) {
  let message = "saving_account not found";
  if (getById(id)) {
    const result = await db.query(`DELETE FROM saving_account WHERE saving_account_id=${id}`);
    if (result.affectedRows) {
      message = "saving_account deleted successfully!";
    }
  } else {
    message = "Error in deleting saving_account";
  }

  return { message };
}

module.exports = {
  getById,
  getByAccountId,
  getMultiple,
  create,
  update,
  remove,
};
