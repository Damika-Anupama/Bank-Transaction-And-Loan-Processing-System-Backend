const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Manager ID is required');
    }
    const result = await db.query(`SELECT * FROM manager WHERE manager_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get manager by ID: ${err.message}`);
  }
}

async function getManagerDashboardDetailsByEmail(email) {
  try {
    if (!email) {
      throw new Error('Email is required');
    }
    const sql = `
    SELECT u.user_id, m.manager_id, b.branch_name, b.branch_id,
        (SELECT COUNT(*) FROM employee WHERE branch_id = b.branch_id) as num_employees,
        (SELECT COUNT(*) FROM account WHERE branch_id = b.branch_id) as num_accounts
    FROM user u
    JOIN manager m ON u.user_id = m.user_id
    JOIN branch b ON m.manager_id = b.manager_id
    WHERE u.email = ?;
  `;
    const result = await db.query(sql, [email]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getManagerDashboardDetailsByEmail:', err.message);
    throw new Error(`Failed to get manager dashboard details: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM manager LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get managers: ${err.message}`);
  }
}

async function create(manager) {
  try {
    if (!manager || !manager.user_id) {
      throw new Error('User ID is required');
    }
    const result = await db.query(
      "INSERT INTO manager (user_id) VALUES (?)",
      [manager.user_id]
    );
    let message = "Error in creating the manager!";

    if (result.affectedRows) {
      message = "manager created successfully!";
    }

    return { message };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create manager: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Manager ID is required');
    }

    let message = "manager not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM manager WHERE manager_id = ?`, [id]);
      if (result.affectedRows) {
        message = "manager deleted successfully!";
      }
    } else {
      message = "Error in deleting manager";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete manager: ${err.message}`);
  }
}

module.exports = {
  getById,
  getManagerDashboardDetailsByEmail,
  getMultiple,
  create,
  remove,
};
