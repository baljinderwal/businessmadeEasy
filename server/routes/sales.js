const express = require('express');
const router = express.Router();

let sales = [
  {
    id: 1,
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    productName: 'Product A',
    quantity: 2,
    unitPrice: 29.99,
    totalAmount: 59.98,
    date: new Date('2025-08-02'),
    status: 'completed'
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    productName: 'Product B',
    quantity: 1,
    unitPrice: 19.99,
    totalAmount: 19.99,
    date: new Date('2025-08-02'),
    status: 'completed'
  },
  {
    id: 3,
    customerName: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    productName: 'Product D',
    quantity: 3,
    unitPrice: 15.99,
    totalAmount: 47.97,
    date: new Date('2025-08-01'),
    status: 'completed'
  }
];

// @route   GET /api/sales
// @desc    Get all sales/transactions
// @access  Private
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      count: sales.length,
      data: sales
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/sales/today
// @desc    Get today's sales summary
// @access  Private
router.get('/today', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaySales = sales.filter(sale => {
      const saleDate = new Date(sale.date);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime();
    });

    const totalSales = todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalOrders = todaySales.length;

    res.json({
      success: true,
      data: {
        totalSales: totalSales.toFixed(2),
        totalOrders,
        sales: todaySales
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   POST /api/sales
// @desc    Create a new sale/bill
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, productName, quantity, unitPrice } = req.body;
    
    if (!customerName || !productName || !quantity || !unitPrice) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customerName, productName, quantity, and unitPrice'
      });
    }

    const newSale = {
      id: sales.length + 1,
      customerName,
      customerEmail: customerEmail || '',
      productName,
      quantity: parseInt(quantity),
      unitPrice: parseFloat(unitPrice),
      totalAmount: parseInt(quantity) * parseFloat(unitPrice),
      date: new Date(),
      status: 'completed'
    };

    sales.push(newSale);

    res.status(201).json({
      success: true,
      message: 'Bill generated successfully',
      data: newSale
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/sales/:id
// @desc    Get a specific sale
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const saleId = parseInt(req.params.id);
    const sale = sales.find(s => s.id === saleId);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: 'Sale not found'
      });
    }

    res.json({
      success: true,
      data: sale
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// @route   GET /api/sales/analytics
// @desc    Get sales analytics data
// @access  Private
router.get('/analytics', async (req, res) => {
  try {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalOrders = sales.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const productSales = {};
    sales.forEach(sale => {
      if (productSales[sale.productName]) {
        productSales[sale.productName] += sale.quantity;
      } else {
        productSales[sale.productName] = sale.quantity;
      }
    });

    const topProducts = Object.entries(productSales)
      .map(([name, quantity]) => ({ name, sales: quantity }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue.toFixed(2),
        totalOrders,
        averageOrderValue: averageOrderValue.toFixed(2),
        topProducts
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

module.exports = router;
