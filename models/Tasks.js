const dbconfig = require("../config/config");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = dbconfig.define(
  "Task",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
    },
    task: Sequelize.STRING,
    status: {
      type: DataTypes.ENUM("Completed", "Incomplete"),
      allowNull: false,
      defaultValue: "Incomplete",
    },
    priority: Sequelize.STRING,
  },
  {
    tableName: "Task",
    timestamps: false,
  }
);
