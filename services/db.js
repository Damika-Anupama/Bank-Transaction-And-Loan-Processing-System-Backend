const mysql = require("mysql2/promise");
const config = require("../config/config");

async function query(sql, params) {
  let connection = await mysql.createConnection(config.db);
  let [results] = [];
  try {
    // start a transaction
    await connection.beginTransaction();
    [results] = await connection.execute(sql, params);
    // commit the transaction
    await connection.commit();
  } catch (err) {
    // rollback the transaction
    await connection.rollback();
    throw err;
  } finally {
    // release the connection
    await connection.end();
  }

  return results;
}

async function testConnection() {
  let connection;
  try {
    console.log('🔄 Testing database connection...');
    console.log(`   Host: ${config.db.host}:${config.db.port}`);
    console.log(`   Database: ${config.db.database}`);
    console.log(`   User: ${config.db.user}`);

    connection = await mysql.createConnection(config.db);

    // Test the connection with a simple query
    await connection.execute('SELECT 1');

    console.log('✅ Database connection established successfully!\n');
    return true;
  } catch (err) {
    console.error('\n❌ DATABASE CONNECTION FAILED!');
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.error(`Error: ${err.message}`);
    console.error(`Code: ${err.code}`);

    if (err.code === 'ECONNREFUSED') {
      console.error('\n💡 Possible solutions:');
      console.error('   1. Make sure MySQL server is running');
      console.error('   2. Check if MySQL is listening on the correct port');
      console.error('   3. Verify firewall settings');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Possible solutions:');
      console.error('   1. Check database username and password in .env file');
      console.error('   2. Verify user has proper permissions');
      console.error('   3. Make sure user is allowed to connect from this host');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Possible solutions:');
      console.error('   1. Check if database name is correct');
      console.error('   2. Make sure the database exists');
      console.error('   3. Create the database if it doesn\'t exist');
    }

    console.error('\n📝 Current configuration:');
    console.error(`   DB_HOST: ${config.db.host}`);
    console.error(`   DB_PORT: ${config.db.port}`);
    console.error(`   DB_USER: ${config.db.user}`);
    console.error(`   DB_NAME: ${config.db.database}`);
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    return false;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

module.exports = {
  query,
  testConnection,
};
