const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// In-memory cart per user (stored in DB via user sessions)
// For simplicity, we store cart in a Map. In production, use a Cart collection.
const carts = new Map();

// @route   GET /api/cart
// @desc    Get user's cart
router.get('/', protect, (req, res) => {
  const cart = carts.get(req.user._id.toString()) || [];
  res.json(cart);
});

// @route   POST /api/cart
// @desc    Add item to cart
router.post('/', protect, (req, res) => {
  const userId = req.user._id.toString();
  const { productId, name, price, image, quantity = 1, stock } = req.body;

  let cart = carts.get(userId) || [];
  const existingIndex = cart.findIndex((item) => item.productId === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ productId, name, price, image, quantity, stock });
  }

  carts.set(userId, cart);
  res.json(cart);
});

// @route   PUT /api/cart/:productId
// @desc    Update cart item quantity
router.put('/:productId', protect, (req, res) => {
  const userId = req.user._id.toString();
  const { quantity } = req.body;

  let cart = carts.get(userId) || [];
  const itemIndex = cart.findIndex((item) => item.productId === req.params.productId);

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    carts.set(userId, cart);
  }

  res.json(cart);
});

// @route   DELETE /api/cart/:productId
// @desc    Remove item from cart
router.delete('/:productId', protect, (req, res) => {
  const userId = req.user._id.toString();
  let cart = carts.get(userId) || [];
  cart = cart.filter((item) => item.productId !== req.params.productId);
  carts.set(userId, cart);
  res.json(cart);
});

// @route   DELETE /api/cart
// @desc    Clear entire cart
router.delete('/', protect, (req, res) => {
  carts.set(req.user._id.toString(), []);
  res.json([]);
});

module.exports = router;
