const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./product.controller');

const {
  validateCreateProduct,
  validateUpdateProduct,
} = require('./validateProduct');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', validateCreateProduct, createProduct);
router.put('/:id', validateUpdateProduct, updateProduct);
router.patch('/:id', validateUpdateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
