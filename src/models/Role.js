// src/models/Role.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgresDB"); 


const Role = sequelize.define("Role", {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
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
  tableName: "role",
  schema: "vg_store",
  timestamps: false
});

module.exports = Role;