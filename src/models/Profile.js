// src/models/Profile.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgresDB"); 

const Profile = sequelize.define("Profile", {
  profile_id: {
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
  tableName: "profile",
  schema: "vg_store",
  timestamps: false
});

module.exports = Profile;