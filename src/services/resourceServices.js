const resourceRepository = require("../repositories/resourceRepository");



/* Registro de un nuevo documento (metadatos) */
async function registerResource(document) {
  return await resourceRepository.createResource(document);
}

/* Obtener recurso por productId */
async function getResourceByProductId(productId) {
  return await resourceRepository.findByProductId(productId);
}



module.exports = {
  registerResource,
  getResourceByProductId
};