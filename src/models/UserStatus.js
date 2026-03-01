// src/models/UserStatus.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgresDB"); 

const UserStatus = sequelize.define("UserStatus", {
  status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  record_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: "user_status",
  schema: "vg_store",
  timestamps: false
});

module.exports = UserStatus;



