const db = require('./db');
const helper = require('../helper');
const config = require('../config/config');

async function getById(id){
  const result = await db.query(
    `SELECT * FROM loan_basic_detail WHERE loan_basic_detail_id=?`,[id]
  );

  const data = helper.emptyOrRows(result);

  return {data};
}
async function getByCustomerId(customer_id){
  const result = await db.query(
    `SELECT * FROM loan_basic_detail WHERE customer_id=?`,[customer_id]
  );

  const data = helper.emptyOrRows(result);

  return {data};
}

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM loan_basic_detail LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function create(details){
  const result = await db.query(
    "INSERT INTO loan_basic_detail (amount, customer_id, is_approved, starting_date, duration_days, interest, loan_type) VALUES (?, ?, ?, ?, ?, ?, ?)", [
        details.amount,
        details.customer_id,
        details.is_approved,
        details.starting_date,
        details.duration_days,
        details.interest,
        details.loan_type
      
    ]
);
  
    let message = 'Error in creating the Loan Details!';
  
    if (result.affectedRows) {
      message = 'Loan Details created successfully!';
    }
  
    return {message};
  }

async function update(id, details){
  let message = '';
  const result = await db.query(
    'UPDATE loan_basic_detail SET amount = ?, customer_id = ?, is_approved = ?, starting_date = ?, duration_days = ?, interest = ?, loan_type = ? WHERE loan_basic_detail_id = ?',
     [details.amount, details.customer_id, details.is_approved, details.starting_date,details.duration_days, details.interest,details.loan_type, id], function (error, results, fields) {
    if (error) throw error;
      message = 'Error in updating Loan Details';
  });

  if (result.affectedRows) {
    message = 'Loan Details updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM loan_basic_detail WHERE loan_basic_detail_id=${id}`
  );

  let message = 'Error in deleting Loan Details';

  if (result.affectedRows) {
    message = 'Loan Details deleted successfully!';
  }

  return {message};
}

module.exports = {
  getById,
  getByCustomerId,
  getMultiple,
  create,
  update,
  remove
}