const express = require('express');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const { orderId, totalAmount } = req.body;

    if (!orderId || !totalAmount) {
      return res.status(400).json({ message: 'Order ID and amount required' });
    }

    const options = {
      amount: Math.round(totalAmount * 100), // Convert to paise
      currency: 'INR',
      receipt: orderId.toString(),
      notes: {
        orderId: orderId,
        userId: req.user._id.toString()
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      order: razorpayOrder,
      totalAmount: totalAmount
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    // Verify signature
    const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${orderId}|${paymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Update order status
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'completed',
        orderStatus: 'confirmed',
        stripePaymentId: paymentId // Using same field for payment ID
      },
      { new: true }
    );

    res.json({
      message: 'Payment verified successfully',
      order,
      paymentStatus: 'succeeded'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Razorpay key
router.get('/key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;
