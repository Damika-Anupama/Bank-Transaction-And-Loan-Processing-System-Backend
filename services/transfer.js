const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");

async function getById(id) {
  const result = await db.query(`SELECT * FROM transfer WHERE transfer_id=?`, [
    id,
  ]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM transfer LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function transferFunds(transfer) {
  try {
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
    console.log(error);
    return { message: "There was an error during the transaction!" };
  }
}

async function create(transfer) {
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
}

async function update(id, transfer) {
  let message = "transfer not found";
  if (getById(id)) {
    const result = await db.query(
      "UPDATE transfer SET amount=?, from_account=?, to_account=?, transfer_fee=? WHERE transfer_id=?",
      [
        transfer.amount,
        transfer.from_account,
        transfer.to_account,
        transfer.transfer_fee,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "transfer updated successfully";
    }
  } else {
    message = "Error in updating transfer";
  }

  return { message };
}

async function remove(id) {
  let message = "transfer not found";
  if (getById(id)) {
    const result = await db.query(
      `DELETE FROM transfer WHERE transfer_id=${id}`
    );
    if (result.affectedRows) {
      message = "transfer deleted successfully!";
    }
  } else {
    message = "Error in deleting transfer";
  }

  return { message };
}

module.exports = {
  getById,
  getMultiple,
  transferFunds,
  create,
  update,
  remove,
};
