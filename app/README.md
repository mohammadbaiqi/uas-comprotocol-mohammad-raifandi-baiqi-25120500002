# REST API Backend (Node.js + Express, In-Memory)

Full REST API CRUD tanpa database eksternal — data disimpan di memory (array), cocok untuk belajar, prototyping, atau testing cepat.

⚠️ **Catatan:** Karena data disimpan di memory, semua data akan **hilang** setiap kali server di-restart.

## Struktur Folder

```
rest-api/
├── src/
│   ├── controllers/
│   │   └── product.controller.js   # Logic request/response
│   ├── middleware/
│   │   ├── errorHandler.js         # 404 handler + central error handler
│   │   └── validateProduct.js      # Validasi input
│   ├── models/
│   │   └── product.model.js        # In-memory data store + operasi CRUD
│   ├── routes/
│   │   └── product.routes.js       # Definisi endpoint
│   ├── utils/
│   │   └── ApiError.js             # Custom error class
│   ├── app.js                      # Setup Express app & middleware global
│   └── server.js                   # Entry point
├── .env.example
├── package.json
└── README.md
```

## Instalasi & Menjalankan

```bash
npm install
cp .env.example .env
npm start        # jalankan biasa
npm run dev      # jalankan dengan nodemon (auto-reload saat development)
```

Server berjalan di `http://localhost:3000` (bisa diubah lewat `.env`).

## Endpoint

| Method | Endpoint            | Deskripsi                                   |
|--------|---------------------|----------------------------------------------|
| GET    | `/health`            | Cek status server                           |
| GET    | `/api/products`      | Ambil semua produk (support query `category`, `search`) |
| GET    | `/api/products/:id`  | Ambil satu produk berdasarkan id            |
| POST   | `/api/products`      | Buat produk baru                            |
| PUT    | `/api/products/:id`  | Update produk (full/partial)                |
| PATCH  | `/api/products/:id`  | Update produk (partial)                     |
| DELETE | `/api/products/:id`  | Hapus produk                                |

### Contoh Body — POST/PUT `/api/products`

```json
{
  "name": "Monitor 24 inch",
  "price": 1500000,
  "stock": 10,
  "category": "electronics"
}
```

- `name` (string, wajib saat create)
- `price` (number, wajib saat create, tidak boleh negatif)
- `stock` (number, opsional, default 0)
- `category` (string, opsional, default "uncategorized")

### Contoh Query — GET `/api/products`

```
GET /api/products?category=electronics
GET /api/products?search=monitor
```

## Contoh Response

**Sukses (200/201):**
```json
{
  "success": true,
  "data": { "id": "...", "name": "Monitor 24 inch", "price": 1500000, "stock": 10, "category": "electronics", "createdAt": "...", "updatedAt": "..." }
}
```

**Error validasi (400):**
```json
{
  "success": false,
  "message": "Validasi gagal",
  "details": ["name wajib diisi dan harus berupa string"]
}
```

**Tidak ditemukan (404):**
```json
{
  "success": false,
  "message": "Product dengan id xxx tidak ditemukan"
}
```

## Contoh Test dengan curl

```bash
# Ambil semua produk
curl http://localhost:3000/api/products

# Tambah produk baru
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor 24 inch","price":1500000,"stock":10,"category":"electronics"}'

# Update produk
curl -X PATCH http://localhost:3000/api/products/<id> \
  -H "Content-Type: application/json" \
  -d '{"price":1600000}'

# Hapus produk
curl -X DELETE http://localhost:3000/api/products/<id>
```
