// src/middlewares/upload.js
const multer = require("multer");

const storage = multer.memoryStorage();
const uploadMulter = multer({ storage });

module.exports = uploadMulter;