const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM user LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(user){
    const result = await db.query(
      `INSERT INTO user 
      (username, password, fullname, type, gender, dob, address, email, contact_no) 
      VALUES(
        ${user.username}, 
        ${user.password}, 
        ${user.fullname}, 
        ${user.type}, 
        ${user.gender}, 
        ${user.dob}, 
        ${user.address}, 
        ${user.email}, 
        ${user.contact_no}
        )`
    );
  
    let message = 'Error in creating the user!';
  
    if (result.affectedRows) {
      message = 'user created successfully!';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  create
}