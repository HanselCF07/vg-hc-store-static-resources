const resourceService = require("../services/resourceService");


async function uploadFile(req, res) {
  try {
    const metadata = {
      product_type: req.body.product_type,
      product_id: req.body.product_id,
      title: req.body.title || "cover_art",
      status: 1
    };

    const savedFile = await resourceService.addFile(req.file, metadata);

    res.json({
      message: "File uploaded successfully",
      file: {
        file_id: savedFile._id,
        filename: savedFile.filename,
        url: `/api/v1/vg-hc-store/static-resources/file/${savedFile.file_id}`
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


async function getFilesByProductId(req, res) {
  try {
    const productId = req.params.product_id;
    const files = await resourceService.getFilesByProductId(productId);

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "No se encontraron archivos para este producto" });
    }

    res.json({ product_id: productId, files });
  } catch (err) {
    console.error("Error en resourceController.getFilesByProductId:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


async function getFileById(req, res) {
  const fileId = req.params.id;
  return resourceService.getFileById(fileId, res);
}


module.exports = { uploadFile, getFilesByProductId, getFileById };