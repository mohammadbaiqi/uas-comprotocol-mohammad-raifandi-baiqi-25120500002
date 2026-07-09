const ApiError = require('./ApiError');

/**
 * Validasi payload saat membuat product baru (POST).
 * Semua field wajib.
 */
function validateCreateProduct(req, res, next) {
  const { name, price, stock, category } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('name wajib diisi dan harus berupa string');
  }

  if (price === undefined || typeof price !== 'number' || price < 0) {
    errors.push('price wajib diisi, berupa angka, dan tidak boleh negatif');
  }

  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    errors.push('stock harus berupa angka dan tidak boleh negatif');
  }

  if (category !== undefined && typeof category !== 'string') {
    errors.push('category harus berupa string');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validasi gagal', errors));
  }

  next();
}

/**
 * Validasi payload saat update product (PUT/PATCH).
 * Field bersifat opsional, tapi kalau ada harus valid.
 */
function validateUpdateProduct(req, res, next) {
  const { name, price, stock, category } = req.body;
  const errors = [];

  if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
    errors.push('name harus berupa string yang tidak kosong');
  }

  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    errors.push('price harus berupa angka dan tidak boleh negatif');
  }

  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    errors.push('stock harus berupa angka dan tidak boleh negatif');
  }

  if (category !== undefined && typeof category !== 'string') {
    errors.push('category harus berupa string');
  }

  if (Object.keys(req.body).length === 0) {
    errors.push('Body request tidak boleh kosong');
  }

  if (errors.length > 0) {
    return next(ApiError.badRequest('Validasi gagal', errors));
  }

  next();
}

module.exports = { validateCreateProduct, validateUpdateProduct };
