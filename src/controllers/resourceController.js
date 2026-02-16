const resourceService = require("../services/resourceService");


/* Controlador para subir un archivo con metadatos */
async function uploadFile(req, res) {
  try {
    const metadata = {
      product_id: req.body.product_id,
      product_type: req.body.product_type,
      resource_location: req.body.resource_location || "catalog", // head, background, catalog, carousel
      title: req.body.title || "cover_art",
      status: 1
    };

    const savedFile = await resourceService.addFile(req.file, metadata);

    res.json({
      message: "File uploaded successfully",
      product_id: metadata.product_id,
      //title: metadata.title,
      file: {
        product_type: metadata.product_type,
        resource_location: metadata.resource_location,
        file_id: savedFile._id,
        filename: savedFile.filename,
        mimetype: savedFile.mimetype,
        url: `/api/v1/vg-hc-store/static-resources/file/${savedFile._id}`,
        uploaded_at: savedFile.uploadDate
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/* Controlador para obtener archivos asociados a un productId */
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

/* Controlador para obtener un archivo por su ID */
async function getFileById(req, res) {
  const fileId = req.params.id;
  return resourceService.getFileById(fileId, res);
}

/* Controlador para eliminar archivo por ID */
async function deleteFileById(req, res) {
  try {
    const fileId = req.params.id;
    const result = await resourceService.deleteFileById(fileId);
    res.json(result);
  } catch (err) {
    console.error("Error en resourceController.deleteFileById:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


module.exports = {
  uploadFile,
  getFilesByProductId,
  getFileById,
  deleteFileById
};