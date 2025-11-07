const { run } = require('./db');

async function seed() {
  try {
    // Create tables
    await run(`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      price REAL,
      description TEXT,
      image TEXT
    )`);

    await run(`CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId TEXT,
      qty INTEGER,
      createdAt TEXT
    )`);

    // Insert sample products
    const products = [
      { id: 'p1', name: 'VibePhone X1', price: 29999, description: 'Flagship-like performance', image: '' },
      { id: 'p2', name: 'VibePhone Lite', price: 14999, description: 'Value for money', image: '' },
      { id: 'p3', name: 'Vibe Tab 10', price: 19999, description: '10 inch tablet', image: '' },
      { id: 'p4', name: 'Vibe Buds', price: 1999, description: 'True wireless earbuds', image: '' },
      { id: 'p5', name: 'Vibe Charger 30W', price: 999, description: 'Fast charger', image: '' }
    ];

    for (const p of products) {
      await run(
        `INSERT OR IGNORE INTO products (id, name, price, description, image) VALUES (?, ?, ?, ?, ?)`,
        [p.id, p.name, p.price, p.description, p.image]
      );
    }

    console.log('Seed complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
}

seed();
