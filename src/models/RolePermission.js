// src/models/RolePermission.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgresDB"); 
const Role = require("./Role");

const RolePermission = sequelize.define("RolePermission", {
  role_permission_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "role_id"
    }
  },
  permission: {
    type: DataTypes.STRING(100),
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
  tableName: "role_permission",
  schema: "vg_store",
  timestamps: false
});

// Asociación
RolePermission.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(RolePermission, { foreignKey: "role_id" });

module.exports = RolePermission;