const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");
const bcrypt = require("bcrypt");

async function getById(id) {
  const result = await db.query(`SELECT * FROM user WHERE user_id=?`, [id]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByName(username) {
  const result = await db.query(`SELECT * FROM user WHERE username=?`, [
    username,
  ]);

  const data = helper.emptyOrRows(result);

  return { data };
}
async function getByEmail(email) {
  const result = await db.query(`SELECT * FROM user WHERE email=?`, [email]);

  const data = helper.emptyOrRows(result);

  return { data };
}
// get dashboard details
async function getDashboardDetails(email) {
  return await db.query(
    `
    SELECT
    type,
    user_id,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('account_id', account_id, 'branch_name', branch_name, 'account_type', account_type, 'amount', amount, 'saving_type', saving_type)) FROM account INNER JOIN branch ON account.branch_id = branch.branch_id WHERE user_id = (SELECT user_id FROM user WHERE email = ?)) AS accounts,
    username
  FROM user
  WHERE email = ?
  LIMIT 1;  
   `,
    [email, email]
  );
}

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM user LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(user) {
  // convert user.password to hash using bcrypt library
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const result = await db.query(
    "INSERT INTO user (username, password, fullname, type, gender, dob, address, email, contact_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user.username,
      user.password,
      user.fullname,
      user.type,
      user.gender,
      user.dob,
      user.address,
      user.email,
      user.contact_no,
    ]
  );

  let message = "Error in creating the user!";

  if (result.affectedRows) {
    message = "user created successfully!";
  }

  return { message };
}

async function update(id, user) {
  let message = "User not found";
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  if (getById(id)) {
    const result = await db.query(
      "UPDATE user SET username = ?, password = ?, fullname = ?, type = ?, gender = ?, dob = ?, address = ?, email = ?, contact_no = ? WHERE user_id = ?",
      [
        user.username,
        user.password,
        user.fullname,
        user.type,
        user.gender,
        user.dob,
        user.address,
        user.email,
        user.contact_no,
        id,
      ],
      function (error, results, fields) {
        if (error) throw error;
      }
    );
    if (result.affectedRows) {
      message = "User updated successfully";
    }
  } else {
    message = "Error in updating User";
  }

  return { message };
}

async function remove(id) {
  let message = "User not found";
  if (getById(id)) {
    const result = await db.query(`DELETE FROM user WHERE user_id=${id}`);
    if (result.affectedRows) {
      message = "User deleted successfully!";
    }
  } else {
    message = "Error in deleting user";
  }

  return { message };
}

module.exports = {
  getById,
  getByName,
  getByEmail,
  getDashboardDetails,
  getMultiple,
  create,
  update,
  remove,
};
