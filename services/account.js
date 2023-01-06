const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM account WHERE account_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByUserId(id) {
  const result = await db.query(`SELECT * FROM account WHERE user_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM account LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(account) {
  const result = await db.query(
    "INSERT INTO account (user_id, branch_id, account_type, amount, created_date) VALUES (?, ?, ?, ?, ?)",
    [
      account.user_id,
      account.branch_id,
      account.account_type,   
      account.amount,
      account.created_date
    ]
  );

  let message = "Error in creating the account!";

  if (result.affectedRows) {
    message = "account created successfully!";
  }

  return { message };
}

async function update(id, account) {
  let message = "account not found";
  if (getById(id)) {
    const result = await db.query(
      "UPDATE account SET user_id=?, branch_id=?, account_type=?, amount=?, created_date=? WHERE account_id=?",
      [
        account.user_id,
        account.branch_id,
        account.account_type,   
        account.amount,
        account.created_date,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "account updated successfully";
    }
  } else {
    message = "Error in updating account";
  }

  return { message };
}

async function remove(id) {
  let message = "account not found";
  if (getById(id)) {
    const result = await db.query(`DELETE FROM account WHERE account_id=${id}`);
    if (result.affectedRows) {
      message = "account deleted successfully!";
    }
  } else {
    message = "Error in deleting account";
  }

  return { message };
}

module.exports = {
  getById,
  getByUserId,  
  getMultiple,
  create,
  update,
  remove,
};
