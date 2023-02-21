const dbconfig = require("../config/config");
const Sequelize = require("sequelize");

module.exports = dbconfig.define(
  "Session",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: Sequelize.INTEGER,
    session_id: Sequelize.STRING,
    session_start_at: Sequelize.BIGINT,
    session_end_at: Sequelize.BIGINT
  },
  {
    tableName: "Session",
    timestamps: false,
  }
);
