const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Products JSON file path
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');

// Helper: Read products
const readProducts = () => {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading products:', err);
    return [];
  }
};

// Helper: Write products
const writeProducts = (products) => {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
};

// ===== API ROUTES =====

// GET all products
app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// POST new product (Admin)
app.post('/api/products', (req, res) => {
  const products = readProducts();
  const newProduct = {
    ...req.body,
    id: Date.now().toString(),
    price: Number(req.body.price),
    oldPrice: Number(req.body.oldPrice) || 0,
    stock: Number(req.body.stock),
    rating: Number(req.body.rating) || 4.5,
    reviews: Number(req.body.reviews) || 0,
  };
  products.unshift(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// PUT update product (Admin)
app.put('/api/products/:id', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  products[index] = {
    ...products[index],
    ...req.body,
    id: req.params.id,
    price: Number(req.body.price),
    oldPrice: Number(req.body.oldPrice) || 0,
    stock: Number(req.body.stock),
    rating: Number(req.body.rating) || 4.5,
    reviews: Number(req.body.reviews) || 0,
  };
  writeProducts(products);
  res.json(products[index]);
});

// PATCH stock only
app.patch('/api/products/:id/stock', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  product.stock = Number(req.body.stock);
  writeProducts(products);
  res.json(product);
});

// DELETE product (Admin)
app.delete('/api/products/:id', (req, res) => {
  const products = readProducts();
  const filtered = products.filter(p => p.id !== req.params.id);
  writeProducts(filtered);
  res.json({ message: 'Deleted', id: req.params.id });
});

// BULK: Save all (Admin - export)
app.post('/api/products/bulk', (req, res) => {
  writeProducts(req.body);
  res.json({ message: 'Saved', count: req.body.length });
});

// ===== SERVE REACT BUILD =====
const clientBuild = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientBuild)) {
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
