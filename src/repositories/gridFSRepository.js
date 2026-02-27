const Resource = require("../models/Resource");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { Readable } = require("stream");

let gridfsBucket;

// Inicializar GridFSBucket cuando la conexión esté abierta
mongoose.connection.once("open", () => {
  gridfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads"
  });
});


/**
 * Subir archivo a GridFS con metadatos
 */
async function addFileToGridFS(file, metadata) {
  return new Promise((resolve, reject) => {
    const filename = Date.now() + "_" + file.originalname;

    const uploadStream = gridfsBucket.openUploadStream(filename, {
      metadata: {
        ...metadata,
        mimetype: file.mimetype
      }
    });

    // Convertir buffer en stream legible
    const readableFile = new Readable();
    readableFile.push(file.buffer); // Agrega el buffer al stream
    readableFile.push(null); // Indica el final del stream
    readableFile.pipe(uploadStream); // Pipe directo al uploadStream de GridFS

    // Devolver información relevante del archivo subido
    uploadStream.on("finish", () => { 
      resolve({ 
        _id: uploadStream.id,            
        filename: uploadStream.filename,
        metadata: metadata,
        mimetype: file.mimetype,
        uploadDate: new Date()
      });
    });

    // Manejo de errores
    uploadStream.on("error", reject);
  });
}

/**
 * Obtener archivos asociados a un productId
 */
async function getFilesByProductId(productId, productType, resourceLocation) {
  var dict_search = {
    "metadata.product_id": productId
  }

  if (productType) {
    dict_search["metadata.product_type"] = productType;
  }

  if (resourceLocation) {
    dict_search["metadata.resource_location"] = resourceLocation;
  }

  return await gridfsBucket.find(dict_search).toArray();
}


/**
 * Descargar archivo por ID
 */
function getFileStreamById(fileId) {
  const _id = new mongoose.Types.ObjectId(fileId);
  return gridfsBucket.openDownloadStream(_id);
}


/**
 * Eliminar archivo por ID
 */
async function deleteFileById(fileId) {
  const _id = new mongoose.Types.ObjectId(fileId);
  return gridfsBucket.delete(_id); // elimina el archivo de GridFS
}


module.exports = {
  addFileToGridFS,
  getFilesByProductId,
  getFileStreamById,
  deleteFileById
};