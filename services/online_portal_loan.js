const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getByLoanDetailId(id) {
  try {
    if (!id) {
      throw new Error('Loan detail ID is required');
    }
    const result = await db.query(`SELECT * FROM online_portal_loan WHERE loan_detail_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByLoanDetailId:', err.message);
    throw new Error(`Failed to get online portal loan by loan detail ID: ${err.message}`);
  }
}

async function getByFixedDepositId(id) {
  try {
    if (!id) {
      throw new Error('Fixed deposit ID is required');
    }
    const result = await db.query(`SELECT * FROM online_portal_loan WHERE fixed_deposit_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByFixedDepositId:', err.message);
    throw new Error(`Failed to get online portal loan by fixed deposit ID: ${err.message}`);
  }
}

async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT * FROM online_portal_loan LIMIT ?, ?`,
      [offset, config.listPerPage]
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get online portal loans: ${err.message}`);
  }
}

async function create(online_portal_loan) {
  try {
    if (!online_portal_loan || !online_portal_loan.loan_detail_id || !online_portal_loan.fixed_deposit_id) {
      throw new Error('Loan detail ID and fixed deposit ID are required');
    }
    const result = await db.query(
      "INSERT INTO online_portal_loan (loan_detail_id, fixed_deposit_id) VALUES (?, ?)",
      [
        online_portal_loan.loan_detail_id,
        online_portal_loan.fixed_deposit_id
      ]
    );

    let message = "Error in creating the online_portal_loan!";

    if (result.affectedRows) {
      message = "online_portal_loan created successfully!";
    }

    return { message };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create online portal loan: ${err.message}`);
  }
}

async function update(id, online_portal_loan) {
  try {
    if (!id) {
      throw new Error('Loan detail ID is required');
    }
    if (!online_portal_loan || !online_portal_loan.fixed_deposit_id) {
      throw new Error('Fixed deposit ID is required');
    }

    let message = "online_portal_loan not found";
    const existing = await getByLoanDetailId(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(
        "UPDATE online_portal_loan SET fixed_deposit_id=? WHERE loan_detail_id=?",
        [
          online_portal_loan.fixed_deposit_id,
          id,
        ]
      );
      if (result.affectedRows) {
        message = "online_portal_loan updated successfully";
      }
    } else {
      message = "Error in updating online_portal_loan";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update online portal loan: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('Loan detail ID is required');
    }

    let message = "online_portal_loan not found";
    const existing = await getByLoanDetailId(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM online_portal_loan WHERE loan_detail_id = ?`, [id]);
      if (result.affectedRows) {
        message = "online_portal_loan deleted successfully!";
      }
    } else {
      message = "Error in deleting online_portal_loan";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete online portal loan: ${err.message}`);
  }
}

module.exports = {
  getByLoanDetailId,
  getByFixedDepositId,
  getMultiple,
  create,
  update,
  remove,
};
