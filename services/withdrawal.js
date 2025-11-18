const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Withdrawal ID is required');
    }
    const result = await db.query(`SELECT * FROM withdrawal WHERE withdrawal_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get withdrawal by ID: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM withdrawal LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get withdrawals: ${err.message}`);
  }
}

async function create(withdrawal) {
  try {
    if (!withdrawal || !withdrawal.account_id || !withdrawal.amount) {
      throw new Error('Account ID and amount are required');
    }
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
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create withdrawal: ${err.message}`);
  }
}

async function update(id, withdrawal) {
  try {
    if (!id) {
      throw new Error('Withdrawal ID is required');
    }
    if (!withdrawal || !withdrawal.account_id || !withdrawal.amount) {
      throw new Error('Account ID and amount are required');
    }

    let message = "withdrawal not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE withdrawal SET amount=?, account_id=?, withdrawal_time=?, withdrawal_fee=? WHERE withdrawal_id=?",
        [
          withdrawal.amount,
          withdrawal.account_id,
          withdrawal.withdrawal_time,
          withdrawal.withdrawal_fee,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "withdrawal updated successfully";
      }
    } else {
      message = "Error in updating withdrawal";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update withdrawal: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Withdrawal ID is required');
    }

    let message = "withdrawal not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM withdrawal WHERE withdrawal_id = ?`, [id]);
      if (result.affectedRows) {
        message = "withdrawal deleted successfully!";
      }
    } else {
      message = "Error in deleting withdrawal";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete withdrawal: ${err.message}`);
  }
}

module.exports = {
  getById,
  getMultiple,
  create,
  update,
  remove,
};
