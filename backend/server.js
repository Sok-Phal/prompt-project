const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mockData = require('./data/mockData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store (for demo purposes)
let markets = [...mockData.markets];

// Routes
// GET /markets - Retrieve all markets and items
app.get('/api/markets', (req, res) => {
  res.json({ markets });
});

// POST /api/market/:id/item - Add a new item to a market
app.post('/api/market/:id/item', (req, res) => {
  const marketId = parseInt(req.params.id);
  const { name_en, name_km, price } = req.body;

  // Validation
  if (!name_en || !name_km || !price || isNaN(price)) {
    return res.status(400).json({ 
      error: 'Invalid input. Name (both languages) and numeric price are required.' 
    });
  }

  const market = markets.find(m => m.id === marketId);
  if (!market) {
    return res.status(404).json({ error: 'Market not found' });
  }

  // Check for duplicate item names in the same market
  const existingItem = market.items.find(item => 
    item.name_en.toLowerCase() === name_en.toLowerCase()
  );
  if (existingItem) {
    return res.status(400).json({ 
      error: 'Item with this name already exists in this market' 
    });
  }

  // Generate new item ID
  const newItemId = Math.max(...market.items.map(item => item.id), 0) + 1;
  
  const newItem = {
    id: newItemId,
    name_en,
    name_km,
    price: parseFloat(price)
  };

  market.items.push(newItem);
  res.status(201).json({ message: 'Item added successfully', item: newItem });
});

// PUT /api/market/:id/item/:itemId - Update an item
app.put('/api/market/:id/item/:itemId', (req, res) => {
  const marketId = parseInt(req.params.id);
  const itemId = parseInt(req.params.itemId);
  const { name_en, name_km, price } = req.body;

  // Validation
  if (!name_en || !name_km || !price || isNaN(price)) {
    return res.status(400).json({ 
      error: 'Invalid input. Name (both languages) and numeric price are required.' 
    });
  }

  const market = markets.find(m => m.id === marketId);
  if (!market) {
    return res.status(404).json({ error: 'Market not found' });
  }

  const item = market.items.find(i => i.id === itemId);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Check for duplicate item names (excluding current item)
  const existingItem = market.items.find(i => 
    i.id !== itemId && i.name_en.toLowerCase() === name_en.toLowerCase()
  );
  if (existingItem) {
    return res.status(400).json({ 
      error: 'Item with this name already exists in this market' 
    });
  }

  // Update item
  item.name_en = name_en;
  item.name_km = name_km;
  item.price = parseFloat(price);

  res.json({ message: 'Item updated successfully', item });
});

// DELETE /api/market/:id/item/:itemId - Delete an item
app.delete('/api/market/:id/item/:itemId', (req, res) => {
  const marketId = parseInt(req.params.id);
  const itemId = parseInt(req.params.itemId);

  const market = markets.find(m => m.id === marketId);
  if (!market) {
    return res.status(404).json({ error: 'Market not found' });
  }

  const itemIndex = market.items.findIndex(i => i.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deletedItem = market.items.splice(itemIndex, 1)[0];
  res.json({ message: 'Item deleted successfully', item: deletedItem });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Price Tracker API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/`);
});
