const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other']
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    discountPrice: {
      type: Number,
      min: 0,
      default: 0
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: String,
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      createdAt: { type: Date, default: Date.now }
    }],
    image: {
      type: String,
      required: true
    },
    images: [String],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    tags: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
