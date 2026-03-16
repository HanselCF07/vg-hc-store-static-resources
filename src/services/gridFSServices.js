const gridFSRepository = require("../repositories/gridFSRepository");


/* Service for handling resource logic (files) */
async function addFile(file, metadata) {
  return await gridFSRepository.addFileToGridFS(file, metadata);
}


/* Service to obtain files associated with a productId */
async function getFilesByProductId(productId, productType, resourceLocation) {
  try {
    const files = await gridFSRepository.getFilesByProductId(productId, productType, resourceLocation);

    return files.map(file => ({
      product_type: file.metadata?.product_type || "unknown",
      resource_location: file.metadata?.resource_location || "unknown",
      file_id: file._id.toString(),
      filename: file.filename,
      title: file.metadata?.title || file.filename,
      mimetype: file.metadata?.mimetype,
      url: `/api/v1/vg-hc-store/static-resources/public/gfs/file/${file._id}`,
      uploaded_at: file.uploadDate
    }));
  } catch (err) {
    console.error("Error en resourceService.getFilesByProductId:", err);
    throw new Error("Error al obtener archivos");
  }
}


/* Service to obtain a file by your ID */
async function getFileById(fileId, res) {
  try {
    const downloadStream = gridFSRepository.getFileStreamById(fileId);

    // Stream error handling
    downloadStream.on("error", (err) => {
      console.error("Error al descargar archivo:", err);
      res.status(404).json({ error: "Archivo no encontrado" });
    });

    // Direct pipe to response
    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error en resourceService.getFileById:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


/* Service to delete files by ID */
async function deleteFileById(fileId) {
  try {
    await gridFSRepository.deleteFileById(fileId);
    return { message: "Archivo eliminado correctamente", file_id: fileId };
  } catch (err) {
    console.error("Error en resourceService.deleteFileById:", err);
    throw new Error("Error al eliminar archivo");
  }
}


module.exports = {
  addFile,
  getFilesByProductId,
  getFileById,
  deleteFileById
};
