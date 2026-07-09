const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const productRoutes = require('./product.routes');
const { notFoundHandler, errorHandler } = require('./errorHandler');

const app = express();

// Global middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// API routes
app.use('/api/products', productRoutes);

// 404 + error handler (urutan penting: paling akhir)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
