const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to cart
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        price: product.discountPrice || product.price
      });
    }

    cart.calculateTotals();
    await cart.save();

    res.json({ message: 'Product added to cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    cart.calculateTotals();
    await cart.save();

    res.json({ message: 'Product removed from cart', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update quantity
router.put('/update/:productId', authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === req.params.productId);

    if (!item) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    item.quantity = quantity;
    cart.calculateTotals();
    await cart.save();

    res.json({ message: 'Quantity updated', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalPrice: 0, totalItems: 0 }
    );

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
