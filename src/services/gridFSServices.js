const gridFSRepository = require("../repositories/gridFSRepository");


/* Servicio para manejar la lógica de recursos (archivos) */
async function addFile(file, metadata) {
  return await gridFSRepository.addFileToGridFS(file, metadata);
}

/* Servicio para obtener archivos asociados a un productId */
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
      url: `/api/v1/vg-hc-store/static-resources/file/${file._id}`,
      uploaded_at: file.uploadDate
    }));
  } catch (err) {
    console.error("Error en resourceService.getFilesByProductId:", err);
    throw new Error("Error al obtener archivos");
  }
}

/* Servicio para obtener un archivo por su ID */
async function getFileById(fileId, res) {
  try {
    const downloadStream = gridFSRepository.getFileStreamById(fileId);

    // Manejo de errores del stream
    downloadStream.on("error", (err) => {
      console.error("Error al descargar archivo:", err);
      res.status(404).json({ error: "Archivo no encontrado" });
    });

    // Pipe directo al response
    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error en resourceService.getFileById:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

/* Servicio para eliminar archivo por ID */
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
