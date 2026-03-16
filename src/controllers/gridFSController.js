const gridFSServices = require("../services/gridFSServices");


/* Controller for uploading a file with metadata */
async function uploadFile(req, res) {
  try {
    
    const productId = req.body.product_id;
    const productType = req.body.product_type;
    const resourceLocation = req.body.resource_location; // head, background, catalog, carousel
    const title = req.body.title;

    if (!productId || !productType || !resourceLocation || !title) {
      return res.status(400).json({
        error: "Information missing"
      });
    }
    
    const metadata = {
      product_id: productId,
      product_type: productType,
      resource_location: resourceLocation,
      title: title,
      status: 1
    };

    const savedFile = await gridFSServices.addFile(req.file, metadata);

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
        url: `/api/v1/vg-hc-store/static-resources/public/gfs/file/${savedFile._id}`,
        uploaded_at: savedFile.uploadDate
      }
    });
  } catch (err) {
    console.error("Error in gridFSController.uploadFile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/* Controller to obtain files associated with a productId */
async function getFilesByProductId(req, res) {
  try {
    const productId = req.params.product_id;
    const productType = req.query.product_type;
    const resourceLocation = req.query.resource_location;

    if (!productId || !productType || !resourceLocation) {
      return res.status(400).json({
        error: "Information missing"
      });
    }

    const files = await gridFSServices.getFilesByProductId(productId, productType, resourceLocation);

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "No se encontraron archivos para este producto" });
    }

    res.json({ product_id: productId, files });
  } catch (err) {
    console.error("Error in gridFSController.getFilesByProductId:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


/* Controller to retrieve a file by its ID */
async function getFileById(req, res) {
  try {  
    const fileId = req.params.id;

    if (!fileId) {
      return res.status(400).json({
        error: "Information missing"
      });
    }

    return gridFSServices.getFileById(fileId, res);
  } catch (err) {
    console.error("Error in gridFSController.getFileById:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


/* Controller to delete file by ID */
async function deleteFileById(req, res) {
  try {
    const fileId = req.params.id;

    if (!fileId) {
      return res.status(400).json({
        error: "Information missing"
      });
    }

    const result = await gridFSServices.deleteFileById(fileId);

    res.json(result);
  } catch (err) {
    console.error("Error in gridFSController.deleteFileById:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
  uploadFile,
  getFilesByProductId,
  getFileById,
  deleteFileById
};