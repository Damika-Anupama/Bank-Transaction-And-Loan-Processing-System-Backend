const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Saving account ID is required');
    }
    const result = await db.query(`SELECT * FROM saving_account WHERE saving_account_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get saving account by ID: ${err.message}`);
  }
}

async function getByAccountId(id) {
  try {
    if (!id) {
      throw new Error('Account ID is required');
    }
    const result = await db.query(`SELECT * FROM saving_account WHERE account_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByAccountId:', err.message);
    throw new Error(`Failed to get saving account by account ID: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM saving_account LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get saving accounts: ${err.message}`);
  }
}

async function create(saving_account) {
  try {
    if (!saving_account || !saving_account.account_id) {
      throw new Error('Account ID is required');
    }
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
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create saving account: ${err.message}`);
  }
}

async function update(id, saving_account) {
  try {
    if (!id) {
      throw new Error('Saving account ID is required');
    }
    if (!saving_account || !saving_account.account_id) {
      throw new Error('Account ID is required');
    }

    let message = "saving_account not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE saving_account SET account_id=?, saving_account_type=?, interest_rate=?, min_required_balance=?, no_of_withdrawals=? WHERE saving_account_id=?",
        [
          saving_account.account_id,
          saving_account.saving_account_type,
          saving_account.interest_rate,
          saving_account.min_required_balance,
          saving_account.no_of_withdrawals,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "saving_account updated successfully";
      }
    } else {
      message = "Error in updating saving_account";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update saving account: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Saving account ID is required');
    }

    let message = "saving_account not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM saving_account WHERE saving_account_id = ?`, [id]);
      if (result.affectedRows) {
        message = "saving_account deleted successfully!";
      }
    } else {
      message = "Error in deleting saving_account";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete saving account: ${err.message}`);
  }
}

module.exports = {
  getById,
  getByAccountId,
  getMultiple,
  create,
  update,
  remove,
};
