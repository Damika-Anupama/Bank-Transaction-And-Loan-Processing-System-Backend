const db = require('./db');
const helper = require('../helper');
const config = require('../config/config');

async function getById(id){
  const result = await db.query(
    `SELECT * FROM manager WHERE manager_id=?`,[id]
  );

  const data = helper.emptyOrRows(result);

  return {data};
}


async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM manager LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
async function create(manager){
  const result = await db.query(
    "INSERT INTO manager (user_id) VALUES (?)", [
        manager.user_id,
        
    ]
);
  
    let message = 'Error in creating the manager!';
  
    if (result.affectedRows) {
      message = 'manager created successfully!';
    }
  
    return {message};
  }

async function update(id, manager){
  let message = '';
  const result = await db.query(
    'UPDATE manager SET user_id = ? WHERE manager_id = ?',
     [manager.user_id ,id], function (error, results, fields) {
    if (error) throw error;
      message = 'Error in updating Manager';
  });

  if (result.affectedRows) {
    message = 'Manager updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM manager WHERE manager_id=${id}`
  );

  let message = 'Error in deleting Manager';

  if (result.affectedRows) {
    message = 'Manager deleted successfully!';
  }

  return {message};
}

module.exports = {
  getById,
  getMultiple,
  create,
  update,
  remove
}