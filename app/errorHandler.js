const ApiError = require('./ApiError');

// Menangani route yang tidak ditemukan
function notFoundHandler(req, res, next) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} tidak ditemukan`));
}

// Central error handler — harus didaftarkan paling akhir di app.js
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.statusCode ? err.message : 'Terjadi kesalahan pada server';

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.details ? { details: err.details } : {}),
  });
}

module.exports = { notFoundHandler, errorHandler };
