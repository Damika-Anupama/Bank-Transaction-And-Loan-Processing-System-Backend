const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('Loan basic detail ID is required');
    }
    const result = await db.query(`SELECT * FROM loan_basic_detail WHERE loan_basic_detail_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get loan basic detail by ID: ${err.message}`);
  }
}

async function getByUserId(id) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }
    const result = await db.query(`SELECT * FROM loan_basic_detail WHERE customer_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByUserId:', err.message);
    throw new Error(`Failed to get loan basic details by user ID: ${err.message}`);
  }
}

async function getUnapprovedLoans() {
  try {
    const rows = await db.query(
      `SELECT * FROM loan_basic_detail where is_approved = 0`
    );
    const data = helper.emptyOrRows(rows);
    return { data };
  } catch (err) {
    console.error('Error in getUnapprovedLoans:', err.message);
    throw new Error(`Failed to get unapproved loans: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM loan_basic_detail LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get loan basic details: ${err.message}`);
  }
}

async function create(loan_basic_detail) {
  try {
    if (!loan_basic_detail || !loan_basic_detail.customer_id || !loan_basic_detail.amount) {
      throw new Error('Customer ID and amount are required');
    }
    let loan_basic_detail_id = '';
    const result = await db.query(
      "INSERT INTO loan_basic_detail (amount, customer_id, is_approved, starting_date, duration_days, interest, loan_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        loan_basic_detail.amount,
        loan_basic_detail.customer_id,
        loan_basic_detail.is_approved,
        loan_basic_detail.starting_date,
        loan_basic_detail.duration_days,
        loan_basic_detail.interest,
        loan_basic_detail.loan_type
      ]
    );

    let message = "Error in creating the loan_basic_detail!";

    if (result.affectedRows) {
      loan_basic_detail_id = result.insertId;
      message = "loan_basic_detail created successfully!";
    }

    return { message, loan_basic_detail_id };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create loan basic detail: ${err.message}`);
  }
}

async function update(id, loan_basic_detail) {
  try {
    if (!id) {
      throw new Error('Loan basic detail ID is required');
    }
    if (!loan_basic_detail || !loan_basic_detail.customer_id || !loan_basic_detail.amount) {
      throw new Error('Customer ID and amount are required');
    }

    let message = "loan_basic_detail not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE loan_basic_detail SET amount=?, customer_id=?, is_approved=?, start_date=?, duration_days=?, interest=?, loan_type=? WHERE loan_basic_detail_id=?",
        [
          loan_basic_detail.amount,
          loan_basic_detail.customer_id,
          loan_basic_detail.is_approved,
          loan_basic_detail.start_date,
          loan_basic_detail.duration_days,
          loan_basic_detail.interest,
          loan_basic_detail.loan_type,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "loan_basic_detail updated successfully";
      }
    } else {
      message = "Error in updating loan_basic_detail";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update loan basic detail: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Loan basic detail ID is required');
    }

    let message = "loan_basic_detail not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM loan_basic_detail WHERE loan_basic_detail_id = ?`, [id]);
      if (result.affectedRows) {
        message = "loan_basic_detail deleted successfully!";
      }
    } else {
      message = "Error in deleting loan_basic_detail";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete loan basic detail: ${err.message}`);
  }
}

module.exports = {
  getByUserId,
  getById,
  getUnapprovedLoans,
  getMultiple,
  create,
  update,
  remove,
};
