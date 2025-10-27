const config = {
    db: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "1234",
      database: process.env.DB_NAME || "bank",
      port: process.env.DB_PORT || 3306,
      ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: true
      } : undefined
    },
    listPerPage: 10,
  };
  module.exports = config;