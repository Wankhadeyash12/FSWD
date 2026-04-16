const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['admin', 'super-admin'],
      default: 'admin'
    },
    permissions: {
      manageProducts: { type: Boolean, default: true },
      manageOrders: { type: Boolean, default: true },
      manageUsers: { type: Boolean, default: false },
      manageAdmins: { type: Boolean, default: false }
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
