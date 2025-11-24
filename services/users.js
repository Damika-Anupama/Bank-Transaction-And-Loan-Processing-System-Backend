const db = require("./db");
const helper = require("../helper");
const config = require("../config/config");
const bcrypt = require("bcrypt");

async function getById(id) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }
    const result = await db.query(`SELECT * FROM user WHERE user_id=?`, [id]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getById:', err.message);
    throw new Error(`Failed to get user by ID: ${err.message}`);
  }
}
async function getByName(username) {
  try {
    if (!username) {
      throw new Error('Username is required');
    }
    const result = await db.query(`SELECT * FROM user WHERE username=?`, [username]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByName:', err.message);
    throw new Error(`Failed to get user by name: ${err.message}`);
  }
}
async function getByEmail(email) {
  try {
    if (!email) {
      throw new Error('Email is required');
    }
    const result = await db.query(`SELECT * FROM user WHERE email=?`, [email]);
    const data = helper.emptyOrRows(result);
    return { data };
  } catch (err) {
    console.error('Error in getByEmail:', err.message);
    throw new Error(`Failed to get user by email: ${err.message}`);
  }
}
// get dashboard details
async function getDashboardDetails(email) {
  try {
    if (!email) {
      throw new Error('Email is required');
    }
    const result = await db.query(
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
    return result;
  } catch (err) {
    console.error('Error in getDashboardDetails:', err.message);
    throw new Error(`Failed to get dashboard details: ${err.message}`);
  }
}

async function getCustomerDetails(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    // Use string interpolation for LIMIT as MySQL prepared statements don't support placeholders for LIMIT
    const rows = await db.query(
      `SELECT * FROM user WHERE type = ? LIMIT ${offset}, ${config.listPerPage}`,
      ['CUSTOMER']
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getCustomerDetails:', err.message);
    throw new Error(`Failed to get customer details: ${err.message}`);
  }
}
async function getMultiple(page = 1) {
  try {
    const offset = helper.getOffset(page, config.listPerPage);
    // Use string interpolation for LIMIT as MySQL prepared statements don't support placeholders for LIMIT
    const rows = await db.query(
      `SELECT * FROM user LIMIT ${offset}, ${config.listPerPage}`,
      []
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };
    return { data, meta };
  } catch (err) {
    console.error('Error in getMultiple:', err.message);
    throw new Error(`Failed to get users: ${err.message}`);
  }
}
async function create(user) {
  try {
    if (!user || !user.username || !user.password || !user.email) {
      throw new Error('Username, password, and email are required');
    }
    let userId = 0;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
    const result = await db.query(
      "INSERT INTO user (username, password, fullname, type, gender, dob, address, email, contact_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.username,
        password,
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
      userId = result.insertId;
      message = "user created successfully!";
    }

    return { message, userId };
  } catch (err) {
    console.error('Error in create:', err.message);
    throw new Error(`Failed to create user: ${err.message}`);
  }
}

async function update(id, user) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }
    if (!user || !user.username || !user.email) {
      throw new Error('Username and email are required');
    }

    let message = "User not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      // If password is provided, hash it. Otherwise, keep existing password
      let updateQuery;
      let updateParams;

      if (user.password && user.password.trim().length > 0) {
        // Update with new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        updateQuery = "UPDATE user SET username = ?, password = ?, fullname = ?, type = ?, gender = ?, dob = ?, address = ?, email = ?, contact_no = ? WHERE user_id = ?";
        updateParams = [
          user.username,
          hashedPassword,
          user.fullname || existing.data[0].fullname,
          user.type || existing.data[0].type,
          user.gender || existing.data[0].gender,
          user.dob || existing.data[0].dob,
          user.address || existing.data[0].address,
          user.email,
          user.contact_no || existing.data[0].contact_no,
          id,
        ];
      } else {
        // Update without changing password
        updateQuery = "UPDATE user SET username = ?, fullname = ?, type = ?, gender = ?, dob = ?, address = ?, email = ?, contact_no = ? WHERE user_id = ?";
        updateParams = [
          user.username,
          user.fullname || existing.data[0].fullname,
          user.type || existing.data[0].type,
          user.gender || existing.data[0].gender,
          user.dob || existing.data[0].dob,
          user.address || existing.data[0].address,
          user.email,
          user.contact_no || existing.data[0].contact_no,
          id,
        ];
      }

      const result = await db.query(updateQuery, updateParams);
      if (result.affectedRows) {
        message = "User updated successfully";
      }
    } else {
      message = "Error in updating User";
    }

    return { message };
  } catch (err) {
    console.error('Error in update:', err.message);
    throw new Error(`Failed to update user: ${err.message}`);
  }
}

async function remove(id) {
  try {
    if (!id) {
      throw new Error('User ID is required');
    }

    let message = "User not found";
    const existing = await getById(id);

    if (existing && existing.data && existing.data.length > 0) {
      const result = await db.query(`DELETE FROM user WHERE user_id = ?`, [id]);
      if (result.affectedRows) {
        message = "User deleted successfully!";
      }
    } else {
      message = "Error in deleting user";
    }

    return { message };
  } catch (err) {
    console.error('Error in remove:', err.message);
    throw new Error(`Failed to delete user: ${err.message}`);
  }
}

module.exports = {
  getById,
  getByName,
  getByEmail,
  getDashboardDetails,
  getCustomerDetails,
  getMultiple,
  create,
  update,
  remove,
};
