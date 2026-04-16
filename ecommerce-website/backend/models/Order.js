const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      name: String,
      image: String
    }],
    shippingAddress: {
      name: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'stripe'],
      default: 'stripe'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    totalAmount: {
      type: Number,
      required: true
    },
    shippingCost: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    stripePaymentId: String,
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
