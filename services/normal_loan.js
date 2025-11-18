const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getByLoanDetailId(id) {
  try {
    if (!id) {
      throw new Error('Loan detail ID is required');
    }
    const result = await db.query(`SELECT * FROM normal_loan WHERE loan_detail_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByLoanDetailId:', err.message);
    throw new Error(`Failed to get normal loan by loan detail ID: ${err.message}`);
  }
}

async function getByEmployeeId(id) {
  try {
    if (!id) {
      throw new Error('Employee ID is required');
    }
    const result = await db.query(`SELECT * FROM normal_loan WHERE employee_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByEmployeeId:', err.message);
    throw new Error(`Failed to get normal loan by employee ID: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM normal_loan LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get normal loans: ${err.message}`);
  }
}

async function create(normal_loan) {
  try {
    if (!normal_loan || !normal_loan.loan_detail_id || !normal_loan.employee_id) {
      throw new Error('Loan detail ID and employee ID are required');
    }
    const result = await db.query(
      "INSERT INTO normal_loan (loan_detail_id, employee_id) VALUES (?, ?)",
      [
        normal_loan.loan_detail_id,
        normal_loan.employee_id
      ]
    );

    let message = "Error in creating the normal_loan!";

    if (result.affectedRows) {
      message = "normal_loan created successfully!";
    }

    return { message };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create normal loan: ${err.message}`);
  }
}

async function update(id, normal_loan) {
  try {
    if (!id) {
      throw new Error('Loan detail ID is required');
    }
    if (!normal_loan || !normal_loan.employee_id) {
      throw new Error('Employee ID is required');
    }

    let message = "normal_loan not found";
    const existing = await getByLoanDetailId(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE normal_loan SET employee_id=? WHERE loan_detail_id=?",
        [
          normal_loan.employee_id,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "normal_loan updated successfully";
      }
    } else {
      message = "Error in updating normal_loan";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update normal loan: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Loan detail ID is required');
    }

    let message = "normal_loan not found";
    const existing = await getByLoanDetailId(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM normal_loan WHERE loan_detail_id = ?`, [id]);
      if (result.affectedRows) {
        message = "normal_loan deleted successfully!";
      }
    } else {
      message = "Error in deleting normal_loan";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete normal loan: ${err.message}`);
  }
}

module.exports = {
  getByLoanDetailId,
  getByEmployeeId,
  getMultiple,
  create,
  update,
  remove,
};
