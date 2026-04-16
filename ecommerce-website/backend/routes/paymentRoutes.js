const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-intent', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        orderId: orderId.toString(),
        userId: req.user._id.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Confirm payment
router.post('/confirm', authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      const order = await Order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: 'completed',
          orderStatus: 'confirmed',
          stripePaymentId: paymentIntentId
        },
        { new: true }
      );

      res.json({
        message: 'Payment successful',
        order,
        paymentStatus: 'succeeded'
      });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment key
router.get('/public-key', (req, res) => {
  res.json({ publicKey: process.env.STRIPE_PUBLIC_KEY });
});

// Webhook for Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'completed',
        stripePaymentId: paymentIntent.id
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
