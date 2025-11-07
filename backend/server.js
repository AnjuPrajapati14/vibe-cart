const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { run, all, get } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

/**
 * GET /api/products
 * returns all products (5-10)
 */
app.get('/api/products', async (req, res) => {
  try {
    const rows = await all('SELECT * FROM products');
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'server error' });
  }
});

/**
 * GET /api/cart
 * Get cart items and total
 */
app.get('/api/cart', async (req, res) => {
  try {
    const items = await all(`
      SELECT c.id, c.productId, c.qty, p.name, p.price
      FROM cart c
      JOIN products p ON p.id = c.productId
    `);
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    res.json({ success: true, data: items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/**
 * POST /api/cart
 * body: { productId, qty }
 */
app.post('/api/cart', async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ success: false, error: 'productId required' });

    // If item exists, update qty
    const existing = await get('SELECT * FROM cart WHERE productId = ?', [productId]);
    if (existing) {
      await run('UPDATE cart SET qty = qty + ? WHERE productId = ?', [qty, productId]);
      return res.json({ success: true, message: 'updated qty' });
    }
    await run('INSERT INTO cart (productId, qty, createdAt) VALUES (?, ?, ?)', [
      productId,
      qty,
      new Date().toISOString()
    ]);
    res.json({ success: true, message: 'added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/**
 * DELETE /api/cart/:id
 */
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await run('DELETE FROM cart WHERE id = ?', [id]);
    res.json({ success: true, message: 'removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/**
 * POST /api/cart/:id
 * Update item qty (use POST for simplicity)
 * body: { qty }
 */
app.post('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    if (qty <= 0) {
      await run('DELETE FROM cart WHERE id = ?', [id]);
      return res.json({ success: true, message: 'removed' });
    }
    await run('UPDATE cart SET qty = ? WHERE id = ?', [qty, id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/**
 * POST /api/checkout
 * body: { name, email }
 * returns mock receipt
 */
app.post('/api/checkout', async (req, res) => {
  try {
    const { name, email } = req.body;
    const items = await all(`
      SELECT c.id, c.productId, c.qty, p.name, p.price
      FROM cart c
      JOIN products p ON p.id = c.productId
    `);
    if (!items.length) return res.status(400).json({ success: false, error: 'Cart is empty' });
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const receipt = {
      receiptId: 'rcpt_' + Date.now(),
      name: name || 'Guest',
      email: email || '',
      items,
      total,
      timestamp: new Date().toISOString()
    };
    // Clear cart after checkout
    await run('DELETE FROM cart');
    res.json({ success: true, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
