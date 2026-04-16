const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];

    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .limit(limit)
      .skip(skip)
      .populate('seller', 'name');

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email')
      .populate('reviews.user', 'name profileImage');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product (admin/seller only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, category, price, stock, image } = req.body;

    const product = new Product({
      name,
      description,
      category,
      price,
      stock,
      image,
      seller: req.user._id
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add review
router.post('/:id/reviews', authMiddleware, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.reviews.push({
      user: req.user._id,
      comment,
      rating
    });

    // Update average rating
    const avgRating = product.reviews.reduce((sum, rev) => sum + rev.rating, 0) / product.reviews.length;
    product.rating = avgRating;

    await product.save();
    res.json({ message: 'Review added', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
