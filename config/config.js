const config = {
    db: {
      host: "localhost",
      user: "root",
      password: "1234",
      database: "bank",
      dialect: "mysql",
      pool: {
        max: 15, /* maximum number of connection in pool */
        min: 0, /* minimum number of connection in pool */
        acquire: 30000, /* maximum time, in milliseconds, that pool will try to get connection before throwing error */
        idle: 10000 /* maximum time, in milliseconds, that a connection can be idle before being released */
      }
    },
    listPerPage: 10,
  };
  module.exports = config;