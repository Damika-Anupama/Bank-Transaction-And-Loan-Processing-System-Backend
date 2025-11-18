const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Employee ID is required');
    }
    const result = await db.query(`SELECT * FROM employee WHERE employee_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get employee by ID: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM employee LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get employees: ${err.message}`);
  }
}

async function create(employee) {
  try {
    if (!employee || !employee.user_id || !employee.branch_id) {
      throw new Error('User ID and Branch ID are required');
    }
    const result = await db.query(
      "INSERT INTO employee (user_id, branch_id) VALUES (?, ?)",
      [
        employee.user_id,
        employee.branch_id
      ]
    );

    let message = "Error in creating the employee!";

    if (result.affectedRows) {
      message = "employee created successfully!";
    }

    return { message };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create employee: ${err.message}`);
  }
}

async function update(id, employee) {
  try {
    if (!id) {
      throw new Error('Employee ID is required');
    }
    if (!employee || !employee.user_id || !employee.branch_id) {
      throw new Error('User ID and Branch ID are required');
    }

    let message = "employee not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE employee SET user_id=?, branch_id=? WHERE employee_id=?",
        [
          employee.user_id,
          employee.branch_id,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "employee updated successfully";
      }
    } else {
      message = "Error in updating employee";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update employee: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Employee ID is required');
    }

    let message = "employee not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM employee WHERE employee_id = ?`, [id]);
      if (result.affectedRows) {
        message = "employee deleted successfully!";
      }
    } else {
      message = "Error in deleting employee";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete employee: ${err.message}`);
  }
}

module.exports = {
  getById,
  getMultiple,
  create,
  update,
  remove,
};
