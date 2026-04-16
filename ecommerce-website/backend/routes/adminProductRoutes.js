const express = require('express');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify admin
const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin' && decoded.role !== 'super-admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all products (for admin)
router.get('/', adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, category, price, discountPrice, stock, image, tags } = req.body;

    if (!name || !description || !category || !price || !stock || !image) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const product = new Product({
      name,
      description,
      category,
      price,
      discountPrice: discountPrice || 0,
      stock,
      image,
      tags: tags || [],
      seller: req.admin._id
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, category, price, discountPrice, stock, image, tags } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.admin._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (stock) product.stock = stock;
    if (image) product.image = image;
    if (tags) product.tags = tags;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.admin._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
