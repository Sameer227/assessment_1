const dbconfig = require("../config/config");
const Sequelize = require("sequelize");

module.exports = dbconfig.define(
  "Login",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  {
    tableName: "Login",
    timestamps: false,
  }
);
