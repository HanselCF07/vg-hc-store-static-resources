const Resource = require("../models/Resource");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { Readable } = require("stream");


/**
 * Crear un documento Resource en MongoDB
 */
async function createResource(document) {
  const resource = new Resource(document);
  return await resource.save();
}

/**
 * Buscar un recurso por productId
 */
async function findByProductId(productId) {
  return await Resource.findOne({ product_id: productId });
}


module.exports = {
  createResource,
  findByProductId
};