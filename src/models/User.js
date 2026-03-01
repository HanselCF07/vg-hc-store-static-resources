// src/models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgresDB"); 
const UserStatus = require("./UserStatus");
const Role = require("./Role");
const Profile = require("./Profile");


const User = sequelize.define("User", {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_public_key: { type: DataTypes.STRING(255), unique: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  user_status_id: { type: DataTypes.INTEGER },
  role_id: { type: DataTypes.INTEGER },
  profile_id: { type: DataTypes.INTEGER },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  record_status: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, {
  tableName: "user",
  schema: "vg_store",
  timestamps: false
});

// Asociaciones
User.belongsTo(UserStatus, { foreignKey: "user_status_id" });
User.belongsTo(Role, { foreignKey: "role_id" });
User.belongsTo(Profile, { foreignKey: "profile_id" });

module.exports = User;