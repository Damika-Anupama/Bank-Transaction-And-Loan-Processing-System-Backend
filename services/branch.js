const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Branch ID is required');
    }
    const result = await db.query(`SELECT * FROM branch WHERE branch_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get branch by ID: ${err.message}`);
  }
}

async function getByManagerId(manager_id) {
  try {
    if (!manager_id) {
      throw new Error('Manager ID is required');
    }
    const result = await db.query(`SELECT * FROM branch WHERE manager_id=?`, [manager_id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByManagerId:', err.message);
    throw new Error(`Failed to get branch by manager ID: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM branch LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get branches: ${err.message}`);
  }
}

async function create(branch) {
  try {
    if (!branch || !branch.branch_name) {
      throw new Error('Branch name is required');
    }
    let message = "";
    const result = await db.query(
      "INSERT INTO branch (branch_name, branch_type, address, manager_id) VALUES (?, ?, ?, ?)",
      [
        branch.branch_name,
        branch.branch_type,
        branch.address,
        branch.manager_id
      ]
    );
    if (result.affectedRows) {
      message = "branch created successfully!";
    } else {
      message = "Error creating the branch!";
    }
    return { message };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create branch: ${err.message}`);
  }
}

async function update(id, branch) {
  try {
    if (!id) {
      throw new Error('Branch ID is required');
    }
    if (!branch || !branch.branch_name) {
      throw new Error('Branch name is required');
    }

    let message = "branch not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE branch SET branch_name = ?, branch_type = ?, address = ?, manager_id = ? WHERE branch_id = ?",
        [
          branch.branch_name,
          branch.branch_type,
          branch.address,
          branch.manager_id,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "branch updated successfully";
      }
    } else {
      message = "Error in updating branch";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update branch: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Branch ID is required');
    }

    let message = "branch not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM branch WHERE branch_id = ?`, [id]);
      if (result.affectedRows) {
        message = "branch deleted successfully!";
      }
    } else {
      message = "Error in deleting branch";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete branch: ${err.message}`);
  }
}

module.exports = {
  getById,
  getByManagerId,
  getMultiple,
  create,
  update,
  remove,
};
