const Resource = require("../models/Resource");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { Readable } = require("stream");

let gridfsBucket;


// Initialize GridFSBucket when the connection is open
mongoose.connection.once("open", () => {
  gridfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads"
  });
});


/**
 * Upload file to GridFS with metadata
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

    // Convert buffer into readable stream
    const readableFile = new Readable();
    readableFile.push(file.buffer); // Add the buffer to the stream
    readableFile.push(null); // Indicates the end of the stream
    readableFile.pipe(uploadStream); // Direct pipe to GridFS uploadStream

    // Return relevant information from the uploaded file
    uploadStream.on("finish", () => { 
      resolve({ 
        _id: uploadStream.id,            
        filename: uploadStream.filename,
        metadata: metadata,
        mimetype: file.mimetype,
        uploadDate: new Date()
      });
    });

    // Error handling
    uploadStream.on("error", reject);
  });
}


/**
 * Retrieve files associated with a productId
 */
async function getFilesByProductId(productId, productType, resourceLocation) {
  var dict_search = {
    "metadata.product_id": productId,
    "metadata.status": 1
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
 * Download file by ID
 */
function getFileStreamById(fileId) {
  const _id = new mongoose.Types.ObjectId(fileId);
  return gridfsBucket.openDownloadStream(_id);
}


/**
 * Delete file by ID
 */
async function deleteFileById(fileId) {
  const _id = new mongoose.Types.ObjectId(fileId);
  return gridfsBucket.delete(_id); // Delete the GridFS file
}


module.exports = {
  addFileToGridFS,
  getFilesByProductId,
  getFileStreamById,
  deleteFileById
};

