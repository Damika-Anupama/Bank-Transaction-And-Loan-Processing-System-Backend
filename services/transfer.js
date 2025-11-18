const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Transfer ID is required');
    }
    const result = await db.query(`SELECT * FROM transfer WHERE transfer_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get transfer by ID: ${err.message}`);
  }
}

async function getTotalTransactions(branch_id) {
  try {
    if (!branch_id) {
      throw new Error('Branch ID is required');
    }
    const sql = `
      SELECT t.*,
          CASE
              WHEN a1.branch_id = ? AND a2.branch_id = ? THEN 'no-change'
              WHEN a1.branch_id = ? THEN 'up'
              WHEN a2.branch_id = ? THEN 'down'
              ELSE 'NA'
          END as direction
      FROM transfer t
      JOIN account a1 ON t.from_account = a1.account_id
      JOIN account a2 ON t.to_account = a2.account_id
      WHERE a1.branch_id = ? OR a2.branch_id = ?;
  `;
    const result = await db.query(sql, [
      branch_id,
      branch_id,
      branch_id,
      branch_id,
      branch_id,
      branch_id,
    ]);
    return { result };
  } catch (err) {
    console.error('Error in getTotalTransactions:', err.message);
    throw new Error(`Failed to get total transactions: ${err.message}`);
  }
}

async function getTotalWithdrawals(branch_id) {
  try {
    if (!branch_id) {
      throw new Error('Branch ID is required');
    }
    const sql = `
      SELECT w.*
      FROM withdrawal w
      JOIN account a ON w.account_id = a.account_id
      WHERE a.branch_id = ?
      `;
    const result = await db.query(sql, [branch_id]);
    return result;
  } catch (err) {
    console.error('Error in getTotalWithdrawals:', err.message);
    throw new Error(`Failed to get total withdrawals: ${err.message}`);
  }
}

async function getLateLoans() {
  try {
    const sql = `
      SELECT *
      FROM loan_installment
      WHERE status = 'unpaid'
    `;
    const result = await db.query(sql);
    return result;
  } catch (err) {
    console.error('Error in getLateLoans:', err.message);
    throw new Error(`Failed to get late loans: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM transfer LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get transfers: ${err.message}`);
  }
}

async function transferFunds(transfer) {
  try {
    if (!transfer || !transfer.from_account || !transfer.to_account || !transfer.amount) {
      throw new Error('From account, to account, and amount are required');
    }
    // insert the transfer into the transfer table
    await db.query(
      "INSERT INTO transfer (amount, from_account, to_account, transaction_fee, sender_remarks, beneficiary_remarks) VALUES (?, ?, ?, ? ,? ,?)",
      [
        transfer.amount,
        transfer.from_account,
        transfer.to_account,
        transfer.transaction_fee,
        transfer.sender_remarks,
        transfer.beneficiary_remarks,
      ]
    );

    // update the from_account amount in the account table
    await db.query(
      "UPDATE account SET amount = amount - ? WHERE account_id = ?",
      [transfer.amount, transfer.from_account]
    );

    // update the to_account amount in the account table
    await db.query(
      "UPDATE account SET amount = amount + ? WHERE account_id = ?",
      [transfer.amount, transfer.to_account]
    );
    return { message: "Transfer created successfully!" };
  } catch (error) {
    console.error('Error in transferFunds:', error.message);
    throw new Error(`There was an error during the transaction: ${error.message}`);
  }
}

async function create(transfer) {
  try {
    if (!transfer || !transfer.from_account || !transfer.to_account || !transfer.amount) {
      throw new Error('From account, to account, and amount are required');
    }
    const result = await db.query(
      "INSERT INTO transfer (amount, from_account, to_account, transaction_fee, sender_remarks, beneficiary_remarks) VALUES (?, ?, ?, ? ,? ,?)",
      [
        transfer.amount,
        transfer.from_account,
        transfer.to_account,
        0,
        transfer.sender_remarks,
        transfer.beneficiary_remarks,
      ]
    );

    let message = "Error in creating the transfer!";

    if (result.affectedRows) {
      message = "transfer created successfully!";
    }

    return { message };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create transfer: ${err.message}`);
  }
}

async function update(id, transfer) {
  try {
    if (!id) {
      throw new Error('Transfer ID is required');
    }
    if (!transfer || !transfer.from_account || !transfer.to_account || !transfer.amount) {
      throw new Error('From account, to account, and amount are required');
    }

    let message = "transfer not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE transfer SET amount=?, from_account=?, to_account=?, transaction_fee=? WHERE transfer_id=?",
        [
          transfer.amount,
          transfer.from_account,
          transfer.to_account,
          transfer.transfer_fee,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "transfer updated successfully";
      }
    } else {
      message = "Error in updating transfer";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update transfer: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Transfer ID is required');
    }

    let message = "transfer not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        `DELETE FROM transfer WHERE transfer_id = ?`,
        [id]
      );
      if (result.affectedRows) {
        message = "transfer deleted successfully!";
      }
    } else {
      message = "Error in deleting transfer";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete transfer: ${err.message}`);
  }
}

module.exports = {
  getTotalTransactions,
  getTotalWithdrawals,
  getLateLoans,
  getById,
  getMultiple,
  transferFunds,
  create,
  update,
  remove,
};
