const sequelize = require("sequelize");

module.exports = new sequelize("assessment", "root", "admin", {
  host: "localhost",
  dialectOptions: {
    multipleStatements: true,
  },
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
