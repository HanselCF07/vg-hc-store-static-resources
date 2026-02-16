const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

const upload = multer(); // usa memoria temporal

// Todas las rutas de Resource están protegidas con token
router.post("/upload", authMiddleware, upload.single("file"), resourceController.uploadFile);
router.get("/:product_id", authMiddleware, resourceController.getFilesByProductId);
router.get("/file/:id", authMiddleware, resourceController.getFileById);


module.exports = router;
