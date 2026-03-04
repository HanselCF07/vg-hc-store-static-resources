// src/routes/resourceRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMulter = require("../middlewares/uploadMulter");
const resourceController = require("../controllers/gridFSController");

router.post("/gfs/upload", authMiddleware(["Full Access", "Management Access"]), uploadMulter.single("file"), resourceController.uploadFile);
router.get("/public/gfs/:product_id", resourceController.getFilesByProductId);
router.get("/public/gfs/file/:id", resourceController.getFileById);
router.delete("/gfs/file/:id", authMiddleware(["Full Access", "Management Access"]), resourceController.deleteFileById);

module.exports = router;
