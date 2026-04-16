const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { shippingAddress, notes } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
      name: item.product.name,
      image: item.product.image
    }));

    const tax = (cart.totalPrice * 0.1).toFixed(2); // 10% tax
    const shippingCost = 10; // Fixed shipping cost
    const totalAmount = (parseFloat(cart.totalPrice) + parseFloat(tax) + shippingCost).toFixed(2);

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      tax,
      shippingCost,
      notes,
      orderStatus: 'pending',
      paymentStatus: 'pending'
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalPrice: 0, totalItems: 0 }
    );

    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product')
      .populate('user', 'name email phone');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel order
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (order.orderStatus !== 'pending') {
      return res.status(400).json({ message: 'Cannot cancel this order' });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
