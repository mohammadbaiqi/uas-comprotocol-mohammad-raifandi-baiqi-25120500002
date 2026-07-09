const { randomUUID } = require('crypto');

/**
 * In-memory data store.
 * Data akan hilang setiap kali server di-restart (tidak persisten).
 */
let products = [
  {
    id: randomUUID(),
    name: 'Keyboard Mechanical',
    price: 750000,
    stock: 25,
    category: 'electronics',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    name: 'Mouse Wireless',
    price: 250000,
    stock: 50,
    category: 'electronics',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const findAll = ({ category, search } = {}) => {
  let result = [...products];

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q));
  }

  return result;
};

const findById = (id) => products.find((p) => p.id === id);

const create = (data) => {
  const now = new Date().toISOString();
  const newProduct = {
    id: randomUUID(),
    name: data.name,
    price: data.price,
    stock: data.stock ?? 0,
    category: data.category ?? 'uncategorized',
    createdAt: now,
    updatedAt: now,
  };
  products.push(newProduct);
  return newProduct;
};

const update = (id, data) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...data,
    id: products[index].id, // id tidak boleh diubah
    updatedAt: new Date().toISOString(),
  };

  return products[index];
};

const remove = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
};

module.exports = { findAll, findById, create, update, remove };
