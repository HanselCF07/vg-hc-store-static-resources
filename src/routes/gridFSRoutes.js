// src/routes/resourceRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMulter = require("../middlewares/uploadMulter");
const resourceController = require("../controllers/gridFSController");

router.post("/upload", authMiddleware(["Full Access", "Management Access"]), uploadMulter.single("file"), resourceController.uploadFile);
router.get("/:product_id", authMiddleware(["Full Access", "Basic Access", "Management Access"]), resourceController.getFilesByProductId);
router.get("/file/:id", authMiddleware(["Full Access", "Basic Access", "Management Access"]), resourceController.getFileById);
router.delete("/file/:id", authMiddleware(["Full Access", "Management Access"]), resourceController.deleteFileById);

module.exports = router;
