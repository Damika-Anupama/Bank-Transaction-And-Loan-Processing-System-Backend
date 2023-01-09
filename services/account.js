const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM account WHERE account_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getSavingAccountsByUserId(id) {

  const result = await db.query(
    "SELECT account_id, account_type, amount FROM account WHERE user_id = ? AND saving_type = 'SAVING'",
    [id]
    );

  return { result };
}
async function getByUserId(id) {
  const result = await db.query(`
  SELECT a.account_id, a.saving_type, b.branch_name, a.amount, a.account_type
  FROM account a
  INNER JOIN branch b ON a.branch_id = b.branch_id
  WHERE user_id = ?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getTransactionTableData(id) {
  const result = await db.query(
    `
    SELECT amount, transferd_time AS date, 'transfer' AS type,
      IF(to_account = ?, 'up', 'down') AS status,
      transfer_id AS data, sender_remarks
    FROM transfer
    WHERE to_account = ? OR from_account = ?
    UNION
    SELECT amount + withdrawal_fee AS amount, withdrawal_time AS date, 'withdrawal' AS type,
      'down' AS status, withdrawal_id AS data, NULL AS sender_remarks
    FROM withdrawal
    WHERE account_id = ?
    ORDER BY date DESC
    `,
    [id, id, id, id]
  );

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
  getSavingAccountsByUserId,
  getByUserId,
  getTransactionTableData,  
  getMultiple,
  create,
  update,
  remove,
};
