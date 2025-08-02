const express = require('express');
const router = express.Router();

let products = [
  {
    id: 1,
    name: 'Product A',
    price: 29.99,
    stock: 150,
    category: 'Electronics',
    description: 'High-quality electronic device',
    sales: 150
  },
  {
    id: 2,
    name: 'Product B',
    price: 19.99,
    stock: 5,
    category: 'Accessories',
    description: 'Essential accessory item',
    sales: 120
  },
  {
    id: 3,
    name: 'Product C',
    price: 49.99,
    stock: 0,
    category: 'Premium',
    description: 'Premium quality product',
    sales: 95
  },
  {
    id: 4,
    name: 'Product D',
    price: 15.99,
    stock: 75,
    category: 'Basic',
    description: 'Basic everyday item',
    sales: 80
  }
];

// @route   GET /api/products
// @desc    Get all products
// @access  Private
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/products/low-stock
// @desc    Get products with low stock (less than 10)
// @access  Private
router.get('/low-stock', async (req, res) => {
  try {
    const lowStockProducts = products.filter(product => product.stock < 10);
    res.json({
      success: true,
      count: lowStockProducts.length,
      data: lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, price, stock, category, description } = req.body;
    
    if (!name || !price || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, price, and stock'
      });
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category: category || 'General',
      description: description || '',
      sales: 0
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const { name, price, stock, category, description } = req.body;
    
    if (name) products[productIndex].name = name;
    if (price) products[productIndex].price = parseFloat(price);
    if (stock !== undefined) products[productIndex].stock = parseInt(stock);
    if (category) products[productIndex].category = category;
    if (description) products[productIndex].description = description;

    res.json({
      success: true,
      data: products[productIndex]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];

    res.json({
      success: true,
      data: deletedProduct
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

module.exports = router;
