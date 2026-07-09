const productModel = require('./product.model');
const ApiError = require('./ApiError');

// GET /api/products?category=&search=
const getAllProducts = (req, res) => {
  const { category, search } = req.query;
  const products = productModel.findAll({ category, search });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
};

// GET /api/products/:id
const getProductById = (req, res, next) => {
  const product = productModel.findById(req.params.id);

  if (!product) {
    return next(ApiError.notFound(`Product dengan id ${req.params.id} tidak ditemukan`));
  }

  res.status(200).json({ success: true, data: product });
};

// POST /api/products
const createProduct = (req, res) => {
  const product = productModel.create(req.body);
  res.status(201).json({ success: true, data: product });
};

// PUT/PATCH /api/products/:id
const updateProduct = (req, res, next) => {
  const updated = productModel.update(req.params.id, req.body);

  if (!updated) {
    return next(ApiError.notFound(`Product dengan id ${req.params.id} tidak ditemukan`));
  }

  res.status(200).json({ success: true, data: updated });
};

// DELETE /api/products/:id
const deleteProduct = (req, res, next) => {
  const deleted = productModel.remove(req.params.id);

  if (!deleted) {
    return next(ApiError.notFound(`Product dengan id ${req.params.id} tidak ditemukan`));
  }

  res.status(200).send({success: true, data: deleted});
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
