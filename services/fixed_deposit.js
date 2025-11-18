const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Fixed deposit ID is required');
    }
    const result = await db.query(`SELECT * FROM fixed_deposit WHERE fd_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get fixed deposit by ID: ${err.message}`);
  }
}

async function getFDsByUserId(id) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }
    //get account_id values from account table where user_id = id and account_type = 'SAVING'
    // get saving_account_id values from saving_account table relevant to the above account_id values
    // get all values from fixed_deposit table relevant to the above saving_account_id values
    const result = await db.query(
      `SELECT * FROM fixed_deposit WHERE saving_account_id IN (SELECT saving_account_id FROM saving_account WHERE account_id IN (SELECT account_id FROM account WHERE user_id=? AND saving_type='SAVING'))`,
      [id]
    );
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getFDsByUserId:', err.message);
    throw new Error(`Failed to get fixed deposits by user ID: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM fixed_deposit LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get fixed deposits: ${err.message}`);
  }
}

async function create(fixed_deposit) {
  try {
    if (!fixed_deposit || !fixed_deposit.saving_account_id || !fixed_deposit.amount) {
      throw new Error('Saving account ID and amount are required');
    }
    console.log(fixed_deposit);
    const result = await db.query(
      "INSERT INTO fixed_deposit (saving_account_id, duration, rate_per_annum, fd_opening_date, amount) VALUES (?, ?, ?, ?, ?)",
      [
        fixed_deposit.saving_account_id,
        fixed_deposit.duration,
        fixed_deposit.rate_per_annum,
        fixed_deposit.fd_opening_date,
        fixed_deposit.amount,
      ]
    );

    let message = "Error in creating the fixed_deposit!";

    if (result.affectedRows) {
      message = "fixed_deposit created successfully!";
    }

    return { message };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create fixed deposit: ${err.message}`);
  }
}

async function update(id, fixed_deposit) {
  try {
    if (!id) {
      throw new Error('Fixed deposit ID is required');
    }
    if (!fixed_deposit || !fixed_deposit.saving_account_id || !fixed_deposit.amount) {
      throw new Error('Saving account ID and amount are required');
    }

    let message = "fixed_deposit not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE fixed_deposit SET user_id=?, saving_account_id=?, duration=?, rate_per_annum=?, fd_opening_date=?, amount=? WHERE fd_id=?",
        [
          fixed_deposit.user_id,
          fixed_deposit.saving_account_id,
          fixed_deposit.duration,
          fixed_deposit.rate_per_annum,
          fixed_deposit.fd_opening_date,
          fixed_deposit.amount,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "fixed_deposit updated successfully";
      }
    } else {
      message = "Error in updating fixed_deposit";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update fixed deposit: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Fixed deposit ID is required');
    }

    let message = "fixed_deposit not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        `DELETE FROM fixed_deposit WHERE fd_id = ?`,
        [id]
      );
      if (result.affectedRows) {
        message = "fixed_deposit deleted successfully!";
      }
    } else {
      message = "Error in deleting fixed_deposit";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete fixed deposit: ${err.message}`);
  }
}

module.exports = {
  getById,
  getFDsByUserId,
  getMultiple,
  create,
  update,
  remove,
};
