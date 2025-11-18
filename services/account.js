const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Account ID is required');
    }
    const result = await db.query(`SELECT * FROM account WHERE account_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get account by ID: ${err.message}`);
  }
}
async function getSavingAccountsByUserId(id) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }
    const result = await db.query(
      "SELECT s.saving_account_id, a.account_type, a.amount FROM account as a inner join saving_account as s WHERE a.account_id = s.account_id AND a.user_id = ? AND a.saving_type = 'SAVING'",
      [id]
    );
    return { result };
  } catch (err) {
    console.error('Error in getSavingAccountsByUserId:', err.message);
    throw new Error(`Failed to get saving accounts: ${err.message}`);
  }
}
async function getByUserId(id) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }
    const result = await db.query(`
    SELECT a.account_id, a.saving_type, b.branch_name, a.amount, a.account_type
    FROM account a
    INNER JOIN branch b ON a.branch_id = b.branch_id
    WHERE user_id = ?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByUserId:', err.message);
    throw new Error(`Failed to get accounts by user ID: ${err.message}`);
  }
}
async function getTransactionTableData(id) {
  try {
    if (!id) {
      throw new Error('Account ID is required');
    }
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
  } catch (err) {
    console.error('Error in getTransactionTableData:', err.message);
    throw new Error(`Failed to get transaction table data: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM account LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get accounts: ${err.message}`);
  }
}
async function create(account) {
  try {
    if (!account || !account.user_id || !account.branch_id) {
      throw new Error('User ID and Branch ID are required');
    }
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
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create account: ${err.message}`);
  }
}

async function update(id, account) {
  try {
    if (!id) {
      throw new Error('Account ID is required');
    }
    if (!account || !account.user_id || !account.branch_id) {
      throw new Error('User ID and Branch ID are required');
    }

    let message = "account not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE account SET user_id=?, branch_id=?, account_type=?, amount=?, created_date=? WHERE account_id=?",
        [
          account.user_id,
          account.branch_id,
          account.account_type,
          account.amount,
          account.created_date,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "account updated successfully";
      }
    } else {
      message = "Error in updating account";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update account: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Account ID is required');
    }

    let message = "account not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM account WHERE account_id = ?`, [id]);
      if (result.affectedRows) {
        message = "account deleted successfully!";
      }
    } else {
      message = "Error in deleting account";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete account: ${err.message}`);
  }
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
