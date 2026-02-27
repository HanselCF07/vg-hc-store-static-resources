// src/routes/resourceRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMulter = require("../middlewares/uploadMulter");
const resourceController = require("../controllers/gridFSController");

router.post("/upload", authMiddleware, uploadMulter.single("file"), resourceController.uploadFile);
router.get("/:product_id", authMiddleware, resourceController.getFilesByProductId);
router.get("/file/:id", authMiddleware, resourceController.getFileById);
router.delete("/file/:id", authMiddleware, resourceController.deleteFileById);

module.exports = router;
