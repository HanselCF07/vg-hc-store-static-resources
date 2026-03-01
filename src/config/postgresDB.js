const { Sequelize } = require("sequelize");

// Determinar variables de entorno
const dbConfig = {
  production: { name: process.env.DB_NAME_PRD, user: process.env.DB_USER_PRD, pass: process.env.DB_PASS_PRD, host: process.env.DB_HOST_PRD },
  qas: { name: process.env.DB_NAME_QAS, user: process.env.DB_USER_QAS, pass: process.env.DB_PASS_QAS, host: process.env.DB_HOST_QAS },
  development: { name: process.env.DB_NAME_DEV, user: process.env.DB_USER_DEV, pass: process.env.DB_PASS_DEV, host: process.env.DB_HOST_DEV }
};

const env = process.env.NODE_ENV || "development";
const { name, user, pass, host } = dbConfig[env];

// Crear la INSTANCIA (minúscula por convención)
const sequelize = new Sequelize(name, user, pass, {
  host: host,
  port: 5432,
  dialect: "postgres",
  logging: false,
});

// Exportar la instancia para usarla en los modelos
module.exports = sequelize;
